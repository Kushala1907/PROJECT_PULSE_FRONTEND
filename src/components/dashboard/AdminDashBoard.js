import React from "react";
import { useSelector } from "react-redux";
import AdminHeader from "../header/AdminHeader";

function AdminDashBoard() {
  //get userState from redux store using useSelector hook
  let {userObj}=useSelector(state=>state.login)
  
  return (
    <div className="text-center">
        <div>
          <h2>Welcome To Admin : {userObj.email}</h2>
        </div>
        {/* adding header to admindashboard */}
        <div>
          <AdminHeader/>
        </div>
    </div>
  );
}
//export AdminDashBoard
export default AdminDashBoard;