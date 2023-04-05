import React, { useState ,useEffect} from "react";
import { useSelector} from "react-redux";
import axios from "axios";
import {useForm} from 'react-hook-form';
import { Modal,Button } from "react-bootstrap";
import { useNavigate ,useParams,useLocation, Link} from "react-router-dom";
function AdminProjects() {
  let params=useParams()
  //declaring useNavigate
  let navigate=useNavigate()
  //create state with empty array
  let [projects,setProjects]=useState([])
  //create state with empty string
  let [message,setMessage]=useState("")
  //create state 
  let [modifiedProject,setModifiedProject]=useState()
  //destructuring methods from useForm
  let {register,handleSubmit,getValues,setValue}=useForm()
  //get from store
  let {userObj,status,userLoginStatus,errorMessage}=useSelector(state=>state.login)
  //get token session storage
  let token=sessionStorage.getItem("token");
  let [state,setState]=useState("")
  //create state for shoeModal
  let [showModal,setShowModal]=useState()
    
  
//get projects route
const getProjects=async()=>{
    //if user not login
    if(token==null){
        setState("Relogin to continue")
        //navigate login
        navigate('/login')
    }
    //else
    else{
        try{
              //get request to get all projects
              let res=await axios.get(`http://localhost:3030/admin-api/project-dashboard/${userObj.email}`,{
              headers:{Authorization: `Bearer ${token}`}
              })
              console.log(res.data)
              //set projects
              setProjects(res.data.projects)
              //console.group(projects)
        }
        catch(err){
            console.log("err",err)
            
        }
    }
}
//function to setShoemodal to true
const openModal=()=>setShowModal(true)
//function to setShoemodal to true
const closeModal=()=>setShowModal(false)
//update project
const updateProject=(index)=>{
  //open the Modal
    openModal()
    //set values
    setValue('project_name',projects[index].project_name)
    // setValue('project_type',projects[index].project_type)
    setValue('status',projects[index].status)
  
}
//save updated project
const saveProject=async()=>{
    let modifiedProject1=getValues()
    //console.log(modifiedUser1)
    //close Modal
    closeModal()
    //request to update project
    let res=await axios.put(`http://localhost:3030/admin-api/update-project/admin-user/${userObj.email}`,modifiedProject1,{
      headers:{Authorization: `Bearer ${token}`}
    })
    console.log(res.data)
    //set modifiedproject
    setModifiedProject(modifiedProject1)
    //calling getProjects function
    getProjects()
}

//delete project
const deleteProject=async(index)=>{
    //request to delete project
    let res= await axios.delete(`http://localhost:3030/admin-api/delete-project/admin-user/${userObj.email}/project-id/${index}`,{
        headers:{Authorization: `Bearer ${token}`}
    })
    setMessage(res.data.message)
    //if deleted
    if(res.status==201){
      //getAllprojects
      getProjects()
        //navigate(`/admin-projects`)
      
    }
    //else
    else{
      //login to delete
        navigate(`/login`)
    }
}

//getProjectDetails
const getProjectDetails=async(projectId)=>{

      navigate(`/projectDetails-byProjectId/${projectId}`)
 
}
//useEffect
useEffect(()=>{
  // getUserByEmail()
  getProjects()
},[])

return (
    <div className="text-center">
        <h3 className="">Projects</h3>
        <h2 className="text-danger">{message}</h2>
        {/* table */}
        <table className='table table-bordered table-striped table-hover'>
        <thead className="thead-dark">
          <tr className="">
            <th>Project Id</th>
            <th>Project Name</th>
            <th>Status</th>
            <th>Client</th>  
            <th>Start Date</th>
            <th>End Date</th>
            <th>Update Project</th>
            <th>Delete Project</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((item, index) => (
              <tr key={index}>
              <td onClick={()=>getProjectDetails(projects[index].project_id)} >{item.project_id}</td>
              <td>{item.project_name}</td>
              <td>{item.status}</td>
              <td>{item.client}</td>  
              <td>{item.start_date}</td>
              <td>{item.end_date}</td>  
              <td><button className="btn btn-warning" onClick={()=>updateProject(index)}>Update project</button></td>
              <td><button className="btn btn-danger" onClick={()=>deleteProject(projects[index].project_id)} >Delete project</button></td>
            </tr>
          ))}
        </tbody>
    </table>

    {/**Modal */}
    <Modal show={showModal} onHide={closeModal} backdrop="static" className="bg-secondary">
                <Modal.Header closeButton>
                    <Modal.Title>Update Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                      {/* project_name */}
                      <div className="mb-3">
                          <label htmlFor="project_name" className="form-label">Project_Name</label>
                          <input type="text" name="project_name" {...register("project_name")} className="form-control"></input>  
                      </div>
                      
                      {/* status */}
                      <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                        Status
                        </label>
                        <input type="text" {...register("status")} className="form-control"></input>  
                      </div>

                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={saveProject}>Save</Button>
                </Modal.Footer>
            </Modal>

    </div>
  );

}
//export admin projects
export default AdminProjects;