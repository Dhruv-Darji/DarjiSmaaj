import React from "react";
import "../Styles/ContactUs.css"

const AddProfile = () => {
  return(
  <>
    <div class="container">
        <div class="row justify-content-center mt-5">
                <div class="card p-4 w-75">
                    <div class="card-title text-center">
                        <h2>Personal Details</h2>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="surname" class="form-label">Surname:</label>
                                    <input type="text" class="form-control" id="surname"/>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="middleName" class="form-label">Middle Name:</label>
                                    <input type="text" class="form-control" id="middleName"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="fatherName" class="form-label">Father's Name:</label>
                                    <input type="text" class="form-control" id="fatherName"/>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="motherName" class="form-label">Mother's Name:</label>
                                    <input type="text" class="form-control" id="motherName"/>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="dob" class="form-label">Date of Birth:</label>
                                <input type="date" class="form-control" id="dob"/>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="gender" class="form-label">Gender:</label>
                                    <select class="form-control" id="gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="livingWithFamily" class="form-label">Are you living with family?</label>
                                    <select class="form-control" id="livingWithFamily">
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email:</label>
                                <input type="email" class="form-control" id="email"/>
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">Description:</label>
                                <textarea class="form-control" id="description"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="uploadPhoto" class="form-label">Upload Photo:</label>
                                <input type="file" class="form-control" id="uploadPhoto"/>
                            </div>
                        </form>
                    </div>
                </div>
        
                <div class="card p-4 w-75 mt-5">
                    <div class="card-title text-center">
                        <h2>Educational Details</h2>
                    </div>
                    <div class="card-body">
                    <div class="mb-3">
                            <label for="highestEducation" class="form-label">Highest Education:</label>
                            <select class="form-control" id="highestEducation">
                                <option value="SSC">SSC</option>
                                <option value="HSC">HSC</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="PHD">PHD</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="employedIn" class="form-label">Employed In:</label>
                            <select class="form-control" id="employedIn">
                                <option value="Unemployed">Unemployed</option>
                                <option value="Government">Government</option>
                                <option value="Private">Private</option>
                                <option value="Self Employed">Self Employed</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="annualIncome" class="form-label">Annual Income (in INR):</label>
                            <select class="form-control" id="annualIncome">
                                <option value="No Income">No Income</option>
                                <option value="0-2 Lakh">0-2 Lakh</option>
                                <option value="2-4 Lakh">2-4 Lakh</option>
                                <option value="4-12 Lakh">4-12 Lakh</option>
                                <option value="Above 12 Lakh">Above 12 Lakh</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="lastJobCompany" class="form-label">Last Job Company:</label>
                            <input type="text" class="form-control" id="lastJobCompany"/>
                        </div>
                        <div class="mb-3">
                            <label for="lastJobDesignation" class="form-label">Last Job Designation:</label>
                            <input type="text" class="form-control" id="lastJobDesignation"/>
                        </div>
                        <div class="mb-3">
                            <label for="resumeUpload" class="form-label">Want to upload resume?</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="resumeUpload" id="resumeYes" value="Yes"/>
                                <label class="form-check-label" for="resumeYes">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="resumeUpload" id="resumeNo" value="No"/>
                                <label class="form-check-label" for="resumeNo">
                                    No
                                </label>
                            </div>
                        </div>
                    
                    </div>
                </div>

                <button className="btn btn-primary w-75 my-5">Upload</button>
                
        </div>
    </div>
  </>
  );
}
export default AddProfile;