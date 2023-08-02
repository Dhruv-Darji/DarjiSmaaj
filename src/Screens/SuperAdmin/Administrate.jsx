import React, { useEffect, useState } from "react";
import Auth from "../../Roles/Auth";
import {MDBDataTable,MDBContainer} from 'mdbreact'; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Administrate = () => {
    const navigate = useNavigate();
    const [inputCheck,setInputCheck] = useState(false);
    const [selectedRole,setSelectedRole] = useState({
        RoleId:'',
        RoleName:'',       
    });
    const [users,SetUsers] = useState([]);
    const [userAuth, setUserAuth] = useState({
        RoleId: '',
        UserId: '',
        Email: ''
    });
    const fetchUser = async() =>{
        await axios.get('http://192.168.0.112:8080/list/assignRole')
        .then(
            (respons)=>{
                const usersdata = respons.data;
                SetUsers(usersdata.result);      
            }
        ).catch((err)=>{
            console.log('error while fetch data:',err);            
        })
    }
    useEffect(() => {
        const fetchData = async () => {
            const { RoleId, UserId, Email } = await Auth();
            setUserAuth({ RoleId, UserId, Email });
            console.log(RoleId);
        }
        fetchData();
        fetchUser();
    }, []);

    const columnAndRow ={
        autowidth:true,
        columns:[
            {
                label:'Index',
                field:'Index',
                sort:'asc'
            },
            {
                label:'Name',
                field:'Name',
                sort:'asc'
            },{
                label:'Role',
                field:'Role',
                sort:'asc'
            },{
                label:'Pincode',
                field:'Pincode',
                sort:'asc'
            },{
                label:'Pargana',
                field:'Pargana',
                sort:'asc'
            },{
                label:'Show',
                field:'Show',
                sort:'asc'
            }
        ],
        rows:users.map((user,index)=>{
            // const datePart = new Date(user.DOB).toLocaleDateString();
            return{
                Index: index + 1,
                Name: (
                    <div className="d-flex justify-content-start">
                    <div className="d-flex">
                    <img
                            src="Images/Profile.jpeg"
                            alt="profile"
                            style={{ width: '45px', height: '45px' }}
                            className="rounded-circle "
                            />
                        <div className="ms-3">
                            <p className="fw-bold mb-1">{`${user.SurName} ${user.MiddleName}`}</p>
                            <p className="text-muted mb-0">{`${user.Email}`}</p>
                        </div>
                    </div>
                    </div>
                ),
                Pargana:user.Pargana,
                Email: user.Email,
                Pincode:user.PinCode,
                Role: user.RoleId===1 ? 'SuperAdmin' : user.RoleId===2 ? 'DistrictAdmin': user.RoleId===3 ? 'Admin': 'NormalUser', 
                Show:(
                    <button type="button" data-mdb-toggle="modal" data-mdb-target={`#exampleModal-${index}`} className="btn btn-secondary btn-floating">
                        <i className="fas fa-pen-to-square"></i>
                    </button>          
                )
            }
        })
    }

    const handleRoleChange = (user) =>{
        const changeRoleId = selectedRole.RoleId;
        const userUserId = user.UserId;
        const currentRoleId = userAuth.RoleId;
        const combinedData = {changeRoleId,userUserId,currentRoleId};
        console.log("formData:",combinedData)
        if(window.confirm(`Are You Sure to assign him as ${selectedRole.RoleName}`)){
            axios.post('http://192.168.0.112:8080/change/assignRole',combinedData).then(
                ()=>{
                    console.log("Role Updated successfuly");
                    fetchUser();
                    setSelectedRole({
                        RoleId:'',
                        RoleName:'',    
                    });
                    setInputCheck(false);
                }
            )
        }
        else{
            console.log('You have blocked the notification of window.confirm')
        }      
    }

    const handleVillageChange = async (user,testnumber) =>{
        const AssignedPinCode =testnumber;
        const CurrentUserId = userAuth.UserId;
        const CurrentUserRoleId = userAuth.RoleId;
        const UserId = user.UserId;

        const combinedData ={AssignedPinCode,CurrentUserId,UserId,CurrentUserRoleId}
        
        await axios.post('http://192.168.0.112:8080/change/admin/village',combinedData).then(
            ()=>{
                console.log('data passed successfully')
            }
        ).catch((e)=>{
            console.log('error in change admin village metthod:',e);
        })
        
    }
    const ProfileModal = ({user}) =>{
        const [testnumber,setTestnumber] = useState(''); 
        if(!user){
            return(
                <h1>Not user</h1>
            );
        }
        const datePart = new Date(user.DOB).toLocaleDateString();
        return (        
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit In Role</h5>
                    <button type="button" onClick={
                    ()=>{
                    setSelectedRole({
                        RoleId:'',
                        RoleName:'',       
                    });
                    setInputCheck(false);
                    }} className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className="card-body text-center">
            <div className="mt-3 mb-4">
              <img src="Images/Profile.jpeg"
                alt="test"
                className="rounded-circle img-fluid w-25"/>
            </div>
            <h4 className="mb-2">{`${user.SurName} ${user.MiddleName} ${user.FatherName}`}</h4>
            <p className="text-muted mb-4">
            {(()=>{
                if(user.RoleId===1){
                    return(
                        <span className="badge badge-success rounded-pill d-inline">@SuperAdmin</span>
                    );
                }
                else if(user.RoleId===2){
                    return(
                        <span className="badge badge-primary rounded-pill d-inline">@DistrictAdmin</span>
                    );
                }
                else if(user.RoleId===3){
                    return(
                        <span className="badge badge-warning rounded-pill d-inline">@Admin</span>
                    );
                }else{
                    return(
                        <span className="badge badge-danger rounded-pill d-inline">@NormalUser</span>
                    );
                }
            })()}
            <span className="mx-2">|</span> <a
                href="#!">{`${user.Email}`}</a>
            <span className="mx-2">|</span>
            {`${datePart}`} 
                </p>            
            <button type="button" className="btn btn-primary btn-rounded btn-lg">
              Message now
            </button>
            <div className="card-body">
                <hr className="mt-4 mb-4"/>
                <div className="d-flex justify-content-around text-center p-4 mt-2 mb-2">
                        {(()=>{
                        if(userAuth.RoleId===1){
                            if(user.RoleId===2){
                                return(<div>
                                    <p className="text-muted fw-bold mb-0">Assigned District</p>
                                    <span className="badge badge-warning rounded-pill d-inline">@Panchmahals</span>
                                </div>);
                            }
                            if(user.RoleId===3){
                                return(<div>
                                    <p className="text-muted fw-bold mb-0">Assigned Village</p>
                                    <span className="badge badge-warning rounded-pill d-inline">@389330</span>
                                    {inputCheck===true && !selectedRole.RoleId?(
                                        <>
                                        <div className="form-outline">
                                            <input value={testnumber} onChange={(e)=>setTestnumber(e.target.value)} type="number" className="form-control" />
                                        </div>
                                        </>
                                    ):!selectedRole.RoleId?(<span onClick={()=>setInputCheck(true)} className="badge change-curser badge-success rounded-pill d-inline">@add</span>):(<></>)}
                                </div>);                        
                            }
                        }
                    })()}
                    <div>
                        <p className="text-muted fw-bold mb-0">Village</p>
                        <p className="mb-2 fw-light">{`${user.Village}`}</p>                
                    </div>
                    <div>
                        <p className="text-muted fw-bold mb-0">Address</p>
                        <p className="mb-2 fw-light">{`${user.Address}`}</p>                
                    </div>
                    </div>
                </div>
            <div className="d-flex justify-content-between text-center p-4 mt-2 mb-2">
              <div>
                <p className="text-muted fw-bold mb-0">Gender</p>
                <p className="mb-2 fw-light">{`${user.Gender}`}</p>                
              </div>
              <div className="px-3">
                <p className="text-muted fw-bold mb-0">Pargana</p>
                <p className="mb-2 fw-light">{`${user.Pargana}`}</p>                
              </div>
              <div>
                <p className="text-muted fw-bold mb-0">Native</p>
                <p className="mb-2 fw-light">{`${user.Native}`}</p>                
              </div>
              <div>
                <p className="text-muted fw-bold mb-0">PinCode</p>
                <p className="mb-2 fw-light">{`${user.PinCode}`}</p>                
              </div>
            </div>
          </div>
                </div>
                <div className="modal-footer">
                {(()=>{
                    if(inputCheck===false){if(!selectedRole.RoleId){if(userAuth.RoleId===1){
                        return(
                            <p>Make him{" "}
                            <span change-curser onClick={()=>setSelectedRole({RoleId:2,RoleName:'DistrictAdmin'})} className="badge badge-primary rounded-pill d-inline">@DistrictAdmin</span>
                            {" "}or{" "}
                            <span change-curser onClick={()=>setSelectedRole({RoleId:3,RoleName:'Admin'})} className="badge badge-warning rounded-pill d-inline">@Admin</span>                            
                            </p>
                        );
                    }
                    if(userAuth.RoleId===2){
                        return(
                            <p>Make him{" "}                            
                            <span change-curser onClick={()=>setSelectedRole({RoleId:3,RoleName:'Admin'})} className="badge badge-warning rounded-pill d-inline">@Admin</span>                            
                            </p>
                        );                        
                    }}
                    else{
                        if(selectedRole.RoleId===2){
                            return (
                                <p>You Assigning Role Of <span role="img" aria-label="right-hand">👉</span> {" "}
                                <span className="badge badge-primary rounded-pill d-inline">@DistrictAdmin</span>
                                </p>
                            );
                        }
                        if(selectedRole.RoleId===3){
                            return(
                                <p>You Assigning Role Of <span role="img" aria-label="right-hand">👉</span> {" "}
                                <span className="badge badge-warning rounded-pill d-inline">@Admin</span>
                                </p>
                            );
                        }                        
                    }}
                })()}
                    <button type="button" onClick={
                        ()=>{
                            setSelectedRole({
                                RoleId:'',
                                RoleName:''
                                });
                            setInputCheck(false);                            
                            }} className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                    { !selectedRole.RoleId?<></>:(<button type="button" onClick={()=>handleRoleChange(user)} data-mdb-dismiss="modal" className="btn btn-secondary">Save changes</button>)}
                    { inputCheck===true?(<button type="button" onClick={()=>handleVillageChange(user,testnumber)} data-mdb-dismiss="modal" className="btn btn-secondary">Save changes</button>):(<></>)}
                </div>
                </div>);
    }

    if (userAuth.RoleId === 1 || userAuth.RoleId === 2) {
        return (
            <> 
            {users.map((user, index) => (
                <div
                    className="modal fade"
                    id={`exampleModal-${index}`}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    key={index}
                >
                    <div
                    className="modal-dialog"
                    style={{ maxWidth: "50%" }}
                    >
                    <ProfileModal user={user} />
                    </div>
                </div>
            ))}           
            <div className="row justify-content-center">
            <div className="card text-center w-75 mt-4">
            <MDBContainer>
                <MDBDataTable
                    striped
                    responsive
                    noBottomColumns
                    data={columnAndRow}
                    searching
                    displayEntries={true}
                    entries={10}
                    paginationLabel={['previous','next']}
                />
            </MDBContainer>
            </div> 
            </div>                         
            </>
        );
    } else {
        navigate('/error');
        return null;
    }
}

export default Administrate;
