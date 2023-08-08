import React, { useEffect, useState } from "react";
import '../Styles/Login.css';
import axios from "axios";
import Auth from "../Roles/Auth";
import { useNavigate } from "react-router-dom";
import Toast, { showSuccessToast,showErrorToast } from '../Components/Toast';

const Login = () => {
    
  const [fieldValue,setFieldValue] = useState({
    Email:"",
    Password:""
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

  const handleField = (event) =>{
    const {name,value} = event.target;
    setFieldValue({...fieldValue, [name] : value});
  }

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const passUser = async() =>{
    const { RoleId } = await Auth();
    console.log(RoleId);
    if(RoleId===1 || RoleId===2 || RoleId===3){      
      navigate('/Dashboard');
    }
    else{
      navigate('/');
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(userAuth.RoleId === null && userAuth.UserId === null && userAuth.Email === null){
      axios.post('http://localhost:8080/authenticate',fieldValue).then(
        (response)=>{
          if(response.status===200){
            passUser();
          }
        }        
      ).catch((e)=>{
        if(e.response){
          showErrorToast(`${e.response.data}`);
        console.error('Error while login!',e.response.data);
      }else{
        showErrorToast('Server Unreachable!');
      }
      });
    }
    else{
      showSuccessToast("You are already authenticated.");
      console.log('You are already authenticated.');
    }
  }
    return(
        <> 
        <Toast/>              
        <section className="">
          <div className="px-4 py-5 px-md-5 text-center text-lg-start BackgroundColor">
            <div className="container">
              <div className="row gx-lg-5 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <h1 className="my-5 display-3 fw-bold ls-tight">
                  Fashion with<br />                  
                    <span className="text-primary">Skill and Precision</span>
                  </h1>
                  <p className="ColorStyle">
                  A tailor is a skilled professional in the art of sewing and crafting clothing. They are adept at creating custom-made garments that fit perfectly and enhance the wearer's appearance. Tailors possess a deep understanding of fabrics, patterns, and design techniques, allowing them to transform raw materials into stylish and functional clothing items.
                  </p>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="card">
                    <div className="card-body py-5 px-md-5">
                      <form>
                      <div className="text-center">
                        <h3 className="mb-5">Sign in</h3>
                        <div className="form-outline mb-4">
                          <input type="email" name="Email" value={fieldValue.Email} onChange={handleField} id="typeEmailX-2" className="form-control form-control-lg" required/>
                          <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" name="Password" value={fieldValue.Password} onChange={handleField} id="typePasswordX-2" className="form-control form-control-lg" required/>
                          <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                        </div>

                        <div className="row mb-4">
                          <div className="col d-flex justify-content-center">
                            
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="form2Example31"/>
                              <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                            </div>
                          </div>

                          <div className="col">
                            <a href='/login'>Forgot password?</a>
                          </div>
                        </div>
                      </div>
                                    
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block mb-4">
                          LogIn
                        </button>
                      
                        <div className="text-center">
                        <p>Not a member? <a href="/signup">Register</a></p>
                          <p>or Login with:</p>
                          <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-facebook-f"></i>
                          </button>

                          <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-google"></i>
                          </button>
                        </div>
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
export default Login;