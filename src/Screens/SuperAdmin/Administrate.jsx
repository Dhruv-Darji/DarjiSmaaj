import React, { useEffect, useState } from "react";
import Auth from "../../Roles/Auth";
import { useNavigate } from "react-router-dom";

const Administrate = () =>{
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
            console.log(RoleId);                 
        }
        fetchData();             
      },[]);
      
    if(userAuth.RoleId===1){
        return(
            <>
                <h1>This Is Administrate page</h1>
            </>
        );
    }
    else{
        navigate('/error');
    }    
}

export default Administrate;