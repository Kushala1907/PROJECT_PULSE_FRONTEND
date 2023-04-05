import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {clearState} from '../../slices/loginSlice';
import './AdminHeader.css'
function GdoHeader() {
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
            to="/gdo-projects"
          >
            GDO-Project-Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/assignProjectToEmployee"
          >
            Assign Project To Employee
          </NavLink>
        </li> 
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/assignProjectToEmployee"
          >
            Create-Team
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/raise-resource"
          >
            Raise-Resource
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
//export GdoHeader
export default GdoHeader;