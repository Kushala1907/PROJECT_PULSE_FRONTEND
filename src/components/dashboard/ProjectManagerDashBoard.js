import React ,{ useState ,useEffect}from "react";
import { useSelector } from "react-redux";
import {useForm} from 'react-hook-form';
import { Modal,Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate} from "react-router-dom";

function ProjectManagerDashBoard() {
  //get userState from redux store using useSelector hook
  let {userObj}=useSelector(state=>state.login)
  //create state to updates with empty array
  let [updates,setUpdates]=useState([])
  //create state to message with empty string
  let [message,setMessage]=useState("")
  //get token from session storage
  let token=sessionStorage.getItem("token");
  //destructuring methods from useForm
  let {register,getValues,setValue}=useForm()
  //declare navigate
  let navigate=useNavigate()
  //create state to showModel
  let [showModal,setShowModal]=useState()
  //function to open Modal
  const openModal=()=>setShowModal(true)
  //function to closeModel
  const closeModal=()=>setShowModal(false)

  //update project-update
  const updateProjectUpdate=(index)=>{
      //open the odal
      openModal()
      //set values to fields
      setValue('project_id',updates[index].project_id)
      setValue('update_id',updates[index].update_id)
      setValue('update_status',updates[index].update_status)
      setValue('schedule_status',updates[index].schedule_status)
      setValue('resource_status',updates[index].resource_status)
      setValue('quality_status',updates[index].quality_status)
      setValue('waiting_for_clientInput',updates[index].waiting_for_clientInput)
      
  }
  //save updated project-update
  const saveUpdate=async()=>{
      //get modified values using getValues method
      let modifiedUpdate1=getValues()
      //close modal
      closeModal()
      //req to update the project-updates
      let res=await axios.put(`http://localhost:3030/projectmanager-api/update-updates/project-manager/${userObj.email}/project-id/${modifiedUpdate1.project_id}`,modifiedUpdate1,{
        headers:{Authorization: `Bearer ${token}`}
      })
      //if updated set response message from res to message
      setMessage(res.data.message)
      //load all updates afetr updation
      getAllUpdates()
  }
    
  //get all updates
  const getAllUpdates=async()=>{
          //if user not loged-in
          if(token==null){
              //go to login
              navigate('/login')
          }
          //if user loged-in
          else{
              try{
                    //req to get all project updates
                    let res=await axios.get(`http://localhost:3030/user-api/all-updates/${userObj.email}`,{
                          headers:{Authorization: `Bearer ${token}`}
                    })
                    console.log(res.data)
                    //set res.data.payload to upadtes
                    setUpdates(res.data.payload)
                    
              }
              //if err occurs print it to console
              catch(err){
                  console.log("err",err)
                  
              }
          }
  }

  //delete project-upadte
  const deleteProjectUpdate=async(update_id)=>{
          //req to delete project-update
          let res= await axios.delete(`http://localhost:3030/projectmanager-api/detete-project-update/project-manager/${userObj.email}/update-id/${update_id}`,{
              headers:{Authorization: `Bearer ${token}`}
          })
          //after deletion set response message to message
          setMessage(res.data.message)
          //if deleted successfully with status code 201
          if(res.status==201){
            //load all updates
            getAllUpdates()
              navigate(`/projectManager-dashboard/${userObj.email}`)
          
          }
          //if not deleted login to get delete-access
          else{

              navigate(`/login`)
          }
  }

  //use-effect hook
  useEffect(()=>{
    //calling getAllUpdates function
    getAllUpdates()
  },[])

  return (
    
    <div className="text-center">

        <h3>Welcome to Project Manager</h3>
        <div></div>
        {/* message from response */}
        {(message=="")&&(<h3 className="text-warning">{message}</h3>)}
        <h3 className="text-success">{message}</h3>
        <div></div>
        {/* button to create update */}
        <button className="btn btn-warning mb-3 mt-2" onClick={()=>navigate(`/create-update`)}>Create Update</button>
        {/* button to raise concern */}
        <button className="btn btn-warning mb-3 mt-2 ms-2" onClick={()=>navigate(`/raise-concern/${userObj.email}`)}>Raise Concern</button>
        
        
        <div></div>
        <div></div>
        {/* table */}
        <table className='table table-bordered'>
        <thead>
          <tr className="text-primary">
            <th>Update Id</th>
            <th>Update_date</th>
            <th>update_status</th>
            <th>schedule_status</th> 
            <th>resource_status</th>
            <th>quality_status</th> 
            <th>updated_by</th>
            <th>project_id</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* iterate updates to display */}
          {updates.map((item, index) => (
            <tr key={index}>
              
              <td>{item.update_id}</td>
              
              
              <td>{item.update_date}</td>
              <td>{item.update_status}</td>
              
              <td>{item.schedule_status}</td>
              <td>{item.resource_status}</td>
              <td>{item.quality_status}</td>
              
              <td>{item.updated_by}</td>
              <td>{item.project_id}</td>
              <td><button className="btn btn-warning" onClick={()=>updateProjectUpdate(index)}>Update project</button></td>
              <td><button className="btn btn-danger" onClick={()=>deleteProjectUpdate(updates[index].update_id)}>Delete project</button></td>
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
            {/* project_id */}
            <div className="mb-3">
                <label htmlFor="fitness_indicator" className="form-label">
                project_id
                </label>
                <input type="number" {...register("project_id")} className="form-control"></input>

              </div>
            {/*update_status */}
            <div className="mb-3">
                <label htmlFor="update_status" className="form-label">update_status</label>
                <input type="text" name="update_status" id="update_status" className="form-control" {...register("update_status")}/>
            </div> 

            {/* schedule_status */}
            <div className="mb-3">
                <label htmlFor="schedule_status" className="form-label">schedule_status</label>
                <input type="text" {...register("schedule_status")} className="form-control"></input>  
            </div>

            {/* resource_status */}
            <div className="mb-3">
                <label htmlFor="resource_status" className="form-label">resource_status</label>
                <input type="text" {...register("resource_status")} className="form-control"></input>
            </div>

            {/* quality_status */}
            <div className="mb-3">
                <label htmlFor="quality_status" className="form-label">quality_status</label>
                <input type="text" {...register("quality_status")} className="form-control"></input>
                
            </div>

            {/* waiting_for_clientInput */}
            <div className="mb-3">
                <label htmlFor="waiting_for_clientInput" className="form-label">waiting_for_clientInput</label>
                <input type="text" {...register("waiting_for_clientInput")} className="form-control"></input>
            </div>
                
        </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" onClick={saveUpdate}>Save</Button>
        </Modal.Footer>
    </Modal>
        
        
    </div>
  );
}
//export ProjectManagerDashBoard
export default ProjectManagerDashBoard;