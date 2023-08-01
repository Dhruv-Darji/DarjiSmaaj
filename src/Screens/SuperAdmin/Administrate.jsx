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
                    <button type="button" data-mdb-toggle="modal" data-mdb-target="#exampleModal" class="btn btn-primary btn-floating">
                        <i class="fas fa-download"></i>
                    </button>          
                )
            }
        })
    }

    if (userAuth.RoleId === 1 || userAuth.RoleId === 2) {
        return (
            <>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">testing</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
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
