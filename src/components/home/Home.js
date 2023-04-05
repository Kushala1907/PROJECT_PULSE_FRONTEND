import React from "react";
import Card from "../card/Card";
import Header from "../header/Header";
function Home() {
  
  return (
    <div className="text-center">
      {/* nesting Header component */}
        <div>
            <Header/>
        </div>
      {/* nesting Card component */}
      <div className="lead">
        <Card />
      </div>
    </div>
  );
}
//export Home
export default Home;