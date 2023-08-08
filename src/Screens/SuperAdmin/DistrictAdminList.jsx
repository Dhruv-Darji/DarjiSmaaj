import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import Toast, { showSuccessToast,showErrorToast } from '../../Components/Toast';
import { useNavigate } from "react-router-dom";
import Auth from "../../Roles/Auth";
import { MDBContainer,MDBDataTable} from "mdbreact";
import axios from "axios";
import DateFormater from "../../Components/DateFormater";

const DistrictAdminList = () => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(true);
  const [usersData,setUsersData] = useState([]);
  const [userAuth,setUserAuth] = useState({
    RoleId:'',
    UserId:'',
    Email:''
  });

  const fetchDadmin = async (RoleId) =>{
    await axios.post('http://192.168.0.112:8080/list/DistrictAdmin',{RoleId},{timeout:15000}).then(
      (response)=>{   
        setUsersData(response.data);
        setIsLoading(false);
      }
    ).catch((e)=>{
      if(e.response){
        showErrorToast(`${e.response.data}`);
        console.error('Error while login!',e.response.data);
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
          fetchDadmin(RoleId);
        }else{
          navigate('/error');
        }
    }
    fetchData();             
  },[]);
  
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
        label:'AssignedDistrict',
        field:'AssignedDistrict',
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
      ...(userAuth.RoleId===1?[
        {
          label:'Action',
          field:'Action',
          sort:'asc'
        }
      ]:[]),
    ],
    rows:usersData.map((user,index)=>{
      return {
        Index: index+1,
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
        Gender:user.Gender,
        Pargana:user.Pargana,
        AssignedDistrict:user.AssignedDistrict,
        WhoMade:user.WhoMadeName,
        WhenMade:DateFormater(user.WhenMade),
        Action:user.SurName                
      }      
    })  
  }

  return (
    <>
    <div>
    <Toast/>
      {isLoading?(<Loading/>):(              
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
      )}
    </div>
    </>
  );
};

export default DistrictAdminList;
