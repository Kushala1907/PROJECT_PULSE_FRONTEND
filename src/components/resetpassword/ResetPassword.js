import { useState } from "react";
import {useForm} from "react-hook-form";
import  axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import resetPassword from '../../../src/resetPassword.jpg';

function ResetPassword() {
   // let [users,setUser]=useState([])
    let {register,handleSubmit,formState:{errors},reset}=useForm()
   let [err,setErr]=useState()
   let {state}=useLocation()
   let [message,setMessage]=useState("")
  console.log(state)
   const onSubmit=async(user)=>{
     console.log("user ",user);
       try{
         reset()
           let res=await axios.post(`http://localhost:3030/user-api/reset-password/email/${state}`,user);
            // console.log(res)
           if(res.status==200){
                console.log(res)
                setMessage(res.data.message)
           }
           else{
             setErr(res.data.message)
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
       <h2 className="text-center">Reset-Password</h2>
       
       <div className="row">
        <div className="col-sm-4">
        <img src={resetPassword} alt="resetPassword" width="300px" height="300px"></img>
        </div>
        <div className="col-sm-8">
        <div className='card text-center shadow p-3 m-3'>
          <div className='card-body'>
          <h4 className="text-center text-primary">{message}</h4>
            {/* form */}
           {/* {err && <p className="text-danger">{err}</p>} */}
           <form onSubmit={handleSubmit(onSubmit)}>
               
             {/* new password */}
             <div className="mb-3">
               <label htmlFor="password" className="form-label">
                 New Password
               </label>
               <input type="password" {...register("password",{required:true})} className="form-control"></input>
               {errors.password?.type=="required" && <p className="text-danger fw-bold">* Password is required</p>}
             </div>
             {/* otp */}
             <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  OTP
                </label>
                <input type="number" {...register("otp",{required:true})} className="form-control"></input>
                {errors.otp?.type=="required" && <p className="text-danger fw-bold">* password is required</p>}
              </div>
             {/* Submit button */}
             <button className="btn btn-success me-5" type="submit" >
               RESET
             </button>
           </form>
          </div>
      </div>
        </div>
         {/* <div className="col-12 col-sm-8 col-md-6 mx-auto">
           
         </div> */}
       </div>
       
     </div>
   );
 }
 
 export default ResetPassword;
