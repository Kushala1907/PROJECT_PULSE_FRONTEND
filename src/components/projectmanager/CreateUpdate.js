import React ,{ useState }from "react";
 import {useForm} from "react-hook-form";
 import  axios from "axios";
import { useSelector} from "react-redux";

function CreateUpdate() {
  //user state from store
  let {userObj}=useSelector(state=>state.login)
  //destructuring methods from useForm
  let {register,handleSubmit,formState:{errors},reset}=useForm()
  //create state for err
  let [err,setErr]=useState("")
  //create state for message
  let [message,setMessage]=useState("")
  //get token from session storage
  let token=sessionStorage.getItem("token");
  ////on submit event to create project
  const onSubmit=async(update)=>{
    console.log(update);
      try{
        //post request to create update
          let res=await axios.post(`http://localhost:3030/projectmanager-api/create-update/${userObj.email}`,update,{
            headers:{Authorization: `Bearer ${token}`}
          });
          console.log(res.data)
          //clear form
          reset()
          //if updtae created with status code 201
          if(res.status==201){
            //set err to empty
              setErr("");
              //set mesage
              setMessage("Update Created")
              //navigate("/admin-projects")

          }
          else{
            setErr(res.data.errMsg)
            //navigate('/admin-create-project')
            
          }
      }
      catch(err){
          console.log("err caught is ",err)
          //set err
          setErr(err);
      }
   }

  return (
    
    <div className="text-center mx-auto">

        
        
        <h2 className="text-center">Create-Update</h2>
        <div></div>
        {/* message */}
        {(message!="")&&<h2 className="text-success">{message}</h2>}
        <div></div>
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 mx-auto">
          <div className='card text-center shadow p-3 m-3'>
    <div className='card-body'>
               {/* form */}
            {err && <p className="text-danger">{err}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*  update_date*/}
              <div className="mb-3">
                <label htmlFor="update_date" className="form-label">
                update_date
                </label>
                <input type="date" {...register("update_date",{required:true})} className="form-control"></input>
                {errors.update_date?.type=="required" && <p className="text-danger fw-bold">* update_date is required</p>}
              </div>
              {/*update_status */}
              <div className="mb-3">
                <label htmlFor="update_status" className="form-label">
                update_status
                </label>
                <input
                  type="text"
                  name="update_status"
                  id="update_status"
                  className="form-control"
                  {...register("update_status")}
                  
                ></input>
                {errors.update_status?.type=="required" && <p className="text-danger fw-bold">* update_status is required</p>}
              </div>

              {/* schedule_status */}
              <div className="mb-3">
                <label htmlFor="schedule_status" className="form-label">
                schedule_status
                </label>
                <input type="text" {...register("schedule_status")} className="form-control"></input>  
              </div>

              {/* resource_status */}
              <div className="mb-3">
                <label htmlFor="resource_status" className="form-label">
                resource_status
                </label>
                <input type="text" {...register("resource_status",{required:true})} className="form-control"></input>
                {errors.resource_status?.type=="required" && <p className="text-danger fw-bold">* start_date is required</p>}
              </div>

              {/* quality_status */}
              <div className="mb-3">
                <label htmlFor="quality_status" className="form-label">
                quality_status
                </label>
                <input type="text" {...register("quality_status")} className="form-control"></input>
                
              </div>

              {/* waiting_for_clientInput */}
              <div className="mb-3">
                <label htmlFor="waiting_for_clientInput" className="form-label">
                waiting_for_clientInput
                </label>
                <input type="text" {...register("waiting_for_clientInput")} className="form-control"></input>

              </div>

              {/* project_id */}
              <div className="mb-3">
                <label htmlFor="fitness_indicator" className="form-label">
                project_id
                </label>
                <input type="number" {...register("project_id")} className="form-control"></input>

              </div>

              {/* updated_by */}
              <div className="mb-3">
                <label htmlFor="updated_by" className="form-label">
                updated_by
                </label>
                <input type="text" {...register("updated_by")} className="form-control"></input>

              </div>
               

              {/* Submit button */}
              <button className="btn btn-success me-5" type="submit">
                Create Update
              </button>
            </form>   
    </div>
</div>
          </div>
        </div>
        
      </div>

    
  );
}
//export CreateUpdate
export default CreateUpdate;

