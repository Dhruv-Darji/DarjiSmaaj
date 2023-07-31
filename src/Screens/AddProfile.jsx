import React, { useEffect, useState } from "react";
import Auth from "../Roles/Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProfile = () =>{
    const navigate = useNavigate();
    const [profileImage,SetProfileImage] = useState();
    const [proofImage,SetProfImage] = useState();
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
      
      const [singleUser,setSingleUser] = useState({
        SurName:"",
        MiddleName:"",
        FatherName:"",
        MotherName:"",
        Gender:"Male",
        DOB:"",
        ProfileEmail:"",
        LivingWithFamily:"Yes",
        PinCode:"",
        Native:"",
        Village:"",
        Address:"",
        Discription:"",
        ApproovedbyAdmin:"No",
      });
      const getSingleUser = (event) => {
        const { name, value } = event.target;
        setSingleUser({ ...singleUser, [name]: value });
      }

      const handleSubmit = async (e) =>{
        e.preventDefault();        

        const combinedData = {...singleUser,...userAuth}
        const formData = new FormData();        
        formData.append("profileImage", profileImage);
        formData.append("verificationImage",proofImage);

        Object.keys(combinedData).forEach((key)=>{
          formData.append(key,combinedData[key]);
        });
        console.log('formdata:',formData);

        await axios.post('http://localhost:8080/addProfile',formData).then(
          ()=>{
            navigate('/');
            setSingleUser({
              SurName:"",
              MiddleName:"",
              FatherName:"",
              MotherName:"",
              Gender:"Male",
              DOB:"",
              ProfileEmail:"",
              LivingWithFamily:"Yes",
              PinCode:"",
              Native:"",
              Village:"",
              Address:"",
              Discription:"",
              ApproovedbyAdmin:"No",
            });
          }
        ).catch((e)=>console.log('error while uploading Profile:',e));

      }

    
      if(userAuth.RoleId === null && userAuth.UserId === null && userAuth.Email === null){
        return(
            <h1>You are not logged In please Login first</h1>
        );
      }else{
        return(
            <>
            <div className="row justify-content-center">
              <div className="card bg-light text-center w-75 mt-4">
              <div className="card-header"><h3 className="p-2">Add Your Profile</h3></div>
              <div className="card-body">
              <h5>Personal Information</h5>
              <hr></hr>
                      <form>                       
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input type="text" id="form3Example1" name='SurName' value={singleUser.SurName} onChange={getSingleUser} className="form-control" />
                                <label className="form-label" htmlFor="form3Example1">Surname</label>
                              </div>
                            </div>
                            
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input type="text" id="form3Example1" name='MiddleName' value={singleUser.MiddleName} onChange={getSingleUser} className="form-control" />
                                <label className="form-label" htmlFor="form3Example1">Middle name</label>
                              </div>
                            </div>

                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input type="text" id="form3Example2" name='FatherName' value={singleUser.FatherName} onChange={getSingleUser} className="form-control" />
                                <label className="form-label" htmlFor="form3Example2">Full Name of Father</label>
                              </div>
                            </div>

                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input type="text" id="form3Example2" name='MotherName' value={singleUser.MotherName} onChange={getSingleUser} className="form-control" />
                                <label className="form-label" htmlFor="form3Example2">Full Name of Mother</label>
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

                            <div className="col-md-6 mb-4 d-flex justify-content-center">
                            <p>Date of Birth</p>                            
                            <div className="form-group form-outline">
                            <input  name="DOB" value={singleUser.DOB} onChange={getSingleUser} type="date" className="form-control" id="exampleFormControlInput1" />                            
                          </div>
                                                       
                          </div>                          

                          <div className="col-md-6 mb-4">
                          <div className="form-outline mb-4">
                            <input type="email" id="form3Example3" name='ProfileEmail' value={singleUser.ProfileEmail} onChange={getSingleUser} className="form-control" />
                            <label className="form-label" htmlFor="form3Example3">Email</label>
                          </div>
                          </div>
                            
                          <div className="col-md-6 mb-4 d-flex justify-content-center">
                            <p>
                            are you living with parents? 
                            </p>
                            <div className="form-outline w-50">
                            <select id="inputState" className="form-control bg-transparent" name="LivingWithFamily" onChange={getSingleUser}>
                                <option value='Yes'>Yes</option>
                                <option value='No'>No</option>                  
                            </select>
                            
                            </div>
                            
                            {/* <i className="dropdown-toggle dropdown-toggle-split"
                            data-mdb-toggle="dropdown"
                            aria-expanded="true"></i>
                            <span className="visually-hidden">Toggle Dropdown</span>
                            <ul className="dropdown-menu" name="LivingWithFamily" onChange={getSingleUser}>
                              <option className="dropdown-item" value="Yes" onClick={()=>{getParentValue('Yes')}}>Yes</option>
                              <option className="dropdown-item" value="No" onClick={()=>{getParentValue('No')}}>No</option>
                            </ul>                             */}
                          </div>
                            
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input type="number" id="form3Example2" name='PinCode' value={singleUser.PinCode} onChange={getSingleUser} className="form-control" />
                                <label className="form-label" htmlFor="form3Example2">Pincode</label>
                              </div>
                            </div>   

                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input type="text" id="form3Example2" name='Native' value={singleUser.Native} onChange={getSingleUser} className="form-control"/>
                                <label className="form-label" htmlFor="form3Example2">Native</label>
                              </div>
                            </div>
                            
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input type="text" id="form3Example2" name='Village' value={singleUser.Village} onChange={getSingleUser} className="form-control"/>
                                <label className="form-label" htmlFor="form3Example2">Village</label>
                              </div>
                            </div>                          
                          </div>                          
                          
                          <div className="form-outline mb-4">
                              <input type="text" id="form3Example2" name='Address' value={singleUser.Address} onChange={getSingleUser} className="form-control"/>
                              <label className="form-label" htmlFor="form3Example2">Address</label>
                          </div>

                          <div className="form-outline mb-4">
                            <textarea className="form-control" id="form6Example7" name='Discription' value={singleUser.Discription} onChange={getSingleUser} rows="4"></textarea>
                            <label className="form-label" htmlFor="form6Example7">Discription Yourself</label>
                          </div>
                          
                          <div className="d-flex justify-content-center my-4">
                            <p>
                            Upload Your Image                            
                            </p>
                            <input type="file" onChange={(event)=>{SetProfileImage(event.target.files[0])}} className="form-outline px-4" id="customFile" />
                          </div>                   

                          <h5>Education Information</h5>
                          <hr></hr>

                          <div className="d-flex justify-content-center my-4">
                            <p>
                            Upload Any Document for verification                            
                            </p>
                            <input type="file" onChange={(event)=>{SetProfImage(event.target.files[0])}} className="form-outline px-4" id="customFile" />
                          </div>


                          <div className="form-check d-flex mb-4">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33"/>
                            <label className="form-check-label" htmlFor="form2Example33">
                              Confirm with privacy Policy
                            </label>
                          </div>
                          
                          <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block mb-4">
                            Sign up
                          </button>                      
                      </form>               
                </div>              
              </div>
            </div>                
            </>
        );
      }
}

export default AddProfile;