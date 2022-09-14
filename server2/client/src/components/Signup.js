import React, {useState} from 'react'
import signpic from "../images/b.jpg"
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const Signup = () => {
 const history = useNavigate();

  const [user, setUser] = useState({
    name:"",email:"",phone:"",work:"",password:"",cpassword:"" 
  });
  let name, value;
  const handleInputs = (e) =>{
    console.log(e);
    name= e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});

  }

const PostData = async (e)=>{
   e.preventDefault();

   const{ name, email, phone, work, password, cpassword } = user;

 const res = await  fetch("/register", {
   method:"POST",
   headers:{
     "Content-Type": "application/json"
          },
   body: JSON.stringify({
    name, email, phone, work, password, cpassword 
   })       
 });
    const data = await res.json();
    if(data.status===422 || !data){
      window.alert("Invalid Registartion")
      console.log("Invalid Resgiteration")
    }else{
      window.alert("valid Registartion")
      console.log("valid Resgiteration")

      history("/login")
    }


}


  return (
    <>
    <section className='signup'>
      <div className="container mt-5">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign-up</h2>
            <form method='POST' id='register-form' className="register-form">
              <div className="form-group">
                <label htmlFor='name'>
                  <i className='zmdi zmdi-account materials-icon-name'></i>
                </label>
                <input type="text" name="name" id="name"  onChange={handleInputs}  value={user.name} autocomplete="off" placeholder="Your Name"/>
              </div>

              
              <div className="form-group">
                <label htmlFor='email'>
                  <i className='zmdi zmdi-email materials-icon-name'></i>
                </label>
                <input type="email" name="email" id="email" onChange={handleInputs}  value={user.email} autocomplete="off" placeholder="Your Email"/>
              </div>

              <div className="form-group">
                <label htmlFor='phone'>
                  <i className='zmdi zmdi-phone-in-talk materials-icon-name'></i>
                </label>
                <input type="number" name="phone" id="number"value={user.phone}  onChange={handleInputs} autocomplete="off" placeholder="Your Number"/>
              </div>

              <div className="form-group">
                <label htmlFor='work'>
                  <i className='zmdi zmdi-slideshow materials-icon-name'></i>
                </label>
                <input type="text" name="work" id="work"value={user.work}  onChange={handleInputs} autocomplete="off" placeholder="Your Work"/>
              </div>

              <div className="form-group">
                <label htmlFor='password'>
                  <i className='zmdi zmdi-lock materials-icon-name'></i>
                </label>
                <input type="password" name="password"value={user.password}  onChange={handleInputs} id="password" autocomplete="off" placeholder="Your Password"/>
              </div>

              <div className="form-group">
                <label htmlFor='cpassword'>
                  <i className='zmdi zmdi-lock materials-icon-name'></i>
                </label>
                <input type="password" name="cpassword" value={user.cpassword}  onChange={handleInputs} id="cpassword" autocomplete="off" placeholder="Confirm password"/>
              </div>
             <div className="form-group form-button">
               <input type="submit" name="signup" id="signup" onClick={PostData} value="register" className='form-submit'></input>
             </div>
             
             </form>
             </div>
             <div className="signup-image">
               <figure src={signpic} alt="registeration pic"></figure>
               <NavLink to="/login" className="signup-image-link">I am register </NavLink>
             </div>

          </div>
       
      </div>
    </section>
      
    </>
  )
}

export default Signup
