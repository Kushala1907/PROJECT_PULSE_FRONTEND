import { useState } from "react";
import {useForm} from "react-hook-form";
import  axios from "axios";
import { useNavigate } from "react-router-dom";
import forgotPassword from '../../../src/Forgot_password.png';

function ForgotPassword() {
  //destructuring methods from useForm
  let {register,handleSubmit,formState:{errors},reset}=useForm()
  //declaring useNavigate
  let navigate=useNavigate()
  //create state to err
  let [err,setErr]=useState()

  //onSubmit event
  const onSubmit=async(user)=>{
        console.log(user)
       try{
        //clear form after submit
         reset()
         //post req send message to email
           let res=await axios.post("http://localhost:3030/user-api/forgot-password",user);
          //console.log(res)
           if(res.status==200){
                console.log("sent")
                navigate('/reset-password',{state:user.email})
           }
           else{
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
       <h2 className="text-center mb-4">Forgot-Password</h2>
       <div className="row">
        <div className="col-sm-4">
            <img src={forgotPassword} alt="forgotPassword" width="300px" height="300px"></img>
        </div>
      <div className="col-sm-8">
       {/* <div className="row">
         <div className="col-12 col-sm-8 col-md-6 mx-auto"> */}
            <div className='card text-center shadow p-3 m-3'>
     <div className='card-body pt-4'>
            {/* form */}
           {err && <p className="text-danger">{err}</p>}
           <form onSubmit={handleSubmit(onSubmit)} >
               {/*  Email*/}
             <div className="mb-3">
               <label htmlFor="email" className="form-label">
                 email
               </label>
               <input type="text" {...register("email",{required:true})} className="form-control"></input>
               {errors.email?.type=="required" && <p className="text-danger fw-bold">* Email is required</p>}
             </div>
             {/* Submit button */}
             <button className="btn btn-success me-5" type="submit">
               Send OTP
             </button>
           </form>
      </div>         
      </div>
</div>
      </div>
         {/* </div>
       </div> */}
       
     </div>
   );
 }
 //export ForgotPassword
 export default ForgotPassword;

 