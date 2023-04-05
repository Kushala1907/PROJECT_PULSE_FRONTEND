 import { useState } from "react";
 import {useForm} from "react-hook-form";
 import  axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    //destructuring methods from useForm
    let {register,handleSubmit,formState:{errors},reset}=useForm()
    //declaring useNavigate
    let navigate=useNavigate()
    //taking state for err
    let [err,setErr]=useState()
    //on-submit event
    const onSubmit=async(user)=>{
      console.log(user);
        try{
            //clear form
            reset()
            //post request to create new employee
            let res=await axios.post("http://localhost:3030/user-api/register-user",user);
            console.log(res)
            //if registered successfully
            if(res.status==201){
              //set err to empty string
                setErr("");
                //navigate to login component
                navigate("/login")

            }
            //if not registerd
            else{
              //set err message
              setErr(err.message)
                console.log("res ",res)
            }
        }
        catch(err){
            console.log("err caught is ",err)
            setErr(err.message);
        }
     }

    //console.log(user)
    return (
        
      <div className="mx-auto">
        <h2 className="text-center">Registration Form</h2>
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 mx-auto">
            {/* form */}
            {/* {err && <p className="text-danger">{err}</p>} */}
            <div className='card text-center shadow p-3 m-3'>
              {/* card */}
      <div className='card-body'>
      <form onSubmit={handleSubmit(onSubmit)}>
                {/*  Email*/}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  email
                </label>
                <input type="text" {...register("email",{required:true})} className="form-control"></input>
                {errors.email?.type=="required" && <p className="text-danger fw-bold">* Email is required</p>}
              </div>
              {/* Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                employee_name
                </label>
                <input
                  type="text"
                  name="employee_name"
                  id="employee_name"
                  className="form-control"
                  {...register("employee_name",{required:true, minLength:4,maxLength:8})}
                  
                ></input>
                {errors.employee_name?.type=="required" && <p className="text-danger fw-bold">* Username is required</p>}
              </div>
              {/* role */}
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                 role
                </label>
                <input type="text" {...register("role")} className="form-control"></input>
                
              </div>
              {/* password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input type="password" {...register("password",{required:true})} className="form-control"></input>
                {errors.password?.type=="required" && <p className="text-danger fw-bold">* password is required</p>}
              </div>
              {/* Submit button */}
              <button className="btn btn-success me-5" type="submit">
                Register
              </button>
            </form> 
      </div>
</div>
            
          </div>
        </div>
        
      </div>
    );
  }
  //export register
  export default Register;

  