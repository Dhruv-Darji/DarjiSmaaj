import React, { useEffect, useState } from "react";
import Toast, { showErrorToast } from "../Components/Toast";
import Loading from "../Components/Loading";
import SearchBar from "../Components/SrearchBar";
import AllProfilesCard from "./Sections/AllProfilesCard";
import Auth from "../Roles/Auth";
import axios from "axios";

const AllProfiles = () =>{
    const [isLoading,setIsLoading] = useState(true);
    const [allProfiles,setAllProfiles] = useState();
    const [userAuth,setUserAuth] = useState({
        RoleId:'',
        UserId:'',
        Email:''
      });

    const fetchAllProfile = async () =>{
        await axios.get(
            `http://192.168.0.112:8080/allProfiles/Accepted`,
            {timeout:2000}
        )
        .then((response)=>{
            if(response.data){
                setAllProfiles(response.data);
                setIsLoading(false);
            }
        })
        .catch((e)=>{
                if(e.response){          
                    showErrorToast(`${e.response.data}`);
                    console.error('Error while allProfile!',e.response.data);
                }else{
                    showErrorToast('Oops! Server Unreachable.');
                }
                setIsLoading(false);
        });
    }

      useEffect(()=>{
        const fetchData = async () =>{
            const {RoleId,UserId,Email} = await Auth();
            fetchAllProfile();
            setUserAuth({RoleId,UserId,Email});                  
        }
        fetchData();             
      },[]);

    return(
        <>
            <div>
            <Toast/>
            {isLoading?(
                <Loading/>
            ):
            (
                <>
                    <SearchBar/>
                    <AllProfilesCard allProfiles={allProfiles} userAuth={userAuth}/>
                </>
            )}
            </div>
        </>
    )
}
export default AllProfiles;