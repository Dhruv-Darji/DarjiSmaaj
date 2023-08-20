import React,{ useState,useEffect } from "react";
import Loading from "../../Components/Loading";
import Auth from "../../Roles/Auth";
import { MDBContainer,MDBDataTable} from "mdbreact";
import Toast, { showSuccessToast,showErrorToast } from '../../Components/Toast';
import axios from "axios";
import DateFormater from "../../Components/DateFormater";


const RejectedRequest = () =>{
    const [isLoading,setIsLoading] = useState(true);
    const [usersData,setUsersData] = useState([]);
    const [userAuth,setUserAuth] = useState({
        RoleId:'',
        UserId:'',
        Email:''
    });

    const getNewRequestData = async (UserId) =>{
        await axios.get(
            `http://192.168.0.112:8080/getProfile/administrate/Rejected/${UserId}`,
            {timeout:20000}
        ).then(
            (response)=>{
                if(response.status===200){
                    setUsersData(response.data);
                    setIsLoading(false)
                }
            }
        ).catch((e)=>{
            setIsLoading(false);
            if(e.response){          
                showErrorToast(`${e.response.data}`);
                console.error('Error while addProfile!',e.response.data);
            }else{
                showErrorToast('Oops! Server Unreachable.');
            }
            setIsLoading(false);
        });
    }

    useEffect(()=>{
        const fetchData = async () =>{
        const {RoleId,UserId,Email} = await Auth();
        await getNewRequestData(UserId);
        setUserAuth({RoleId,UserId,Email});                  
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
            label:'Date Of Birth',
            field:'DOB',
            sort:'asc'
          },
          {
            label:'Gender',
            field:'Gender',
            sort:'asc'
          },
          {
            label:'Profile Adding Date',
            field:'WhenMade',
            sort:'asc'
          },
          {
            label:'Show',
            field:'Show',
            sort:'asc'
          },
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
                      <p className="fw-bold mb-1">{`${user.P_SurName} ${user.P_MiddleName}`}</p>
                      <p className="text-muted mb-0">{`${user.P_Email}`}</p>
                  </div>
              </div>
              </div>
            ),
            DOB: DateFormater(user.P_DOB),
            Gender:user.P_Gender,
            WhenMade:DateFormater(user.P_WhenMade),
          }      
        })  
      }
      
    return(<>
    <div>
    <Toast/>
    {isLoading?(<><Loading/></>):(
        <>
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
    )}
    </div>
    </>);   
}

export default RejectedRequest;