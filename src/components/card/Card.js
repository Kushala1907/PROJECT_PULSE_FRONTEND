import React from "react";

function Card() {
  return (
    <div className="content">

      <div className="row">
        <div className="col-sm-6">
        <div className='col mx-auto h-100 g-4'>
          {/* Card */}
          <div className='card text-center shadow p-3 m-3'>
              <div className='card-body'>
                  <h2>Services</h2>
                  {/* un-ordered list */}
                  <ul>
                    {/* list items */}
                    <li>Web Development</li>
                    <li>Mobile Development</li>
                    <li>Digital Design</li>
                    <li>Devops</li>
                    <li>Cloud Engineering</li>
                  </ul>
              </div>
          </div>
      </div>
          
        </div>
        <div className="col-sm-6">
        <div className='col mx-auto h-100 g-4'>
          {/* card */}
          <div className='card text-center shadow p-3 m-3'>
              <div className='card-body'>
                  <h2>Technologies</h2>
                  {/* un-ordered list */}
                  <ul>
                    {/* list items */}
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>React.Js</li>
                    <li>java</li>
                    <li>.NET</li>
                  </ul>
              </div>
          </div>
      </div>
          
        </div>
      </div>
    </div>
  );
}
//export card
export default Card;

