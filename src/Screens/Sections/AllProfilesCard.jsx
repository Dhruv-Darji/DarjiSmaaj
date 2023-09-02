import React, { useState } from "react";
import ImageUrlGiver from "../../Components/ImageUrlGiver";
import DateFormater, { AgeCalculator } from "../../Components/DateFormater";
import { NavLink } from "react-router-dom";
import DownloadFile from "../../Components/DownloadFile";
import { showErrorToast, showSuccessToast } from "../../Components/Toast";
import axios from "axios";

const AllProfilesCard = ({reLoad,setReLoad,headingText,discriptionText,whereUsed,allProfiles,userAuth}) =>{
    const [currentPage, setCurrentPage] = useState(1);
    const profilesPerPage = 6;
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = allProfiles.slice(indexOfFirstProfile, indexOfLastProfile);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    const RowsCode = ({heading,bodyCode,textPosition}) =>{
        return (
            <div className={`row ${textPosition}`}>
                <div className="col-sm-3">
                    <p className="mb-0">{heading}</p>
                </div>
                <div className="col-sm-9">
                    <p className="text-muted mb-0">{bodyCode}</p>
                </div>
            </div>            
        );
    }

    const saveProfileInCart = async (profile) =>{      
      await axios.post(
        'http://192.168.0.112:8080/profileCart/addToCart',
        {
          UserId:userAuth.UserId,
          ProfileId:profile.ProfileId
        },
        {timeout:20000}
      ).then(
        (response)=>{
          if(response.status === 200){
            showSuccessToast(`${profile.P_MiddleName}'s Profile Added To Cart Successfully 👍.`);
          }
        }
      ).catch((e)=>{
        if(e.response){          
          showErrorToast(`${e.response.data}`);
          console.error('Error while addToCart!',e.response.data);
        }else{
            showErrorToast('Oops! Server Unreachable.');
        }
      });
    }

    const removeFromCart = async (profile) =>{
      await axios.post(
        'http://192.168.0.112:8080/profileCart/removeFromCart',
        {
          UserId:userAuth.UserId,
          ProfileId:profile.ProfileId
        },
        {timeout:20000}
      ).then((response)=>{
        if(response.data){
          showSuccessToast(`${response.data}`);
          setReLoad(!reLoad);
        }
      })
      .catch((e)=>{
        if(e.response){          
          showErrorToast(`${e.response.data}`);
          console.error('Error while remove from Cart!',e.response.data);
        }else{
            showErrorToast('Oops! Server Unreachable.');
        }
      });
    }

    const ModalCard = ({profile,index}) =>{
      return(
        <div className="modal fade" key={index} id={`exampleModal-${index}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"><span className="text-primary font-italic me-1">{`${profile.P_MiddleName}'s`}</span> Profile</h5>
              <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

            <section>
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-4">
                  <div className="card mb-4">
                    <div className="card-body text-center">
                      <img src={ImageUrlGiver(profile.ProfileImagePath)} alt="avatar"
                        className="img-fluid"/>                      
                    </div>
                  </div>
                  <div className="card mb-4 mb-lg-0">
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush rounded-3">
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">                          
                          <p className="mb-0">Gender:</p>
                          <p className="mb-0 text-muted">{profile.P_Gender}</p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">                          
                          <p className="mb-0">Date Of Birth:</p>
                          <p className="mb-0 text-muted">{DateFormater(profile.P_DOB)}</p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">                          
                          <p className="mb-0">Living With Family?</p>
                          <p className="mb-0 text-muted">{profile.LivingWithFamily}</p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">                          
                          <p className="mb-0">Age:</p>
                          <p className="mb-0 text-muted">{AgeCalculator(profile.P_DOB)} Years</p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">                          
                          <p className="mb-0">Whene Biodata Added?</p>
                          <p className="mb-0 text-muted">{DateFormater(profile.P_WhenMade)}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="card mb-4">
                    <div className="card-body">
                      <RowsCode heading={'Name'} bodyCode={`${profile.P_SurName} ${profile.P_MiddleName}`} textPosition={'text-start'} />
                      <hr/>
                      <RowsCode heading={`Father's Name`} bodyCode={`${profile.P_FatherName}`} textPosition={'text-start'} />
                      <hr/>
                      <RowsCode heading={`Mother's Name`} bodyCode={`${profile.P_MotherName}`} textPosition={'text-start'} />
                      <hr/>
                      <RowsCode heading={'Number'} bodyCode={`${profile.MobileNumber}`} textPosition={'text-start'} />
                      <hr/>
                      <RowsCode heading={'Address'} bodyCode={`${profile.Address}`} textPosition={'text-start'} />
                      <hr/>
                      <RowsCode heading={'Native'} bodyCode={`${profile.Native}`} textPosition={'text-start'} />
                      <hr/>
                      <RowsCode heading={'Pargana'} bodyCode={`${profile.Pargana}`} textPosition={'text-start'} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card mb-4 mb-md-0">
                        <div className="card-body">
                        <p className="mb-4"><span className="text-primary font-italic me-1">{`${profile.P_MiddleName}'s`}</span>
                        Career Detail
                          </p>
                          <ul className="list-group list-group-flush rounded-3">
                              <li className="list-group-item d-flex justify-content-between align-items-center p-3">                          
                                <p className="mb-0"><i className="fas fa-graduation-cap text-primary"></i>{" "}Education:</p>
                                <p className="mb-0 text-muted">{profile.HigherEducation}</p>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center p-3">                          
                                <p className="mb-0"><i className="fas fa-user-tie text-warning"></i>{" "}Employment:</p>
                                <p className="mb-0 text-muted">{profile.EmloyeeIn}</p>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center p-3">                          
                                <p className="mb-0"><i className="fas fa-hand-holding-dollar text-success"></i>{" "}Annual Income:</p>
                                <p className="mb-0 text-muted">{profile.AnnualIncome}</p>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center p-3">                          
                                <p className="mb-0"><i className="fas fa-address-card text-info"></i>{" "}BioData:</p>
                                <p className="mb-0 text-muted">
                                <button onClick={async ()=>await DownloadFile(profile.BiodataFilePath)} type="button" className="btn-sm btn btn-secondary btn-floating">
                                    <i className="fas fa-download"></i>
                                </button>
                                </p>
                              </li>
                              {profile.ResumeFilePath?(<li className="list-group-item d-flex justify-content-between align-items-center p-3">                          
                                <p className="mb-0"><i className="fas fa-file-invoice text-danger"></i>{" "}Resume:</p>
                                <p className="mb-0 text-muted">
                                <button onClick={async ()=>await DownloadFile(profile.ResumeFilePath)} type="button" className="btn-sm btn btn-secondary btn-floating">
                                    <i className="fas fa-download"></i>
                                </button>
                                </p>
                              </li>):(<></>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card mb-4 mb-md-0">
                        <div className="card-body">
                          <p className="mb-4"><span className="text-primary font-italic me-1">{profile.P_MiddleName}'s</span> 
                          Description
                          </p>
                          <NavLink
                            className="text-primary"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#collapseExample"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                          >
                          <span role="img" aria-label="righ-hand arrow">👉</span> Full Detail
                          </NavLink>

                          <div className="collapse mt-3 text-muted" id="collapseExample">
                            {profile.Discription}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>       
            
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary fs-6" data-mdb-dismiss="modal">Close</button>
              {whereUsed==='AllProfiles'?(<button type="button" onClick={()=>saveProfileInCart(profile)} className="btn btn-primary fs-6" data-mdb-dismiss="modal"><i className="fas fa-heart text-danger"></i> Save In Cart</button>):
               whereUsed==='ProfileCart'?(<button type="button" onClick={()=>removeFromCart(profile)} className="btn btn-danger fs-6" data-mdb-dismiss="modal"><i className="fas fa-heart-crack text-light"></i> Remove From Cart</button>):
               (<></>)
              }
            </div>
          </div>
        </div>
      </div>
      );
    }

    return(
        <>
        {currentProfiles.map((profile,index)=>{
          return <ModalCard index={index} profile={profile}/>
        })}        
        <div className="align-item-center">
            <div className="container pb-2 mb-2">
                <section className="p-md-3 mx-md-5 text-center text-lg-left">
                    <h2 className="text-center font-weight-bold mb-4 pb-1">{headingText}</h2>
                    <p className="text-center lead mb-5 pb-2 text-muted">{discriptionText}</p>
                    <div className="row">
                    {currentProfiles.map((profile,index)=>{
                        return(
                            <div className="col-lg-4 mb-4">
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
                                    <span className="mx-2 text-dark">|</span>
                                    Pargana:{profile.Pargana}
                                    </p>
                                    <h6 className="text-muted mb-4">Done {profile.HigherEducation} & currently {profile.EmloyeeIn} with {profile.AnnualIncome} salary</h6>
                                    {userAuth.UserId?(
                                    <button type="button" className="btn btn-primary" data-mdb-toggle="modal" data-mdb-target={`#exampleModal-${index}`}>
                                      Show Profile
                                    </button>):
                                    (<button onClick={()=>showErrorToast('Oops! First you have to login')} type="button" className="btn btn-primary">
                                      Show Profile
                                    </button>)
                                    }
                                </div>
                              </div>
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