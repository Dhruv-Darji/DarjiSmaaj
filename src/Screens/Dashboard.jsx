import React, { useEffect, useState } from "react";
import Auth from "../Roles/Auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () =>{
    const navigate = useNavigate();    
    const [userAuth,setUserAuth] = useState({
        RoleId:'',
        UserId:'',
        Email:''
    });
  useEffect(()=>{
    const fetchData = async () =>{
        const {RoleId,UserId,Email} = await Auth();
        setUserAuth({RoleId,UserId,Email});                  
    }
    fetchData();             
  },[]);

    if(userAuth.RoleId ===1 ){
        return(
            <>
                <h1>Super Admin Access</h1>
            </>
        );        
    } 
    else if(userAuth.RoleId===2 || userAuth.RoleId===3){
        return(
            <>
                <h1>District admin and admin access</h1>                
            </>
        );
    }
    else{
        navigate('/error');
    } 
}
export default Dashboard;