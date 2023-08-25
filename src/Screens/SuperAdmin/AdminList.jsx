import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import Toast, { showSuccessToast,showErrorToast } from '../../Components/Toast';
import { useNavigate } from "react-router-dom";
import Auth from "../../Roles/Auth";
import { MDBContainer,MDBDataTable} from "mdbreact";
import DateFormater from "../../Components/DateFormater";
import axios from "axios";
import ImageUrlGiver from "../../Components/ImageUrlGiver";

const AdminList = () =>{
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [usersData,setUsersData] = useState([]);
    const [userAuth,setUserAuth] = useState({
        RoleId:'',
        UserId:'',
        Email:''
      });

    const fetch_admins = async(currentRoleId,currentUserId) =>{
        await axios.post('http://192.168.0.112:8080/list/Admin',{RoleId:currentRoleId,currentUserId:currentUserId},{timeout:15000}).then(
            (response)=>{
                setUsersData(response.data);
                setIsLoading(false);
            }
        ).catch((e)=>{
            if(e.response){
                showErrorToast(`${e.response.data}`);
                console.error('Error while Getting DistrictAdmin!',e);
            }else{
                showErrorToast('Server Unreachable!');
            }
            setIsLoading(false);
        });
    }

    useEffect(()=>{
        const fetchData = async () =>{
            const {RoleId,UserId,Email} = await Auth();
            setUserAuth({RoleId,UserId,Email});
            if(RoleId===1 || RoleId===2){
                fetch_admins(RoleId,UserId);
            }else{
              navigate('/error');
            }
        }
        fetchData();             
      },[]);

      const handleUserRemove = async (user) =>{
        setIsLoading(true);
        if(window.confirm(`Do You realy want to remove ${user.SurName} ${user.MiddleName}  from Admin of ${user.AssignedDistrict}.Keep In Mind That If You remove him from Admin then Whole Assigned District will also be removed.`)){
            await axios.post(
                'http://192.168.0.112:8080/remove/Admin',
                {
                    UserRoleId:user.UserRoleId, 
                    currentRoleId:userAuth.RoleId, 
                    currentUserId:userAuth.UserId,
                },
                {timeout:15000}
            ).then(
            async ()=>{               
            await fetch_admins(userAuth.RoleId,userAuth.UserId);                        
            showSuccessToast('District Admin Remove Success');
          }
        ).catch((e)=>{
          if(e.response){
            showErrorToast(`${e.response.data}`);
            console.error('Error while Removing District Admin!',e);
          }else{
            showErrorToast('Server Unreachable!');
          }
          setIsLoading(false);
        });

        }else{
            setIsLoading(false);
            showErrorToast('Your Browser Notification is Off!');
        } 
      }

      const columnAndRow = {
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
          },
          {
            label:'Mobile Number',
            field:'MobileNumber',
            sort:'asc'
          },
          {
            label:'Gender',
            field:'Gender',
            sort:'asc'
          },
          {
            label:'Pargana',
            field:'Pargana',
            sort:'asc'
          },
          {
            label:'AssignedPinCodes',
            field:'AssignedPinCodes',
            sort:'asc'
          },
          {
            label:'WhoMade',
            field:'WhoMade',
            sort:'asc'
          },
          {
            label:'WhenMade',
            field:'WhenMade',
            sort:'asc'
          },
          {
            label:'Remove',
            field:'Remove',
            sort:'asc'
          },
        ],
        rows:usersData.map((user,index)=>{
        const AssignedPinCodelist = user.AssignedPinCode ? user.AssignedPinCode.split(","):[];
        
          return {
            Index: index+1,
            Name: (
              <div className="d-flex justify-content-start">
              <div className="d-flex">
              <img
                      src={ImageUrlGiver(user.ProfilePath)}
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
            MobileNumber:user.MobileNumber,
            Gender:user.Gender,
            Pargana:user.Pargana,
            AssignedPinCodes:(
                <div>
                    {AssignedPinCodelist.map((PinCode, pinIndex) => (
                        <span key={pinIndex} className="badge badge-primary rounded-pill d-inline fw-bold">{PinCode}</span>
                    ))}
                </div>
            ),
            WhoMade:user.WhoMadeName,
            WhenMade:DateFormater(user.WhenMade),
            Remove:(
              <button type="button" onClick={()=>handleUserRemove(user)} className="btn btn-secondary btn-floating">
                <i className="fas fa-user-slash"></i>
              </button>          
            )                
          }      
        })  
      }
    
    return(
        <>
            <div>
            <Toast/>
            {isLoading?(<Loading/>):(              
                <div className="row justify-content-center">
                  <div className="card text-start w-75 mt-4">
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
            )}
            </div>
        </>
    );
}

export default AdminList;