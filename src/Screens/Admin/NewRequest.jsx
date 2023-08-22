import React,{ useState,useEffect } from "react";
import Loading from "../../Components/Loading";
import Auth from "../../Roles/Auth";
import { MDBContainer,MDBDataTable} from "mdbreact";
import Toast, { showSuccessToast,showErrorToast } from '../../Components/Toast';
import axios from "axios";
import DateFormater from "../../Components/DateFormater";
import DownloadFile from "../../Components/DownloadFile";
import ImageUrlGiver from "../../Components/ImageUrlGiver";


const NewRequest = () =>{
    const [isLoading,setIsLoading] = useState(true);
    const [usersData,setUsersData] = useState([]);

    const getNewRequestData = async (UserId) =>{
        await axios.get(
            `http://192.168.0.112:8080/getProfile/administrate/Pending/${UserId}`,
            {timeout:20000}
        ).then(
            (response)=>{
                if(response.status===200){
                    setUsersData(response.data);
                    setIsLoading(false);
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
        const {UserId} = await Auth();
        await getNewRequestData(UserId);                 
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
                      src={ImageUrlGiver(user.ProfileImagePath)}
                      alt="profile"
                      style={{ width: '50px', height: '50px' }}
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
            Show:(
                <button type="button" data-mdb-toggle="modal" data-mdb-target={`#exampleModal-${index}`} className="btn btn-secondary btn-floating">
                    <i className="fas fa-pen-to-square"></i>
                </button>          
            )
          }      
        })  
      }

    const RowsCode = ({heading,bodyCode}) =>{
        return (
            <div className="row">
                <div className="col-sm-3 text-start">
                    <p className="mb-0">{heading}</p>
                </div>
                <div className="col-sm-9 text-end">
                    <p className="text-muted mb-0">{bodyCode}</p>
                </div>
            </div>            
        );
    }

    const ProfileModal = ({user}) =>{        
        return(
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Pending Requests</h5>
                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="card-body text-center">
                <div className="mt-3 mb-4">
                <img src={ImageUrlGiver(user.ProfileImagePath)} alt="Profile file Not Found"
                    className="rounded-circle img-fluid" style={{width: '125px'}} />
                </div>
                <h4 className="mb-2">{`${user.P_SurName} ${user.P_MiddleName} ${user.P_FatherName}`}</h4>
                <p className="text-muted mb-4">
                    <span className="badge badge-success rounded-pill d-inline">@{user.ApprovedStatus}</span>
                    <span className="mx-2">|</span> <a
                        href="#!">{user.P_Email}</a>
                    <span className="mx-2">|</span>
                    {`${DateFormater(user.P_DOB)}`}
                </p>                
                <button type="button" className="mb-4 btn btn-primary btn-rounded btn-lg">
                Accept Request Now
                </button>
                <div className="p-4">
                    <RowsCode heading={'ResumeFile:'} bodyCode={
                        user.ResumeFilePath?(<button onClick={async ()=>await DownloadFile(user.ResumeFilePath)} type="button" className="btn btn-secondary btn-floating">
                            <i className="fas fa-download"></i>
                        </button>):(<>
                            <span className="badge badge-danger rounded-pill d-inline">No File Found</span>
                        </>)
                    }/>
                    <hr/>                    
                    <RowsCode heading={'BiodataFile:'} bodyCode={
                        <button onClick={async ()=>await DownloadFile(user.BiodataFilePath)} type="button" className="btn btn-secondary btn-floating">
                            <i className="fas fa-download"></i>
                        </button>
                    }/>
                    <hr/>
                    <RowsCode heading={'When_Profile_Made?'} bodyCode={DateFormater(user.P_WhenMade)}/>
                    <hr/>
                    <RowsCode heading={'Living_With_Family?'} bodyCode={user.LivingWithFamily}/>
                    <hr/>
                    <RowsCode heading={'HigherEducation:'} bodyCode={user.HigherEducation}/>
                    <hr/>
                    <RowsCode heading={'EmloyeeIn:'} bodyCode={user.EmloyeeIn}/>
                    <hr/>
                    <RowsCode heading={'AnnualIncome:'} bodyCode={user.AnnualIncome}/>
                    <hr/>
                    <RowsCode heading={'Profile_discription:'} bodyCode={user.Discription}/>
                </div>
            </div>            
            </div>
            </div>
        );
    }
      
    return(<>
    <div>
    <Toast/>
    {isLoading?(<><Loading/></>):(
        <>
        {usersData.map((user, index) => (
                <div
                    className="modal fade"
                    id={`exampleModal-${index}`}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    key={index}
                >
                    <div className="modal-dialog">
                        <ProfileModal user={user} />
                    </div>
                </div>
            ))}
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
        </>
    )}
    </div>
    </>);   
}

export default NewRequest;