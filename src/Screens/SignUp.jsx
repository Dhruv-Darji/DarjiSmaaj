import React, { useState } from "react";
import axios from "axios";
import '../Styles/SignUp.css';
import { useNavigate } from "react-router-dom";
import Loading from '../Components/Loading';
import Toast, { showSuccessToast,showErrorToast } from '../Components/Toast';

  const SignUp = () => {   
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const [singleUser,setSingleUser] = useState({
      SurName:'',
      MiddleName: '',
      FatherName:'',
      Pargana:'',
      PinCode:'',
      Gender:'Male',
      Native:'',
      Village:'',
      DOB:'',
      Address:'',
      MobileNumber:'',
      Email:'',
      Password:'',
      ConfirmPassword:'',
      RoleName:'AuthUser',
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setProfileImage(file)
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
      }
    };
    
    const getSingleUser = (event) => {
      const { name, value } = event.target;
      setSingleUser({ ...singleUser, [name]: value });
    }

    const checkMissing = () =>{
      const missignList = [];
      Object.keys(singleUser).forEach((key)=>{
        if(!singleUser[key]){
          missignList.push(key);
        }
      });
      if(!profileImage){
        missignList.push("Profile Image");
      }
      return missignList;
    }

    const handleSubmit = async (e) =>{
      const missingField = checkMissing();
      if(missingField.length>0){
        alert(`Please Fill ${missingField}`)
      }
      else if(singleUser.Password != singleUser.Password){
        alert(`Oops! Password and ConfirmPassword didn't Match.`);
      }
      else{
        setIsLoading(true);
        const formData = new FormData();
        formData.append('profileImage',profileImage);
        Object.keys(singleUser).forEach((key)=>{
          formData.append(key,singleUser[key])
        });
        console.log(formData);      
          if(window.confirm(`Do you confirm to Register?`)){
            await axios.post('http://192.168.0.112:8080/createUser',formData).then(
            ()=>{
                showSuccessToast('Successfully Registered 🥰.');
                setIsLoading(false);
                navigate('/login');
            }
          ).catch((e)=>{
            setIsLoading(false);
            if(e.response){          
              showErrorToast(`${e.response.data}`);
              console.error('Error while SignUp!',e.response.data);
            }else{
              showErrorToast('Oops! Server Unreachable.');
            }
          }); 
        }else{
          showErrorToast("Oops! Your windows notification is off.");
          setIsLoading(false);
        }
      }
    }
      return(
          <>    
            <div>
            <Toast/>     
            {isLoading?(<><Loading/></>):(<section className="">
              <div className="px-4 py-5 px-md-5 text-center text-lg-start BackgroundColor">
                <div className="container">
                  <div className="row gx-lg-5 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                      <h1 className="my-5 display-3 fw-bold ls-tight">
                        The best offer <br />
                        <span className="text-primary">for your business</span>
                      </h1>
                      <p className="ColorStyle">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                        quibusdam tempora at cupiditate quis eum maiores libero
                        veritatis? Dicta facilis sint aliquid ipsum atque?
                      </p>
                    </div>
                    <div className="col-lg-6 mb-5 mb-lg-0">
                      <div className="card">
                        <div className="card-body py-5 px-md-5">
                          <form>
                          <div className="text-center"><h3 className="mb-5">Register</h3></div>
                          <div className="text-center mb-4">
                            <label htmlFor="profileImage" className="profile-image-label">
                              {previewImage ? (
                                <img                                
                                  id="previewImage"
                                  src={previewImage}
                                  alt="Profile Preview"
                                  style={{width: 150 , height:150}}
                                  className="rounded-circle img-fluid change-curser"
                                />
                              ) : (
                                <img src="https://img.freepik.com/free-vector/add-user-concept-illustration_114360-458.jpg?w=740&t=st=1692357502~exp=1692358102~hmac=7961fff36ae43ea83096d2f182d4b946407e7171ab88d9f0deb272ba55171ced"
                                className="rounded-circle img-fluid change-curser" style={{width: 150}} />
                              )}
                              <input
                                type="file"
                                className="d-none"
                                id="profileImage"
                                name="profileImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                              />
                            </label>
                          </div>                                             
                            <div className="row">
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <input type="text" id="form3Example1" name='SurName' value={singleUser.SurName} onChange={getSingleUser} className="form-control" required/>
                                  <label className="form-label" htmlFor="form3Example1">SurName</label>
                                </div>
                              </div>
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <input type="text" id="form3Example1" name='MiddleName' value={singleUser.MiddleName} onChange={getSingleUser} className="form-control" required/>
                                  <label className="form-label" htmlFor="form3Example1">Middle name</label>
                                </div>
                              </div>
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <input type="text" id="form3Example2" name='FatherName' value={singleUser.FatherName} onChange={getSingleUser} className="form-control" required/>
                                  <label className="form-label" htmlFor="form3Example2">Father's Name</label>
                                </div>
                              </div>
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <input type="text" id="form3Example2" name='Pargana' value={singleUser.Pargana} onChange={getSingleUser} className="form-control" required/>
                                  <label className="form-label" htmlFor="form3Example2">Paragana</label>
                                </div>
                              </div>
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <input type="number" id="form3Example2" name='PinCode' value={singleUser.PinCode} onChange={getSingleUser} className="form-control" required/>
                                  <label className="form-label" htmlFor="form3Example2">Pincode</label>
                                </div>
                              </div>                          
                              <div className="col-md-6 mb-4">
                              <div className="form-outline">
                              <select id="inputState" className="form-control bg-transparent" name="Gender" onChange={getSingleUser}>
                                      <option value='Male'>Male</option>
                                      <option value='Female'>Female</option>                  
                                    </select>
                                  </div>
                              </div>
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <input type="text" id="form3Example2" name='Native' value={singleUser.Native} onChange={getSingleUser} className="form-control" required/>
                                  <label className="form-label" htmlFor="form3Example2">Native</label>
                                </div>
                              </div>
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <input type="text" id="form3Example2" name='Village' value={singleUser.Village} onChange={getSingleUser} className="form-control" required/>
                                  <label className="form-label" htmlFor="form3Example2">Village</label>
                                </div>
                              </div>                          
                            </div>
                            
                            <div className="form-group mt-4 mb-4 px-2">
                                  <label  className="start-0" htmlFor="exampleFormControlInput1">Date of birth </label>
                                  <input  name="DOB" value={singleUser.DOB} onChange={getSingleUser} type="date" className="form-control" id="exampleFormControlInput1" required/>
                            </div>
                            
                            <div className="form-outline mb-4">
                                <input type="text" id="form3Example2" name='Address' value={singleUser.Address} onChange={getSingleUser} className="form-control" required/>
                                <label className="form-label" htmlFor="form3Example2">Address</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="tel" id="typePhone" className="form-control" name="MobileNumber" value={singleUser.MobileNumber} onChange={getSingleUser} required/>
                                <label className="form-label" htmlFor="typePhone">Phone number (WhatsApp Number)</label>
                            </div>                              
                            
                            <div className="form-outline mb-4">
                              <input type="email" id="form3Example3" name='Email' value={singleUser.Email} onChange={getSingleUser} className="form-control" required/>
                              <label className="form-label" htmlFor="form3Example3">Email address</label>
                            </div>

                          
                            <div className="form-outline mb-4 d-flex">
                              <input type={isPasswordVisible?"text":"password"} id="form3Example4" name='Password' value={singleUser.Password} onChange={getSingleUser} className="form-control" required/>
                              <label className="form-label" htmlFor="form3Example4">Password</label>
                              <span
                                className={`password-toggle ${isPasswordVisible ? "visible" : ""}`}
                                onClick={()=>setIsPasswordVisible(!isPasswordVisible)}
                              >
                                {isPasswordVisible ? <i className="far fa-eye change-curser"></i> : <i className="far fa-eye-slash change-curser"></i>}
                              </span>
                            </div>
                            
                            <div className="form-outline mb-4">
                              <input type="password" id="form3Example4" name='ConfirmPassword' value={singleUser.ConfirmPassword} onChange={getSingleUser} className="form-control" required/>
                              <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
                            </div>

                          
                            <div className="form-check d-flex mb-4">
                              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33"/>
                              <label className="form-check-label" htmlFor="form2Example33">
                                Confirm with privacy Policy
                              </label>
                            </div>
                            
                            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>
                              Sign up
                            </button>                      
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </section>)}
            </div>
          </>
      );
  }
  export default SignUp;