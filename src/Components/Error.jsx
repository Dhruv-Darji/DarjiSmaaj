import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../Roles/Auth";

const Error = () =>{
    
    const navigate =useNavigate();
   
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

      const logout = () =>{
        if(userAuth.RoleId===1 || userAuth.RoleId===2 || userAuth.RoleId===3){
            navigate('/Dashboard');
        }
        else{
            navigate('/');
        }
      }
    
    return(
        <>
            <section>
            <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-lg-6 d-flex align-items-center my-4">
                <div className="mx-auto">
                    <h2>
                    Oops Some thing went wrong!<br/>
                    <strong className="fw-bold brand-name text-primary">
                    unauthorized
                    </strong>
                    </h2>
                    <p className="fw-lighter fs-5">
                    <span role="img" aria-label="Pointing Finger">
                    👇
                  </span>Please Click Here
                    </p>
                    <button type="button" onClick={()=>{logout()}} className="btn btn-secondary btn-rounded mt-3">
                        Darji Samaj
                    </button>                    
                </div>
                </div>
                <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center updownanimate my-4">
                <img
                    src="/Images/401 Error.jpg"
                    className="img-fluid px-4"
                    alt="Error Img"
                />
                </div>
            </div>
            </div>
        </section>
        </>
    );
}

export default Error;