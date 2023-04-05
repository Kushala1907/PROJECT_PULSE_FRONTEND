import  axios from "axios";
import React ,{ useState ,useEffect}from "react";
import {useForm} from "react-hook-form";
import { useSelector } from "react-redux";

function RaiseResource() {
  //get userState from redux store using useSelector hook
    let {userObj}=useSelector(state=>state.login)
    //destructuring methods from useForm
    let {register,handleSubmit,formState:{errors},reset}=useForm();
    //get token from session storage
    let token=sessionStorage.getItem("token");
    //create state to err with empty string
    let [err,setErr]=useState("")
    //create state to message with empty string
    let [message,setMessage]=useState("")
    //onSubmit event
    const onSubmit=async(resource)=>{
        //console.log(resource);
          try{
              //request to raise resource
              let res=await axios.post(`http://localhost:3030/gdo-api/raise-resource/${userObj.email}`,resource,{
                headers:{Authorization: `Bearer ${token}`}
              });
              console.log(res.data)
              //clear form
              reset()
              //if resource raised successfully with status code 201
              if(res.status==201){
                //set err to empty string
                  setErr("");
                  //set message
                  setMessage(res.data.message)
                 // navigate("/admin-projects")
              }
              //if failed to raise resource
              else{
                //set err
                setErr(res.data.errMsg) 
              }
          }
          catch(err){
              console.log("err caught is ",err)
              setErr(err);
          }
    }

    return (
        
        <div className="text-center">

        <h2 className="text-center">Raise Resource</h2>
        <div></div>
        
        {(message!="")&&<h2 className="text-success">{message}</h2>}
        <div></div>
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 mx-auto">
            {/* form */}
            {err && <p className="text-danger">{err}</p>}
            <div className='card text-center shadow p-3 m-3'>
    <div className='card-body'>
    <form onSubmit={handleSubmit(onSubmit)}>
                {/*  resource_desc */}
              <div className="mb-3">
                <label htmlFor="resource_desc" className="form-label">resource_desc</label>
                <input type="text" {...register("resource_desc",{required:true})} className="form-control"></input>
                {errors.resource_desc?.type=="required" && <p className="text-danger fw-bold">* resource_desc is required</p>}
              </div>
              {/* raised_by */}
              <div className="mb-3">
                <label htmlFor="raised_by" className="form-label">raised_by</label>
                <input type="text" name="raised_by" id="raised_by" className="form-control" {...register("raised_by")}/>
                {errors.update_status?.type=="required" && <p className="text-danger fw-bold">* update_status is required</p>}
              </div>

              {/* raised_for_project */}
              <div className="mb-3">
                <label htmlFor="raised_for_project" className="form-label">
                raised_for_project
                </label>
                <input type="number" {...register("raised_for_project")} className="form-control"></input>
              </div>

              {/* Submit button */}
              <button className="btn btn-success me-5" type="submit">Raise Resource</button>
            </form>  
    </div>
</div>
          </div>
        </div>
            
        </div>
    );
}
//export RaiseResource
export default RaiseResource;

