import { useDispatch, useSelector } from "react-redux";
import {userLogin} from '../../slices/loginSlice';
import {useForm} from "react-hook-form";
import { useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import login from '../../../src/login.png';


function Login() {
    //get userState from redux store using useSelector hook
    let {userObj,status,errorMessage}=useSelector(state=>state.login)
    //declaring useNavigate
    let navigate=useNavigate()
    //destructuring methods from useForm
    let {register,handleSubmit,formState:{errors}}=useForm()
    //declare dispatch method
    let dispatch=useDispatch()
    //create state
    const [showModal, setShowModal] = useState(false);
    //onSubmit 
    const onSubmit=async(user)=>{ 
       dispatch(userLogin(user))
    } 
    //useEffect
    useEffect(()=>{
      //if login success
      if(status==="success"){
        
        //if user is super admin
        if(userObj.role=="Super_Admin"){
          //naigate to super admin component
          navigate(`/super-admin`)
        } 
        //if user is project Manager
        if(userObj.role=="Project_Manager"){
          //naigate to project-managre component
          navigate(`/projectManager-dashboard/${userObj.email}`)
        }
        //if user is admin user
        if(userObj.role=="Admin_Users"){
          //naigate to admin-users component
          navigate(`/admin-dashboard/${userObj.email}`)
        }
        //if user is gdo
        if(userObj.role=="GDO"){
          //naigate to gdo component
          navigate(`/gdo-dashboard/${userObj.email}`)
        }
          
      }
      //if login failed 
      else{
        //if login fails naviagte login agian
        navigate('/login')
      }
    },[status])

    //forgotpassword
    const forgotPassword=()=>{
        navigate('/forgot-password')
    }
    return (
        
        <div className="mx-auto">
        
        
        <div className="row">
            <div className="col-sm-3">
                <img src={login} alt="login" width="300px" height="300px"></img>
            </div>
            <div className="col-sm-9">
          <div className="col-12 col-sm-8 col-md-6 mx-auto">
            {/* form */}
            {/*Invalid credentials */}
            <div className='card text-center shadow p-3 m-3'>
      <div className='card-body'>
      <h2 className="text-center mb-4">Login Form</h2>       
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
            
            
            <form onSubmit={handleSubmit(onSubmit)}>
                
              {/* Name */}
              <div className="mb-3 mt-4">
                <label htmlFor="name" className="form-label">
                  email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  {...register("email")}
                  
                ></input>
                {/* {errors.email?.type=="required" && <p className="text-danger fw-bold">* User mail is required</p>} */}
              </div>
              
              {/* password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input type="password" {...register("password")} className="form-control"></input>
                
              </div>
              {/* Submit button */}
              <button className="btn btn-success me-5" type="submit"> Login</button>
              {/* forgot password button */}
              <button className="btn btn-warning me-5" type="submit" onClick={forgotPassword}>Forgot Password</button>

            </form>
           
      </div>
  </div>
          </div>
          </div>
        </div>
        
      </div>
    );
  }
  //export login
  export default Login;

  