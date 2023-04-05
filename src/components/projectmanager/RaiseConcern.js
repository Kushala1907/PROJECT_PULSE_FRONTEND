import  axios from "axios";
import React ,{ useState }from "react";
import {useForm} from "react-hook-form";
import { useSelector } from "react-redux";

function RaiseConcern() {
    //importing userObj from reduxStore
    let {userObj}=useSelector(state=>state.login)
    //destructuring methods from useForm
    let {register,handleSubmit,formState:{errors},reset}=useForm();
    //get token from session storage
    let token=sessionStorage.getItem("token");
    //useState for err,message
    let [err,setErr]=useState("")
    //create state for message
    let [message,setMessage]=useState("")
    //onSubmit
    const onSubmit=async(concern)=>{
        console.log(concern);
          try{
             //raise concern 
              let res=await axios.post(`http://localhost:3030/user-api/raise-concern-trigger-mail/${userObj.email}`,concern,{
                headers:{Authorization: `Bearer ${token}`}
              });
              console.log(res.data)
              //clear form
              reset()
              //if concern raised successfully with status code 201
              if(res.status==201){
                  setErr("");
                  setMessage(res.data.message)
              }
              //if rainsing concern failed
              else{
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

        <h2 className="text-center">Raise Concern</h2>
        <div></div>
        
        {(message!="")&&<h2 className="text-success">{message}</h2>}
        <div></div>
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 mx-auto">
          <div className='card text-center shadow p-3 m-3'>
      <div className='card-body'>
                  {/* form */}
            {err && <p className="text-danger">{err}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*  concern_desc */}
              <div className="mb-3">
                <label htmlFor="concern_desc" className="form-label">
                concern_desc
                </label>
                <input type="text" {...register("concern_desc",{required:true})} className="form-control"></input>
                {errors.concern_desc?.type=="required" && <p className="text-danger fw-bold">* rconcern_desc is required</p>}
              </div>
              {/* concern_severity */}
              <div className="mb-3">
                <label htmlFor="concern_severity" className="form-label">
                concern_severity
                </label>
                <input
                  type="text"
                  name="concern_severity"
                  id="concern_severity"
                  className="form-control"
                  {...register("concern_severity")}
                  
                ></input>
                {errors.concern_severity?.type=="required" && <p className="text-danger fw-bold">* concern_severity is required</p>}
              </div>

              {/* raised_on */}
              <div className="mb-3">
                <label htmlFor="raised_on" className="form-label">
                raised_on
                </label>
                <input type="date" {...register("raised_on")} className="form-control"></input>

              </div>

              {/* raised_from */}
              <div className="mb-3">
                <label htmlFor="raised_from" className="form-label">
                raised_from
                </label>
                <input type="text" {...register("raised_from")} className="form-control"></input>

              </div>

              {/* concern_status */}
              <div className="mb-3">
                <label htmlFor="concern_status" className="form-label">
                concern_status 
                </label>
                <input type="text" {...register("concern_status ")} className="form-control"></input>
            </div>

              {/* mitigated_date */}
              <div className="mb-3">
                <label htmlFor="mitigated_date" className="form-label">
                mitigated_date
                </label>
                <input type="date" {...register("mitigated_date")} className="form-control"></input>
            </div>

            {/* raised_by */}
            <div className="mb-3">
                <label htmlFor="raised_by" className="form-label">
                raised_by
                </label>
                <input type="text" {...register("raised_by")} className="form-control"></input>
            </div>

            {/* project_id */}
            <div className="mb-3">
                <label htmlFor="project_id" className="form-label">
                project_id
                </label>
                <input type="number" {...register("project_id")} className="form-control"></input>
            </div>


            {/* Submit button */}
              <button className="btn btn-success me-5" type="submit">
                Raise Concern
              </button>
            </form>
       </div>
</div>
          </div>
        </div>
            
        </div>
    );
}
//export Raiseconcern
export default RaiseConcern;

