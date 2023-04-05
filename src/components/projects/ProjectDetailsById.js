import React, { useState ,useEffect} from "react";
import { useSelector} from "react-redux";
import axios from "axios";
import { useNavigate ,useParams,useLocation, Link} from "react-router-dom";

function ProjectDetailsById() {
  let params=useParams()
  //create state
  let [projects,setProjects]=useState({})
  let [concerns,setConcerns]=useState([])
  let [updates,setUpdates]=useState([])
  let [teamSize,setTeamSize]=useState()
  let [team,setTeam]=useState({})
  let [message,setMessage]=useState("")
  //user state from store
  let {userObj,status,userLoginStatus,errorMessage}=useSelector(state=>state.login)
  //get token from session storage
  let token=sessionStorage.getItem("token");

//getProjectDetails
const getProjectDetails=async()=>{
      //if user is admin get all projects
      if(userObj.role=="Admin_Users"){
        let res=await axios.get(`http://localhost:3030/admin-api/project_details/project_id/${params.project_id}/${userObj.email}`,{
          headers:{Authorization: `Bearer ${token}`}
        })
        console.log(res.data)
        //if response status is 201 then 
        if(res.status==201){
            //set values
            setProjects(res.data.payload)
            setConcerns(res.data.payload.concerns)
            setUpdates(res.data.payload.updates)
            setTeam(res.data.payload.team)
            setTeamSize(res.data.teamsize[0].teamsize)
        }
        else{
          //set err messgae
          setMessage(res.data.message)
        }
      }
      //if user is gdo get projects under his/her
      if(userObj.role=="GDO"){
        let res=await axios.get(`http://localhost:3030/gdo-api/project_details/project_id/${params.project_id}/${userObj.email}`,{
          headers:{Authorization: `Bearer ${token}`}
        })
        console.log(res.data)
        //if response status is 201 then 
        if(res.status==201){
          //set values
            setProjects(res.data.payload)
            setConcerns(res.data.payload.concerns)
            setUpdates(res.data.payload.updates)
            setTeam(res.data.payload.team)
            setTeamSize(res.data.teamsize[0].teamsize)
        }
        else{
          setMessage(res.data.message)
        }
      }
}


useEffect(()=>{
  // getUserByEmail()
  getProjectDetails()
},[])

return (
    <div className="text-center">
      
        <h2>Project Details</h2>
        <div className="row">
            <div className="col-sm-4">
              {/* team size */}
            <div className='card text-center shadow p-3 m-3'>
            <div className='card-body bg-info'>
                <h3 className="">Team Size</h3>
                <h4>{teamSize}</h4>
            </div>
            </div>
            </div>
            <div className="col-sm-4">
              {/* fitness indicator */}
            <div className='card text-center shadow p-3 m-3'>
            <div className='card-body bg-info'>
                <h3 className="">Fitness Indicator</h3>
                <h4>{projects.fitness_indicator}</h4>
            </div>
            </div>
            </div>
            <div className="col-sm-4">
              {/* project status */}
            <div className='card text-center shadow p-3 m-3'>
            <div className='card-body bg-info'>
                <h3 className="">Project Status</h3>
                <h4>{projects.status}</h4>
            </div>
            </div>
            </div>
        </div>
        {/* Project details */}
        <h2 className="text-danger">{message}</h2>
        <table className='table table-bordered'>
        <thead>
          <tr className="text-primary">
            <th>Project Id</th>
            <th>Project Name</th>
            <th>Project_Type</th>
            <th>Status</th>
            <th>Domain</th>
            <th>Client</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Fitness Indicator</th>
            <th>GDO</th>
            
          </tr>
        </thead>
        <tbody>
          
            <tr key={projects.project_id}>
              
              <td>{projects.project_id}</td>
              <td>{projects.project_name}</td>
              <td>{projects.project_type}</td>
              <td>{projects.status}</td>
              <td>{projects.domain}</td>
              <td>{projects.client}</td>
              <td>{projects.start_date}</td>
              <td>{projects.end_date}</td>
              <td>{projects.fitness_indicator}</td>
              <td>{projects.GDO}</td>
              
            </tr>
          
        </tbody>

    </table>
    {/* concerns */}
    <h3>Concerns</h3>
    <table className='table table-bordered'>
        <thead>
          <tr className="text-primary">
            <th>concern_Description</th>
            <th>concern_id</th>
            <th>concern_sevetity</th>
            <th>concern_status</th>
            <th>mitigated_date</th>
            <th>raised_by</th>
            <th>raised_from</th>
            <th>raised_on</th>
          </tr>
        </thead>
        <tbody>
            {concerns.map((item, index) => (
            <tr key={index}>
              <td>{item.concern_desc}</td>
              <td>{item.concern_id}</td>
              <td>{item.concern_severity}</td>
              <td>{item.concern_status}</td>
              <td>{item.mitigated_date}</td>
              <td>{item.raised_by}</td>
              <td>{item.raised_from}</td>
              <td>{item.raised_on}</td>   
            </tr>
          ))} 
        </tbody>  
    </table>
    {/* updates */}
    <h3>Updates</h3>
    <table className='table table-bordered'>
        <thead>
          <tr className="text-primary">
            <th>quality_status</th>
            <th>resource_status</th>
            <th>schedule_status</th>
            <th>update_date</th>
            <th>update_status</th>
            <th>updated_by</th>
            <th>waiting_for_clientInput</th>
          </tr>
        </thead>
        <tbody>
          {/* iterarte updates */}
        {updates.map((update, index) => (
            <tr key={index}>
              <td>{update.quality_status}</td>
              <td>{update.resource_status}</td>
              <td>{update.schedule_status}</td>
              <td>{update.update_date}</td>
              <td>{update.update_status}</td>
              <td>{update.updated_by}</td>
              <td>{String(update.waiting_for_clientInput)}</td>
            
            </tr>
          ))}  
        </tbody>
        </table>
        {/* team composition */}
        <h2>Team</h2>
        <table className='table table-bordered table-responsive'>
        
        <thead>
          <tr className="text-primary">
            <th>Team_Id</th>
            <th>Allocation_Type</th>
            <th>Billing_Status</th>
            <th>email</th>
            <th>exposedToClient</th>
            <th>project_id</th>
            <th>resource_name</th>
            <th>role_in_project</th>
            <th>start_date</th>
            <th>end_date</th>
            <th>Status</th>
    
          </tr>
        </thead>
        <tbody>
          
            <tr>
              
              <td>{team.team_id}</td>
              <td>{team.allocation_type}</td>
              <td>{team.billing_status}</td>
              <td>{team.email}</td>
              <td>{String(team.exposedToClient)}</td>
              <td>{team.project_id}</td>
              <td>{team.resource_name}</td>
              <td>{team.role_in_project}</td>
              <td>{team.start_date}</td>
              <td>{team.end_date}</td>
              <td>{team.status}</td>
            </tr>
        </tbody>
    </table>
    </div>
  );
}
//export projectDetailsById
export default ProjectDetailsById;

