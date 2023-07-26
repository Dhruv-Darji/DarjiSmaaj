import React, { useEffect, useState } from "react"
import Auth from "../Roles/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 
const Navbar = () =>{
    
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
      
    const navigate = useNavigate();

    const handleLogOut = () =>{
        axios.get('http://localhost:8080/logout').then(
            () =>{
                window.location.reload();
            }
        ).catch((err)=>console.log('Logout error:',err));
    }

    return(
        <>       
            
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        
        <div className="container-fluid mx-2">

        <button
        className="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
        <i className="fas fa-bars"></i>
        </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a href='/#' className="navbar-brand mt-2 mt-lg-0">
                <img
                src="https://img.freepik.com/free-vector/flat-hand-drawn-fashion-designer-illustration-with-sewing-machine_23-2148848375.jpg?w=996&t=st=1689855438~exp=1689856038~hmac=f44cff433a123c11f74f2e19c92647cdd36bcfd0ab5cd33914c8f0d0d4357c4c"
                height="35"                
                alt="MDB Logo"
                loading="lazy"
                />
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a href='/#' className="nav-link" >Home</a>
                </li>
                <li className="nav-item">
                <a href='/#' className="nav-link" >About Us</a>
                </li>

                {
                    (()=>{
                        if(userAuth.RoleId ===2 ){
                            return(
                                <li className="nav-item dropdown">
                                    <a href='/#'
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                    >
                                    Request
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <a href='/#' className="dropdown-item" >New Request</a>
                                    </li>
                                    <li>
                                        <a href='/#' className="dropdown-item" >Accepted Request</a>
                                    </li>
                                    <li>
                                        <a href='/#' className="dropdown-item" >Rejected Request</a>
                                    </li>
                                    </ul>
                                </li>
                                )
                        }
                        else{
                            return(
                                <></>                                
                            )
                        }
                    })()
                }                
                  
            </ul>
            </div>
            
            <div className="d-flex align-items-center">
    

            
            <div className="dropdown">
                <a href='/#'
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                >
                <i className="fas fa-bell"></i>
                <span className="badge rounded-pill badge-notification bg-danger">1</span>
                </a>
                <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
                >
                <li>
                    <a href='/#' className="dropdown-item" >Some news</a>
                </li>
                <li>
                    <a href='/#' className="dropdown-item" >Another news</a>
                </li>
                <li>
                    <a href='/#' className="dropdown-item" >Something else here</a>
                </li>
                </ul>
            </div>
            {userAuth.RoleId === null && userAuth.UserId === null && userAuth.Email === null ?(
            <button type="button" onClick={()=>{navigate('/login')}} className="btn btn-light" data-mdb-ripple-color="dark">
                LogIn
            </button>
            ):(<div className="dropdown">
                <a href='/#'
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                >
                <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                />
                </a>
                <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
                >
                <li>
                    <a href='/#' className="dropdown-item" >My profile</a>
                </li>
                <li>
                    <a href='/#' className="dropdown-item" >Settings</a>
                </li>
                <li>
                    <a href='/#' onClick={handleLogOut} className="dropdown-item" >Logout</a>
                </li>
                </ul>
            </div>)}
            </div>
        </div>
        </nav>
        </>
    );
}

export default Navbar;