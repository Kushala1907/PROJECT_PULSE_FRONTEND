import React ,{ useState ,useEffect}from "react";
import { useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { Modal,Button } from "react-bootstrap";
import {useForm} from 'react-hook-form'
import axios from "axios";

function SuperAdmin() {
  //useNavigate
  let navigate=useNavigate()
  //destructuring mthods from useForm
  let {register,handleSubmit,getValues,setValue}=useForm()
  //create users state with empty array
  let [users,setUsers]=useState([])
  //create state to modifiedUser
  let [modifiedUser,setModifiedUser]=useState()
  //get userObj from store
  let {userObj}=useSelector(state=>state.login)
  //get token from session storage
  let token=sessionStorage.getItem("token");
  //cretae state foe showModal
  let [showModal,setShowModal]=useState()
  //function to set ShowModal to true
  const openModal=()=>setShowModal(true)
  //function to set ShowModal to false
  const closeModal=()=>setShowModal(false)

  //getUsers function
  const getusers=async()=>{
    //if user not login
    if(token==null){
        navigate('/login')
    }
    //else
    else{
        //get requset to get all employees
        try{
            let res=await axios.get(`http://localhost:3030/superadmin-api/getAll-employees/${userObj.email}`,{
              headers:{Authorization: `Bearer ${token}`}
            })
            //console.log("user from super admin 2",userObj.email)
            //set users
            setUsers(res.data.employees)
           
        }
        catch(err){
            
            console.log("err",err)
            
        }
    }
  }
  //update role
  const updateRole=(index)=>{
    //open the Modal
    openModal()
    //set values
    setValue('email',users[index].email)
    setValue('role',users[index].role)
    setValue('password',users[index].password)
    
  }
  //save role
  const saveUser=async()=>{
    let modifiedUser1=getValues()
    //close modal
    closeModal()
    //put req to assign/update the role
    let res=await axios.put(`http://localhost:3030/superadmin-api/assign-role/${userObj.email}`,modifiedUser1,{
      headers:{Authorization: `Bearer ${token}`}
    })
    //set modified user
    setModifiedUser(modifiedUser1)
    //calling getusers function
    getusers()
  }

  //useEffect
  useEffect(()=>{
    getusers()
  },[])

  return (
    
    <div className="text-center">
     {/* table */}
    <table className='table table-bordered table-striped'>
            <thead>
              <tr className="text-primary">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={index}>
                  <td>{item.employee_name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>

                  <td><button className="btn btn-warning" onClick={()=>updateRole(index)}>Update-Role</button></td>
                </tr>
              ))}
            </tbody>
        </table>
        {/**Modal */}
        <Modal show={showModal} onHide={closeModal} backdrop="static" className="bg-secondary">
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
        
                    {/*  Email*/}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" {...register("email")} className="form-control"></input>
                    </div>

                    {/* role */}
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <input type="text" name="role" {...register("role")} className="form-control"></input>  
                    </div>
                    {/* pswd */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="text" name="password" {...register("password")} className="form-control"></input>  
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={saveUser}>Save</Button>
                </Modal.Footer>
            </Modal>
            
    </div>
  );
}
//export super-admin
export default SuperAdmin;