
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const Contact = () => {

  const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});
  
 const userContact = async () =>{
   try {
     const res =await fetch('/contact',{
       method: "GET",
       headers:{
           Accept:"application/json",
           "Content-Type":"application/json"
       },
       credentials:"include" 
     });

     const data = await res.json();
     console.log(data)
     setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

     if(!res.status ===200){
       const error =  new Error(res.error)
       throw error;
     }

   } catch (err) {
     console.log(err)
     
   }
 }  

  useEffect(() =>{
      userContact();
  }, []);



  //storing data in states

  const handleinputs = (e) => {
    const name=e.target.name;
    const value = e.target.value;

    setUserData({...userData, [name]:value,})
  }

  //send data to backend
const contactForm = async(e) =>{
  e.preventDefault();

  const {name, email, phone, message} = userData;
  
const res = await  fetch('/contact',{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body: JSON.stringify({name, email, phone, message})

})

const data = await res.json();
if(!data){
  console.log("message not")
}else{
  alert("succefully sned");
  setUserData({...userData, message:""}) //only message dat will get deleted
}

}


  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 display-flex justifycontent-between">
              {/* phone no */}
              <div className="contact_info_item-d-flex justify-content-start align-items-center">
                <img src="" alt="phone" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">+91 8210933895</div>
                </div>
              </div>

              {/* Email */}
              <div className="contact_info_item-d-flex justify-content-start align-items-center">
                <img src="" alt="phone" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Email</div>
                  <div className="contact_info_text">akash@gmail.com</div>
                </div>
              </div>

              {/*Address */}
              <div className="contact_info_item-d-flex justify-content-start align-items-center">
                <img src="" alt="phone" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Address</div>
                  <div className="contact_info_text">Bhopal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contactus form */}
      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">Get in Touch</div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_name d-flex justify-content-between align-items-between ">
                    <input
                      type="text"
                      id="contact_form_name"
                      className="contact_form_name input_field"
                      placeholder="Your NAme"
                      required="true"
                      name="name"
                      value={userData.name}
                      onChange={handleinputs}
                    />
                    <input
                      type="email"
                      id="contact_form_email"
                      className="contact_form_email input_field"
                      placeholder="Your email"
                      required="true"
                      autoComplete="off"
                      name="email"
                      value={userData.email}
                      onChange={handleinputs}
                    />
                    <input
                      type="number"
                      id="contact_form_phone"
                      className="contact_form_phone input_field"
                      placeholder="Your no."
                      required="true"
                      name="phone"
                      value={userData.phone}
                      onChange={handleinputs}
                    />
                  </div>

                  <div className="contact_form_text mt-5">
                    <textarea value={userData.message} name="message" onChange={handleinputs} className="text_field contact_form_message" placeholder="Massage" cols="140" rows="5"/>
                  </div>
                  <div className="contact_form_button">
                    <button type="submit" onClick={contactForm} className="button contact_form_button">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
