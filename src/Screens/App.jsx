import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Navbar from "../Components/Navbar";
import SignUp from "./SignUp";
import AddProfile from "./AddProfile";
import AboutUs from "./AboutUs";

const App = () => {
    const location = useLocation();
    const hideNavbarOnLogin = location.pathname === "/login" || location.pathname === "/signup"; // Hide Navbar on both Login and Signup routes.

    return (
        <>
            {!hideNavbarOnLogin && <Navbar />}
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/signup" element={<SignUp/>}/>
                <Route exact path="/aboutUs" element={<AboutUs/>}/>
                <Route exact path="/addProfile" element={<AddProfile/>} />
                <Route path="*" element={<Home/>}/>
            </Routes>
        </>
    );
}
export default App;
