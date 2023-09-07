import React, { useState,useEffect} from "react";
import Toast,{showErrorToast,showSuccessToast} from "../Components/Toast";
import Loading from "../Components/Loading";
import axios from "axios";
import Auth from "../Roles/Auth";
import { useNavigate } from "react-router-dom";

const AddProfile = () => {
  const navigate = useNavigate();
  const api_key = process.env.REACT_APP_API_KEY;
  const [isLoading,setIsLoading] = useState(false);
  const [biodataFile,setBiodataFile] = useState();
  const [profileFile,setProfileFile] = useState();
  const [resumeFile,setResumeFile] = useState();
  const [profileData,setProfileData] = useState({
    P_SurName:'',
    P_MiddleName:'',
    P_FatherName:'',
    P_MotherName:'',
    P_Gender:'Male',
    P_DOB:'',
    P_Email:'',
    LivingWithFamily:'Yes',
    Discription:'',
    HigherEducation:'',
    EmloyeeIn:'',
    AnnualIncome:'',
    resumeUpload:'',
  });
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

  const getProfileData = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const clearForm = () =>{
    setProfileFile(null);
    setBiodataFile(null);
    setResumeFile(null);
    setProfileData({
        P_SurName:'',
        P_MiddleName:'',
        P_FatherName:'',
        P_MotherName:'',
        P_Gender:'Male',
        P_DOB:'',
        P_Email:'',
        LivingWithFamily:'Yes',
        Discription:'',
        HigherEducation:'',
        EmloyeeIn:'',
        AnnualIncome:'',
        resumeUpload:'',
      });          
  }

  const checkMissing = () =>{
    const missignList = []; 

    Object.keys(profileData).forEach((key)=>{       
        if(!profileData[key]){
            missignList.push(key);
        }        
    });
    if(!profileFile){
        missignList.push('Profile Image');
    }
    if(!biodataFile){
        missignList.push('BioData');
    }
    if(profileData.resumeUpload==="Yes" && !resumeFile){
        missignList.push("Resume");
    }
    return missignList;
  }

  const handleSubmit = async () => {
    const missingField = checkMissing();
    if(missingField.length===0){
        setIsLoading(true);    
        const combinedData = {...profileData,...userAuth}
        const formData = new FormData();
        
        formData.append("profileFile",profileFile);
        formData.append("biodataFile",biodataFile);
        formData.append("resumeFile",resumeFile);
        Object.keys(combinedData).forEach((key)=>{
            formData.append(key,combinedData[key]);
        });

            
        if(window.confirm('Have you checked all documnets and then posting all the data?')){
            await axios.post(
                `${api_key}/addProfile`,
                formData,
                {timeout:30000}
            ).then(
                (response)=>{   
                    if(response.status===200){
                        showSuccessToast(`${response.data}`);
                        clearForm();
                        navigate('/');
                        setIsLoading(false);
                    }
                }
            ).catch((e)=>{
                console.log("Error:",e);
                if(e.response){          
                    showErrorToast(`${e.response.data}`);
                    console.error('Error while addProfile!',e.response.data);
                }else{
                    showErrorToast('Oops! Server Unreachable.');
                }
                setIsLoading(false);
            });
        }
        else{
            showErrorToast("Oops! your browser notification is blocked");
            setIsLoading(false);
        }
    }else{
        alert(`Please Fill Data Correctly or Something Is missing:`);
    }
  }

  const marqueeString = `If you already requested once and your request is not accepted than Contact the admin to have your request Accept.`;

  return(
  <>
  {userAuth.RoleId===null?(
    <>
    <h1 className="m-4">Please login to access this page</h1>
    </>
  ):(
  <div>
  <Toast/>
    {isLoading?(<><Loading/></>)
    :(<div className="container">
        <div className="row justify-content-center mt-5">
        <marquee><h4 className="mb-4 text-danger fw-bold">{marqueeString}</h4></marquee>
                <div className="card p-4 w-75">
                    <div className="card-title text-center">
                        <h2>General Details</h2>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="surname" className="form-label">SurName:</label>
                                    <input value={profileData.P_SurName} name="P_SurName" onChange={getProfileData} type="text" className="form-control" id="surname"/>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="middleName" className="form-label">Middle Name:</label>
                                    <input value={profileData.P_MiddleName} name="P_MiddleName" onChange={getProfileData} type="text" className="form-control" id="middleName"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="fatherName" className="form-label">Father's Name:</label>
                                    <input value={profileData.P_FatherName} name="P_FatherName" onChange={getProfileData} type="text" className="form-control" id="fatherName"/>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="motherName" className="form-label">Mother's Name:</label>
                                    <input value={profileData.P_MotherName} name="P_MotherName" onChange={getProfileData} type="text" className="form-control" id="motherName"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="gender" className="form-label">Gender:</label>
                                    <select className="form-control" id="gender" name="P_Gender" onChange={getProfileData}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="livingWithFamily" className="form-label">Are you living with family?</label>
                                    <select className="form-control" id="livingWithFamily" name="LivingWithFamily" onChange={getProfileData}>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dob" className="form-label">Date of Birth:</label>
                                <input value={profileData.P_DOB} name="P_DOB" onChange={getProfileData} type="date" className="form-control" id="dob"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input name="P_Email" value={profileData.P_Email} onChange={getProfileData} type="email" className="form-control" id="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="uploadPhoto" className="form-label">Upload Photo:</label>
                                <input type="file" accept="image/*" onChange={(event)=>{setProfileFile(event.target.files[0])}} className="form-control" id="uploadPhoto"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="uploadPhoto" className="form-label">Upload Your Biodata:</label>
                                <input type="file" onChange={(event)=>{setBiodataFile(event.target.files[0])}} className="form-control" id="uploadPhoto"/>
                            </div>
                        </form>
                    </div>
                </div>
        
                <div className="card p-4 w-75 mt-5">
                    <div className="card-title text-center">
                        <h2>Additional Information</h2>
                    </div>
                    <div className="card-body">
                    <div className="mb-3">
                            <label htmlFor="highestEducation" className="form-label">Highest Education:</label>
                            <select className="form-control" id="highestEducation" name="HigherEducation" onChange={getProfileData}>
                                <option>---Select---</option>
                                <option value="SSC">SSC</option>
                                <option value="HSC">HSC</option>
                                <option value="ITI">ITI</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="PHD">PHD</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employedIn" className="form-label">Employed In:</label>
                            <select name="EmloyeeIn" onChange={getProfileData} className="form-control" id="employedIn">
                                <option>---Select---</option>
                                <option value="Unemployed">Unemployed</option>
                                <option value="Student">Student</option>                                
                                <option value="Government">Government</option>
                                <option value="Private">Private</option>
                                <option value="Self Employed">Self Employed</option>
                                <option value="Freelancer">Freelancer</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="annualIncome" className="form-label">Annual Income (in INR):</label>
                            <select name="AnnualIncome" onChange={getProfileData} className="form-control" id="annualIncome">
                                <option>---Select---</option>
                                <option value="No Income">No Income</option>
                                <option value="0-2 Lakh">0-2 Lakh</option>
                                <option value="2-4 Lakh">2-4 Lakh</option>
                                <option value="4-6 Lakh">4-6 Lakh</option>
                                <option value="6-8 Lakh">6-8 Lakh</option>
                                <option value="8-10 Lakh">8-10 Lakh</option>
                                <option value="10-12 Lakh">10-12 Lakh</option>
                                <option value="12-15 Lakh">12-15 Lakh</option>
                                <option value="15-20 Lakh">15-20 Lakh</option>
                                <option value="Above 20 Lakh">Above 20 Lakh</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="resumeUpload" className="form-label">Want to upload resume?</label>
                            <div className="form-check">
                                <input onChange={getProfileData} className="form-check-input" type="radio" name="resumeUpload" id="resumeYes" value="Yes"/>
                                <label className="form-check-label" htmlFor="resumeYes">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check">
                                <input onChange={getProfileData} className="form-check-input" type="radio" name="resumeUpload" id="resumeNo" value="No"/>
                                <label className="form-check-label" htmlFor="resumeNo">
                                    No
                                </label>
                            </div>
                        </div>
                        {profileData.resumeUpload==='Yes'?(
                            <>
                            <div className="mb-3">
                                <label htmlFor="uploadPhoto" className="form-label">Upload Your Resume:</label>
                                <input type="file" onChange={(event)=>{setResumeFile(event.target.files[0])}} className="form-control" id="uploadPhoto"/>
                            </div>
                            </>
                        ):()=>setResumeFile(null)}
                    
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description of Yourself,Profession and study:</label>
                            <textarea value={profileData.Discription} name="Discription" onChange={getProfileData} className="form-control" id="description"></textarea>
                        </div>
                                            
                    </div>
                </div>

                <button onClick={handleSubmit} className="btn btn-primary w-75 my-5">Upload</button>
                
        </div>
    </div>)
    }
  </div>
    )}
  </>
  );
}
export default AddProfile;