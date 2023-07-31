import React, { useState } from "react";
import axios from "axios";
import '../Styles/SignUp.css';
import { useNavigate } from "react-router-dom";
// import Toast from "../Components/Toast"

  const SignUp = () => {   
    const navigate = useNavigate();
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
      Email:'',
      Password:'',
      ConfirmPassword:'',
      RoleName:'AuthUser',
    });
    
    const getSingleUser = (event) => {
      const { name, value } = event.target;
      setSingleUser({ ...singleUser, [name]: value });
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();
      console.log(singleUser);      
      await axios.post('http://localhost:8080/createUser',singleUser).then(
        (response)=>{
          console.log('response code:',response.status);
          if(response.status === 200){
            navigate('/login');
          }
        }
      ).catch((e)=>{
        console.error('Creating NormalUser Error.',e);
      });      

    }
      return(
          <>    
          {/* <Toast />      */}
          <section className="">
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
                            <input type="email" id="form3Example3" name='Email' value={singleUser.Email} onChange={getSingleUser} className="form-control" required/>
                            <label className="form-label" htmlFor="form3Example3">Email address</label>
                          </div>

                        
                          <div className="form-outline mb-4">
                            <input type="password" id="form3Example4" name='Password' value={singleUser.Password} onChange={getSingleUser} className="form-control" required/>
                            <label className="form-label" htmlFor="form3Example4">Password</label>
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

          </section>
          </>
      );
  }
  export default SignUp;