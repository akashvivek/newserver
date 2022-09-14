import React from 'react'
import { NavLink } from 'react-router-dom'

const Errorpage = () => {
  return (
    <>
       <div id="notfound">
           <div className="notfound">
               <div className="notfound-404">
                   <h1>404</h1>
                   
               </div>
               <p>THis page is not available</p>
               <NavLink to='/'>Back to home page</NavLink>
           </div>
       </div>
    </>
  )
}

export default Errorpage