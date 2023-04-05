import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {clearState} from '../../slices/loginSlice';
import './AdminHeader.css'
function AdminHeader() {
  //declareing dispatch method
  let dispatch=useDispatch();
  let {status}=useSelector((state)=>state.login)
  //logout
  const logout=()=>{
    sessionStorage.removeItem("token")
    dispatch(clearState())
  }
  return (
    <div className="navbar d-flex justify-content-evenly">
      <ul className="nav justify-content-center">
         
        
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/admin-projects"
          >
            Project-Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/admin-create-project"
          >
            Create-Project
          </NavLink>
        </li> 
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/project-updates"
          >
            Project-Updates
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/project-concerns"
          >
            Project-Concerns
          </NavLink>
        </li>
        
      </ul>
    </div>
  );
}
//export AdminHeader
export default AdminHeader;