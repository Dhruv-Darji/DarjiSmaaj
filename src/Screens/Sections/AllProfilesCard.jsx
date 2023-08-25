import React, { useState } from "react";
import ImageUrlGiver from "../../Components/ImageUrlGiver";
import DateFormater from "../../Components/DateFormater";

const AllProfilesCard = ({allProfiles,userAuth}) =>{
    const [currentPage, setCurrentPage] = useState(1);
    const profilesPerPage = 6;
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = allProfiles.slice(indexOfFirstProfile, indexOfLastProfile);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    const ProfileCard = ({profile}) =>{
        return(
            <div className="card text-center">
            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src={ImageUrlGiver(profile.ProfileImagePath)} className="img-fluid" alt="Error" style={{height:'300px'}}/>
                <a href="#!">
                <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
                </a>
            </div>
            <div className="card-body">
                <h5 className="card-title">{profile.P_SurName} {profile.P_MiddleName}</h5>
                <p className="text-muted mb-4">
                {DateFormater(profile.P_DOB)}
                <span className="mx-2">|</span>
                {profile.Pargana}
                </p>
                <h6 className="text-muted">Done {profile.HigherEducation} & currently {profile.EmloyeeIn} with {profile.AnnualIncome} salary</h6>
                <a href="#!" className="btn btn-primary">Show Profile</a>
            </div>
            </div>
        );
    }

    return(
        <>
        <div className="align-item-center">
            <div className="container pb-2 mb-2">
                <section className="p-md-3 mx-md-5 text-center text-lg-left">
                    <h2 className="text-center font-weight-bold mb-4 pb-1">All Profiles</h2>
                    <p className="text-center lead mb-5 pb-2 text-muted">The profile page exhibits a collection of profiles with search and sorting capabilities.</p>
                    <div className="row">
                    {currentProfiles.map((profile)=>{
                        return(
                            <div className="col-lg-4 mb-4">
                                <ProfileCard profile={profile}/>
                            </div>
                        );
                    })}
                    </div>
                </section>
            </div>
            <ul className="pagination d-flex justify-content-center pb-4 mb-4">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link change-curser" onClick={() => paginate(currentPage - 1)}>Previous</a>
          </li>
          {/* Create pagination items based on the number of profiles */}
          {Array.from({ length: Math.ceil(allProfiles.length / profilesPerPage) }).map((_, index) => (
            <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
              <a className="page-link change-curser" onClick={() => paginate(index + 1)}>{index + 1}</a>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(allProfiles.length / profilesPerPage) ? 'disabled' : ''}`}>
            <a className="page-link change-curser" onClick={() => paginate(currentPage + 1)}>Next</a>
          </li>
        </ul>
        </div>
        </>
    );
}

export default AllProfilesCard;