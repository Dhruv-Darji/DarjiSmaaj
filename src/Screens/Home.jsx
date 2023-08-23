import React, { useState ,useEffect } from "react";
import Auth from "../Roles/Auth";
import '../Styles/Home.css'
import HomeSection from "./Sections/HomeSection";
import ProfileSection from "./Sections/ProfileSection";

const Home = () => {
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

  return (
    <> 
      <div className="data-mdb-animation-delay">     
        <HomeSection userAuth={userAuth}/>
        <hr className="hr hr-blurry mt-4" />
        <ProfileSection/>
      </div>
    </> 
  );
};

export default Home;
