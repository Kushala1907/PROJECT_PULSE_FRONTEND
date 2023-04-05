import React ,{ useState ,useEffect}from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProjectUpdates() {
  //get userState from redux store using useSelector hook
  let {userObj}=useSelector(state=>state.login)
  //declaring useNavigate
  let navigate=useNavigate()
    //useState
    let [updates,setUpdates]=useState([])
    //get token from session storage
    let token=sessionStorage.getItem("token");
  //get projects route
const getUpdates=async()=>{
    //if user not loged in 
    if(token==null){
        navigate('/login')
    }
    //if user loged-in
    else{
        try{
            //get req to get all updates
            let res=await axios.get(`http://localhost:3030/user-api/all-updates/${userObj.email}`,{
              headers:{Authorization: `Bearer ${token}`}
            })
            //set response from req to updates
            setUpdates(res.data.payload)
            // getUpdates()
        }
        catch(err){
            console.log("err",err)
            
        }
    }
}

  //useEffect
  useEffect(()=>{
        //calling getUpdates function
        getUpdates()
  },[])
  return (
    
    <div className="text-center">
        <h3 className="">Updates</h3>
        {/* table */}
        <table className='table table-bordered'>
        <thead>
          <tr className="text-primary">
            <th>Update_ID</th>
            <th>Update_Date</th>
            <th>Update_Status</th>
            <th>Schedule_Status</th>
            <th>Resource_Status</th>
            <th>Quality_Status</th> 
            <th>Updated_By</th>
            <th>Project_Id</th>
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
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  );
}
//export ProjectUpdates
export default ProjectUpdates;