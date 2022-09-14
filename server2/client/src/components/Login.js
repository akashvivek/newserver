import React , {useState , useContext} from "react";
import loginpic from "../images/b.jpg";
import { NavLink , useNavigate} from "react-router-dom";

import { UserContext } from "../App"


const Login = () => {

   const {state, dispatch} = useContext(UserContext);
  
  
  
  const history = useNavigate();
 
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const loginUser = async(e) =>{
      e.preventDefault();
    const res= await fetch('/signin', {
      method :"POST",
      headers :{
        "Content-Type" :"application/json"
      },
      body:JSON.stringify({
           email,password
      })
    })

    const data = await res.json();
    if(res.status===400 | !data){
      window.alert("invalid credential")
    }else{

      dispatch({type:"USER", payload:true})

      window.alert("login success")
      history("/");
    }
    
  }
  return (
    <>
      <section className="sign-in">
        <div className="container mt-5">
          <div className="signin-content">
            <div className="signin-image">
              <figure src={loginpic} alt="loginpic pic"></figure>
              <NavLink to="/signup" className="signup-image-link">
                not register yet
              </NavLink>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign-in</h2>
              <form  method="POST" id="register-form" className="register-form">
                


                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email materials-icon-name"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="off"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock materials-icon-name"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="off"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    value="Log in"
                    onClick={loginUser}
                    className="form-submit"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
