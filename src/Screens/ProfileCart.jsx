import React, { useEffect, useState } from "react";
import Toast, { showErrorToast } from "../Components/Toast";
import Loading from "../Components/Loading";
import AllProfilesCard from "./Sections/AllProfilesCard";
import Auth from "../Roles/Auth";
import axios from "axios";

const ProfileCart = () =>{
    const [isLoading,setIsLoading] = useState(true);
    const [reLoad,setReLoad] = useState(false);
    const [cartProfiles,setCartProfiles] = useState([]);
    const [userAuth,setUserAuth] = useState({
        RoleId:'',
        UserId:'',
        Email:''
      });
    
    const fetchCartProfiles = async (UserId) =>{
        setIsLoading(true);
        await axios.get(
            `http://192.168.0.112:8080/profileCart/cartProfiles/${UserId}`,
            {timeout:25000}
        ).then((response)=>{
            if(response.data){
                setCartProfiles(response.data);
                setIsLoading(false);
            }
        }).catch((e)=>{
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
        if(UserId){
            fetchCartProfiles(UserId);
        }else{
            showErrorToast('First you have to login to show your cart 🙏');
            setCartProfiles([]);
        }
        setUserAuth({RoleId,UserId,Email});                  
    }
    fetchData();         
    },[reLoad]);

    return(
        <>
            <div>
            <Toast/>
            {isLoading?(
                <Loading/>
            ):
            (
                <>
                    <AllProfilesCard
                    reLoad={reLoad}
                    setReLoad={setReLoad}
                    headingText={'Cart Profiles'}
                    discriptionText={'The profile Cart store the saved profile which is liked by You.'}
                    whereUsed={'ProfileCart'} 
                    allProfiles={cartProfiles} 
                    userAuth={userAuth}/>
                </>
            )}
            </div>
        </>
    )
}
export default ProfileCart;