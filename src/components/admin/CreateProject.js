import React ,{ useState }from "react";
import {useForm} from "react-hook-form";
import  axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CreateProject() {
  //get userState from redux store using useSelector hook
  let {userObj}=useSelector(state=>state.login)
  //destructuring methods from useForm
  let {register,handleSubmit,formState:{errors},reset}=useForm()
  //declaring useNavigate
  let navigate=useNavigate()
  //taking state for err
  let [err,setErr]=useState("")
  //get token from session storage
  let token=sessionStorage.getItem("token");
  ////on submit event to create project
  const onSubmit=async(project)=>{
    //console.log(project);
      try{
          //req to create project
          let res=await axios.post(`http://localhost:3030/admin-api/create-project/${userObj.email}`,project,{
            headers:{Authorization: `Bearer ${token}`}
          });
          //console.log(res)
          //reset form
          reset()
          //if project created with status code 201 
          if(res.status==201){
            //set err to empty
              setErr("");
              //navigate projects
              navigate("/admin-projects")

          }
          //if project not created
          else{
            setErr(res.data.errMsg)
            //navigate('/admin-create-project')
            
          }
      }
      catch(err){
          console.log("err caught is ",err)
          //if try block throws any error set it to err
          setErr(err);
      }
   }

  return (
    
    <div className="text-center mx-auto">
        <h2 className="text-center">Create-Project</h2>
        
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 mx-auto">
          <div className='card text-center shadow p-3 m-3'>
    <div className='card-body'>
                 {/* form */}
            {err && <p className="text-danger">{err}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*  project_name*/}
              <div className="mb-3">
                <label htmlFor="project_name" className="form-label">
                project_name
                </label>
                <input type="text" {...register("project_name",{required:true})} className="form-control"></input>
                {errors.project_name?.type=="required" && <p className="text-danger fw-bold">* Project_name is required</p>}
              </div>
              {/*project_type */}
              <div className="mb-3">
                <label htmlFor="project_type" className="form-label">
                project_type
                </label>
                <input
                  type="text"
                  name="project_type"
                  id="project_type"
                  className="form-control"
                  {...register("project_type")}
                  
                ></input>
                {errors.project_type?.type=="required" && <p className="text-danger fw-bold">* Project_type is required</p>}
              </div>

              {/* status */}
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                status
                </label>
                <input type="text" {...register("status")} className="form-control"></input>  
              </div>

              {/* start_date */}
              <div className="mb-3">
                <label htmlFor="start_date" className="form-label">
                start_date
                </label>
                <input type="date" {...register("start_date",{required:true})} className="form-control"></input>
                {errors.start_date?.type=="required" && <p className="text-danger fw-bold">* start_date is required</p>}
              </div>

              {/* end_date */}
              <div className="mb-3">
                <label htmlFor="end_date" className="form-label">
                end_date
                </label>
                <input type="date" {...register("end_date")} className="form-control"></input>
                
              </div>

              {/* team_size */}
              <div className="mb-3">
                <label htmlFor="team_size" className="form-label">
                team_size
                </label>
                <input type="number" {...register("team_size")} className="form-control"></input>

              </div>

              {/* fitness_indicator */}
              <div className="mb-3">
                <label htmlFor="fitness_indicator" className="form-label">
                fitness_indicator
                </label>
                <input type="text" {...register("fitness_indicator")} className="form-control"></input>

              </div>

              {/* GDO */}
              <div className="mb-3">
                <label htmlFor="GDO" className="form-label">
                GDO
                </label>
                <input type="text" {...register("GDO")} className="form-control"></input>

              </div>
                
              {/* HR_Manager */}
              <div className="mb-3">
                <label htmlFor="HR_Manager" className="form-label">
                HR_Manager
                </label>
                <input type="text" {...register("HR_Manager")} className="form-control"></input>

              </div>
              {/* client */}
              <div className="mb-3">
                <label htmlFor="client" className="form-label">
                client
                </label>
                <input type="text" {...register("client")} className="form-control"></input>

              </div>

              {/* domain */}
              <div className="mb-3">
                <label htmlFor="domain" className="form-label">
                domain
                </label>
                <input type="text" {...register("domain")} className="form-control"></input>

              </div>

              {/* Submit button */}
              <button className="btn btn-success me-5" type="submit">
                Create Project
              </button>
            </form>
    </div>
</div>
          </div>
        </div>
        
      </div>

    
  );
}
//export CreateProject
export default CreateProject;

