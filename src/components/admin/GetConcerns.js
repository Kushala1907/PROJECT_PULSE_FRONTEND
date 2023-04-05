import React ,{ useState ,useEffect}from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Concerns() {
  //get userState from redux store using useSelector hook
  let {userObj}=useSelector(state=>state.login)
  //declaring useNavigate
  let navigate=useNavigate()
    //useState
    let [concerns,setConcerns]=useState([])
    //get token from session storage
    let token=sessionStorage.getItem("token");
  //get projects route
const getConcerns=async()=>{
  //if user not loged in 
    if(token==null){
        navigate('/login')
    }
    //if user loged-in
    else{
        try{
            //get req to get all concerns
            let res=await axios.get(`http://localhost:3030/user-api/all-concerns/${userObj.email}`,{
              headers:{Authorization: `Bearer ${token}`}
            })
            //set response from req to concerns
            setConcerns(res.data.payload)
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
        getConcerns()
  },[])
  return (
    
    <div className="text-center">
      <div className="table-responsive">
        <h3 className="">Updates</h3>
        <table className='table table-bordered table-striped'>
        <thead>
          <tr className="text-primary">
            <th>Concern_Id</th>
            <th>Concern_Description</th>
            <th>Concern_severity</th>
            <th>Raised_on</th>
            <th>Raised_From</th>
            <th>Concern_Status</th> 
            <th>Mitigated_Date</th>
            <th>Raised_By</th>
            <th>Raised_forProject</th>
          </tr>
        </thead>
        <tbody>
          {/* iterate concerns to display */}
          {concerns.map((item, index) => (
            <tr key={index}>
              <td>{item.concern_id}</td>
              <td>{item.concern_desc}</td>
              <td>{item.concern_severity}</td>
              <td>{item.raised_on}</td>
              <td>{item.raised_from}</td>
              <td>{item.concern_status}</td> 
              <td>{item.mitigated_date}</td>
              <td>{item.raised_by}</td>
              <td>{item.project_id}</td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
    </div>
  );
}
//export Concerns
export default Concerns;