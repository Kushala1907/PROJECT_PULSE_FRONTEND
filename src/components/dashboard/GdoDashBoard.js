import React from "react";
import { useSelector } from "react-redux";
import GdoHeader from "../header/GdoHeader";

function GdoDashBoard() {
  //get userState from redux store using useSelector hook
  let {userObj}=useSelector(state=>state.login)
  
  return (
    
    <div className="text-center">

        <div>
            <h2>Welcome To GDO : {userObj.email}</h2>
        </div>
        {/* adding header to gdoDashBoard */}
        <div>
            <GdoHeader/>
        </div>

    </div>
  );
}
//export GdoDashBoard
export default GdoDashBoard;