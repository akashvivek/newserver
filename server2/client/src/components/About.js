import {useNavigate} from "react-router-dom"
import React, { useEffect, useState } from "react";
import logo from "../images/logo.jpg";

const About = () => {

  const history = useNavigate();
  const [userData, setUserData] = useState({});

 const callAboutPage = async () =>{
   try {
     const res =await fetch('/about',{
       method: "GET",
       headers:{
           Accept:"application/json",
           "Content-Type":"application/json"
       },
       credentials:"include" //if not then data will not get store in backend
     });

     const data = await res.json();
     console.log(data)
     setUserData(data);

     if(!res.status ===200){
       const error =  new Error(res.error)
       throw error;
     }

   } catch (err) {
     console.log(err)
     history('/login')
   }
 }  

  useEffect(() =>{
      callAboutPage();
  }, [ ]);

  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img src={logo} style={{ height: "60px" }} alt="profile" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb-5">
                  Ranking: <span> 8/10</span>
                </p>

                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      role="tab"
                      data-toggle="tab"
                      href="#home"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      id="profile-tab"
                      role="tab"
                      data-toggle="tab"
                      href="#profile"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit profile"
              />
            </div>
          </div>

          <div className="row">
            {/* LEFT SIDE */}
            <div className="col-md-4">
              <div className="profile-work">
                <p>Work Link</p>
                <a href="" target="_akash">
                  {" "}
                  youtube
                </a>
                <br />
                <a href="" target="_akash">
                  {" "}
                  Insta
                </a>
                <br />
                <a href="" target="_akash">
                  {" "}
                  Twitter
                </a>
                <br />
                <a href="" target="_akash">
                  Linkdn
                </a>
                <br />
                <a href="" target="_akash">
                  {" "}
                  Github
                </a>
                <br />
                <a href="" target="_akash">
                  {" "}
                  facebook
                </a>
                <br />
              </div>
            </div>

            {/* right side ata tggle*/}
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>user ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>6465</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <label>kash</label>
                    </div>
                  </div>



                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>@something.com</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>987+1768</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>Learner</p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade "
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  


                  <div className="row">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>Nothing</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Total prjects</label>
                    </div>
                    <div className="col-md-6">
                      <p>4</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>English</label>
                    </div>
                    <div className="col-md-6">
                      <p>Avergae</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>None</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
