import React, { useState ,useEffect} from "react";
import { useSelector} from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Projects() {
  //declaring useNavigate
  let navigate=useNavigate()
  //create state with empty array
  let [projects,setProject]=useState([])
  //get userObj from redux store
  let {userObj}=useSelector(state=>state.login)
  //get token from session storage
  let token=sessionStorage.getItem("token");

 //getProjectDetails
  const getProjectDetails=async(projectId)=>{ 
      navigate(`/projectDetails-byProjectId/${projectId}`)
  }

  //get projects route
  const getProjects=async()=>{
    //if user not login
    if(token==null){
        //navigate login
        navigate('/login')
    }
    else{
      try{
        if(userObj.role=="GDO"){
          //get request to get all projects
          let res=await axios.get(`http://localhost:3030/gdo-api/project-dashboard/${userObj.email}`,{
            headers:{Authorization: `Bearer ${token}`}
          })
          //set projects
          setProject(res.data.payload)
          
        }  
      }
      catch(err){
          console.log("err",err)
      }
  }
}



useEffect(()=>{
  // getUserByEmail()
  getProjects()
},[])
  return (
    <div className="text-center">
        <h2 className="primary">Projects</h2>
        {/* table */}
        <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr className="">
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Project Type</th>
            <th>Start Date</th>
            <th>Status</th>
            <th>Domain</th>
            <th>Fitness Indicator</th>
            <th>End Date</th>
            <th>Client</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((item, index) => (
            <tr key={index}>
              <td onClick={()=>getProjectDetails(projects[index].project_id)}>{item.project_id}</td>
              <td>{item.project_name}</td>
              <td>{item.project_type}</td>
              <td>{item.start_date}</td>
              <td>{item.status}</td>
              <td>{item.domain}</td>
              <td>{item.fitness_indicator}</td>
              <td>{item.end_date}</td>
              <td>{item.client}</td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  );
}
//export projects
export default Projects;