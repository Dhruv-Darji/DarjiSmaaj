import React, { useEffect, useState } from "react";
import Auth from "../../Roles/Auth";
import {MDBDataTable,MDBContainer} from 'mdbreact'; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Administrate = () => {
    const navigate = useNavigate();
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
                    <button type="button" data-mdb-toggle="modal" data-mdb-target="#exampleModal" className="btn btn-primary btn-floating">
                        <i className="fas fa-download"></i>
                    </button>          
                )
            }
        })
    }
    if (userAuth.RoleId === 1 || userAuth.RoleId === 2) {
        return (
            <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                    <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className="card-body text-center">
            <div className="mt-3 mb-4">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                className="rounded-circle img-fluid w-25"/>
            </div>
            <h4 className="mb-2">Julie L. Arsenault</h4>
            <p className="text-muted mb-4">@Programmer <span className="mx-2">|</span> <a
                href="#!">mdbootstrap.com</a></p>
            <div className="mb-4 pb-2">
              <button type="button" className="btn btn-outline-primary btn-floating">
                <i className="fab fa-facebook-f fa-lg"></i>
              </button>
              <button type="button" className="btn btn-outline-primary btn-floating">
                <i className="fab fa-twitter fa-lg"></i>
              </button>
              <button type="button" className="btn btn-outline-primary btn-floating">
                <i className="fab fa-skype fa-lg"></i>
              </button>
            </div>
            <button type="button" className="btn btn-primary btn-rounded btn-lg">
              Message now
            </button>
            <div className="d-flex justify-content-between text-center mt-5 mb-2">
              <div>
                <p className="mb-2 h5">8471</p>
                <p className="text-muted mb-0">Wallets Balance</p>
              </div>
              <div className="px-3">
                <p className="mb-2 h5">8512</p>
                <p className="text-muted mb-0">Income amounts</p>
              </div>
              <div>
                <p className="mb-2 h5">4751</p>
                <p className="text-muted mb-0">Total Transactions</p>
              </div>
            </div>
          </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>
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
