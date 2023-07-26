import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Navbar from "../Components/Navbar";
import SignUp from "./SignUp";

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
                <Route path="*" element={<Home/>}/>
            </Routes>
        </>
    );
}
export default App;
