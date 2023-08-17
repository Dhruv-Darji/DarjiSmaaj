import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Error from "../Components/Error";
import Navbar from "../Components/Navbar";
import SignUp from "./SignUp";
import AboutUs from "./AboutUs";
import AdminList from "./SuperAdmin/AdminList";
import Dashboard from "./Dashboard";
import ContactUs from "./ContactUs";
import NewRequest from "./Admin/NewRequest";
import AddProfile from "./AddProfile";
import Administrate from "./SuperAdmin/Administrate";
import AcceptedRequest from "./Admin/AcceptedRequest";
import RejectedRequest from "./Admin/RejectedRequest";
import DistrictAdminList from "./SuperAdmin/DistrictAdminList";

const App = () => {
    const location = useLocation();
    const hideNavbarOnPaths = ["/login", "/signup", "/error"];
    const shouldHideNavbar = hideNavbarOnPaths.includes(location.pathname);

    return (
        <>
            {!shouldHideNavbar && <Navbar />}
            <Routes>                
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/error" element={<Error/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/signup" element={<SignUp/>}/>
                <Route exact path="/aboutUs" element={<AboutUs/>}/>
                <Route exact path="/AdminList" element={<AdminList/>}/>             
                <Route exact path="/Dashboard" element={<Dashboard/>}/>
                <Route exact path="/new-request" element={<NewRequest/>}/>
                <Route exact path="/contact-us" element={<ContactUs/>}/>
                <Route exact path="/addProfile" element={<AddProfile/>}/>
                <Route exact path="/Administrate" element={<Administrate/>}/> 
                <Route exact path="/accepted-request" element={<AcceptedRequest/>}/>
                <Route exact path="/rejected-request" element={<RejectedRequest/>} />
                <Route exact path="/DistrictAdminList" element={<DistrictAdminList/>} />
                <Route path="*" element={<Home/>}/>
            </Routes>
        </>
    );
}
export default App;
