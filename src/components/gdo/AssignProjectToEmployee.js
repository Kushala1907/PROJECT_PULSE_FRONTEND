import {useForm} from "react-hook-form";
import React, { useState }from "react";
import { useSelector} from "react-redux";
import  axios from "axios";
import { useNavigate } from "react-router-dom";

function AssignProjectToEmployee() {
  //get userState from redux store using useSelector hook
  let {userObj}=useSelector(state=>state.login)
  //destructuring methods from useForm
  let {register,handleSubmit,formState:{errors},reset}=useForm()
  //create state to err with empty string
  let [err,setErr]=useState("")
  //create state to message with empty string
  let [message,setMessage]=useState("")
  //declare useNavigate
  let navigate=useNavigate()
  //get token from session storage
  let token=sessionStorage.getItem("token");
  //onSubmit event
  const onSubmit=async(user)=>{
    
      try{
         //post req to assign project to employee
          let res=await axios.post(`http://localhost:3030/user-api/assign-project/${userObj.email}`,user,{
            headers:{Authorization: `Bearer ${token}`}
          });
        
          //clear form
          reset()
          //if project assigned
          if(res.status==201){
            //set error to empty string
              setErr("");
              //set message
              setMessage(res.data.message)
              //navigate to gdo dashboard
              navigate(`/gdo-dashboard/${userObj.email}`)

          }
          else{
            //set err
            setErr(res.data.errMsg)
            //navigate('/admin-create-project')
            
          }
      }
      catch(err){
          console.log("err caught is ",err)
          //ser=t err
          setErr(err);
      }
   }
  return (
    
    <div className="text-center">

        {(message!="")&&(<h2 className="text-success">{message}</h2>)}
        <div></div>
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 mx-auto">
            {/* form */}
            {/* {err && <p className="text-danger">{err}</p>} */}
            <div className='card text-center shadow p-3 m-3'>
   <div className='card-body'>
   <form onSubmit={handleSubmit(onSubmit)}>
                {/*  email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                email
                </label>
                <input type="text" {...register("email",{required:true})} className="form-control"></input>
                {errors.email?.type=="required" && <p className="text-danger fw-bold">* email is required</p>}
              </div>

              {/*allocation_type */}
              <div className="mb-3">
                <label htmlFor="allocation_type" className="form-label">
                allocation_type
                </label>
                <input
                  type="text"
                  name="allocation_type"
                  id="allocation_type"
                  className="form-control"
                  {...register("allocation_type")}
                  
                ></input>
                {errors.allocation_type?.type=="required" && <p className="text-danger fw-bold">* allocation_type is required</p>}
              </div>

              {/* role_in_project */}
              <div className="mb-3">
                <label htmlFor="role_in_project" className="form-label">
                role_in_project
                </label>
                <input type="text" {...register("role_in_project")} className="form-control"></input>  
              </div>

              {/* start_date */}
              <div className="mb-3">
                <label htmlFor="start_date" className="form-label">
                start_date
                </label>
                <input type="date" {...register("start_date",{required:true})} className="form-control"></input>
                {errors.start_date?.type=="required" && <p className="text-danger fw-bold">* start_date is required</p>}
              </div>

              {/* status */}
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                status
                </label>
                <input type="text" {...register("status")} className="form-control"></input>
                
              </div>

              {/* exposedToClient */}
              <div className="mb-3">
                <label htmlFor="exposedToClient" className="form-label">
                exposedToClient
                </label>
                <input type="number" {...register("exposedToClient")} className="form-control"></input>

              </div>

              {/* resource_name */}
              <div className="mb-3">
                <label htmlFor="resource_name" className="form-label">
                resource_name
                </label>
                <input type="resource_name" {...register("resource_name")} className="form-control"></input>

              </div>

              {/* end_date */}
              <div className="mb-3">
                <label htmlFor="end_date" className="form-label">
                end_date
                </label>
                <input type="date" {...register("end_date")} className="form-control"></input>

              </div>
              {/* billing_status */}
              <div className="mb-3">
                <label htmlFor="billing_status" className="form-label">
                billing_status
                </label>
                <input type="text" {...register("billing_status")} className="form-control"></input>

              </div>

            {/* project_id */}
            <div className="mb-3">
                <label htmlFor="project_id" className="form-label">
                project_id
                </label>
                <input type="number" {...register("project_id")} className="form-control"></input>

            </div>

              {/* team_id */}
              <div className="mb-3">
                <label htmlFor="team_id" className="form-label">
                team_id
                </label>
                <input type="number" {...register("team_id")} className="form-control"></input>

              </div>
              {/* Submit button */}
              <button className="btn btn-success me-5" type="submit">
                Assign Project
              </button>
            </form>
  </div>
</div>
          </div>
        </div>
        
        
    </div>
  );
}
//export AssignProjectToEmployee
export default AssignProjectToEmployee;

