import React, { useEffect, useState } from "react";
import Toast, { showErrorToast } from "../Components/Toast";
import Loading from "../Components/Loading";
import SearchBar from "../Components/SrearchBar";
import AllProfilesCard from "./Sections/AllProfilesCard";
import Auth from "../Roles/Auth";
import axios from "axios";

const AllProfiles = () =>{
    const [isLoading,setIsLoading] = useState(true);
    const [applyFiltersClicked, setApplyFiltersClicked] = useState(false);
    const [allProfiles,setAllProfiles] = useState();
    const [userAuth,setUserAuth] = useState({
        RoleId:'',
        UserId:'',
        Email:''
      });
    const [filterData,setFilterData] = useState({
        genderFilter:'',
        salaryFilter:'0',
        ageFilter:'18',
        employeeFilter:'',
    });

    const fetchAllProfile = async () =>{
        setIsLoading(true);
        console.log('filterData:',filterData)
        const queryParams = new URLSearchParams(filterData);
        await axios.get(
            `http://192.168.0.112:8080/allProfiles/Accepted?${queryParams}`,
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
      },[applyFiltersClicked]);

    return(
        <>
            <div>
            <Toast/>
            {isLoading?(
                <Loading/>
            ):
            (
                <>
                    <SearchBar filterData={filterData} setFilterData={setFilterData} applyFiltersClicked={applyFiltersClicked} setApplyFiltersClicked={setApplyFiltersClicked} />
                    <AllProfilesCard allProfiles={allProfiles} userAuth={userAuth}/>
                </>
            )}
            </div>
        </>
    )
}
export default AllProfiles;