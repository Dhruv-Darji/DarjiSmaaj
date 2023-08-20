import React, { useEffect, useState } from "react"
import Auth from "../Roles/Auth";
import { useNavigate ,NavLink } from "react-router-dom";
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
        axios.get('http://192.168.0.112:8080/logout').then(
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
            <NavLink to='/#' className="navbar-brand mt-2 mt-lg-0">
                <img
                src="https://img.freepik.com/free-vector/flat-hand-drawn-fashion-designer-illustration-with-sewing-machine_23-2148848375.jpg?w=996&t=st=1689855438~exp=1689856038~hmac=f44cff433a123c11f74f2e19c92647cdd36bcfd0ab5cd33914c8f0d0d4357c4c"
                height="35"                
                alt="MDB Logo"
                loading="lazy"
                />
            </NavLink>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {(
                ()=>{
                    if(userAuth.RoleId===1 || userAuth.RoleId===2 || userAuth.RoleId===3){
                        return(<li className="nav-item">
                        <NavLink to='/Dashboard' className="nav-link" >Dashboard</NavLink>
                        </li>);
                    }else{
                        return(
                        <li className="nav-item">
                        <NavLink to='/' className="nav-link" >Home</NavLink>
                        </li>
                        );
                    }
                })()
                }
                {
                    (()=>{
                        if(userAuth.RoleId ===1 || userAuth.RoleId ===2){
                            return(
                                <li className="nav-item dropdown">
                                    <NavLink to='/#'
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                    >
                                    Admin
                                    </NavLink>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <NavLink to='/Administrate' className="dropdown-item" >Create New</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/DistrictAdminList' className="dropdown-item" >District Admin List</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/AdminList' className="dropdown-item" >Admin List</NavLink>
                                    </li>
                                    </ul>
                                </li>
                                )                                
                            
                        }
                        else{
                            return(<></>);
                        } 
                    })()
                }
                {(()=>{
                    if(userAuth.RoleId===1 || userAuth.RoleId ===2 || userAuth.RoleId===3){
                            return(
                                <li className="nav-item dropdown">
                                    <NavLink to='/#'
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                    >
                                    Request
                                    </NavLink>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <NavLink to='/new-request' className="dropdown-item" >New Request</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/accepted-request' className="dropdown-item" >Accepted Request</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/rejected-request' className="dropdown-item" >Rejected Request</NavLink>
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
                })()} 

                <li className="nav-item">
                <NavLink to='/aboutUs' className="nav-link" >About Us</NavLink>
                </li> 
                
                <li className="nav-item">
                <NavLink to='/contact-us' className="nav-link" >Contact-Us</NavLink>
                </li>              
                  
            </ul>
            </div>
            
            <div className="d-flex align-items-center">
    

            
            <div className="dropdown">
                <NavLink to='/#'
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                >
                <i className="fas fa-bell"></i>
                <span className="badge rounded-pill badge-notification bg-danger">1</span>
                </NavLink>
                <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
                >
                <li>
                    <NavLink to='/#' className="dropdown-item" >Some news</NavLink>
                </li>
                <li>
                    <NavLink to='/#' className="dropdown-item" >Another news</NavLink>
                </li>
                <li>
                    <NavLink to='/#' className="dropdown-item" >Something else here</NavLink>
                </li>
                </ul>
            </div>
            {userAuth.RoleId === null && userAuth.UserId === null && userAuth.Email === null ?(
            <button type="button" onClick={()=>{navigate('/login')}} className="btn btn-light" data-mdb-ripple-color="dark">
                LogIn
            </button>
            ):(<div className="dropdown">
                <NavLink to='/#'
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
                    alt="Black and White Portrait of NavLink Man"
                    loading="lazy"
                />
                </NavLink>
                <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
                >
                <li>
                    <NavLink to='/#' className="dropdown-item" >My profile</NavLink>
                </li>
                <li>
                    <NavLink to='/#' className="dropdown-item" >Settings</NavLink>
                </li>
                <li>
                    <NavLink to='/#' onClick={handleLogOut} className="dropdown-item" >Logout</NavLink>
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