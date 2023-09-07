import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../Components/Toast";
import DateFormater from "../../Components/DateFormater";
import ImageUrlGiver from "../../Components/ImageUrlGiver";

const ProfileSection = () => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${api_key}/getsixProfile`,
        { timeout: 20000 }
      );
      setProfiles(response.data);
    } catch (error) {
      if (error.response) {
        showErrorToast(`${error.response.data}`);
        console.error("Error while fetching profiles!", error.response.data);
      } else {
        showErrorToast("Oops! Server Unreachable.");
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const ProfileCard = ({ profile, isActive }) => {
    return (
      <div className={isActive ? "carousel-item col-md-3 mb-4 active" : "carousel-item col-md-3 mb-4"}>
        <div className="w-200 mx-auto mb-4">
          <img src={ImageUrlGiver(profile.ProfileImagePath)} className="z-depth-1 rounded-circle img-fluid" alt="Error" style={{height:'300px',width:'250px'}}/>
        </div>
        <h4 className="font-weight-bold">{profile.P_SurName} {profile.P_MiddleName} {profile.P_FatherName}</h4>
        <h5 className="text-muted">{DateFormater(profile.P_DOB)}</h5>
        <h6 className="text-muted">Done {profile.HigherEducation} & currently {profile.EmloyeeIn} with {profile.AnnualIncome} salary</h6>
        <p className="mt-3 mb-4 text-muted">{profile.Discription}</p>
        <ul className="list-unstyled d-flex justify-content-center mt-3 mb-0 red-text">
          <li><i className="fab fa-twitter mx-2"></i></li>
          <li><i className="fab fa-facebook-f mx-2"></i></li>
          <li><i className="fab fa-instagram mx-2"></i></li>
          <li><i className="fab fa-linkedin-in mx-2"></i></li>
        </ul>
      </div>
    );
  };

  return (
    <section id="profiles_section" className="py-5 bg-light">
      <div className="container text-center">
        <div id="carouselExampleCaptions" className="carousel slide" data-mdb-ride="carousel">
          <div className="carousel-inner">
            {profiles.map((profile, index) => (
              <ProfileCard key={index} profile={profile} isActive={index === 0} />
            ))}
          </div>
          <button className="carousel-control-prev text-dark" type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next text-dark" type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
