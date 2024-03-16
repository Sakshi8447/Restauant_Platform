import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";



function App() {

  return (
    <>
    <div className="container">
           <div className="image">
          
      </div>
      <div className="info">
        <div className="title">
          <h2>Restaurant Plateform</h2>
          <p>"Transforming the dining experience, one click at a time. </p>
          <p>Welcome to the Restaurant, where convenience meets culinary delight. </p>
          <p>From seamless online ordering to effortless reservations,</p>
          <p>we've got your cravings covered. </p>
          <p>Join us and elevate your dining journey today!"</p>
       </div>

             <div className="address">
             <input type="text" className="input-box" placeholder="Enter your City" required></input>
             <input type="text" className="input-box" placeholder="Enter your state" required></input>
             <input type="text" className="input-box" placeholder="Enter your country" required></input>
             <input type="text" className="input-box" placeholder="Enter your contact" required></input>
             </div>
            
             <div className="next-section">
                   <div className="icons">
                          <FaStar />
                          <FaStar className="rating"/>
                          <FaStar className="rating"/>
                          <FaStar className="rating"/>
                          <FaStarHalfAlt className="rating"/>
                    </div>

                    <div className="input-name">
                      <h2>SERVES-TYPE</h2>
                    <select className="serves-type">
                        <option>VEG</option>
                        <option>NON-VEG</option>
                        <option>Both</option>
                        
                   </select>
                    </div>




              </div>

        </div>
      </div>
    
    </>
  )
}

export default App