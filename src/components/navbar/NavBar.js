import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {clearState} from '../../slices/loginSlice';
import userImg from '../../../src/user.jpg';

import './NavBar.css'
function NavBar() {
  //declare useDispatch method
  let dispatch=useDispatch();
  //destrcture from store
  let {userObj,status}=useSelector((state)=>state.login)
 
  //logout
  const logout=()=>{
    sessionStorage.removeItem("token")
    dispatch(clearState())
  }
  return (
    <div className="navbar d-flex ">
      <ul className="nav ms-5">
         <li className="nav-item ">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="register"
          >
            Register
          </NavLink>
        </li> 
        {(status=="success")?(<li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="login" onClick={logout}
          >
            Logout
          </NavLink>
        </li>):
        (<li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="login"
          >
            Login
          </NavLink>
        </li>)
        }
      </ul>
      {(status=="success")&&(<p className="ps-5 ms-5"> {userObj.email} <img src={userImg} width="50px" height="50px" className="rounded-circle align-items-lg-end ms-4"/></p>)}
    </div>
  );
}
//export NavBar
export default NavBar;