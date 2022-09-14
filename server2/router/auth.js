const jwt = require('jsonwebtoken')
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../db/conn");
const User = require("../model/userSchema");
const authenticate = require("../middleware/authenticate")
const cookieParser =require("cookie-parser");

router.use(cookieParser());


//using promises
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   //   console.log(req.body);
//   //   res.json({ message: req.body });

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "PLZ fill all detail" });
//   }

//   User.findOne({ email: email }) //left side of db and right side of !email
//     .then((UserExist) => {
//       if (UserExist) {
//         return res.status(422).json({ error: "already exist" });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "SUccessfully" });
//         })
//         .catch((err) => res.status(500).json({ error: "failed register" }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "PLZ fill all detail" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    //middleware is working here from userschema
    if (userExist) {
      return res.status(422).json({ error: "already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password didnt match" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      // console.log(user);

      const userRegister = await user.save();
      if (userRegister) {
        res.status(201).json({ message: "SUccessfully" });
      } else {
        res.status(500).json({ error: "failed register" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//another way
// router.post("/register", async (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//       return res.status(422).json({ error: "PLZ fill all detail" });
//     }

//    try {
//      const UserExist = await User.findOne({ email: email })

//      if (UserExist) {
//       return res.status(422).json({ error: "already exist" });
//     }

//     const user = new User({ name, email, phone, work, password, cpassword });

//      await user.save();
//       res.status(201).json({ message: "SUccessfully" });
//

//    } catch (err) {
//       console.log(err);
//    }
//   });

//login route
router.post("/signin", async (req, res) => {
  //    console.log(req.body)
  //    res.json({message:"awesome"})

  try {
     let token; 
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

       token =await  userLogin.generateAuthToken();
    //    console.log(token)

    res.cookie("jwtoken", token,{
         expires: new Date(Date.now() + 255456666666555),
         httpOnly:true
    });
    // res.json(token)

      if (!isMatch) {
        res.status(400).json({ message: "invalid password " });
      } else {
        res.json({ message: "user signin success " });
      }
    } else {
      res.status(400).json({ message: "invalid email " });
    }
    //console.log(userLogin);
  } catch (err) {
    console.log(err);
  }
});



//  for about us



router.get('/about',authenticate, (req,res) =>{
  console.log("helo from about")
  res.send(req.rootUser)
})


//get user data for contactus and home
router.get('/getdata',authenticate, (req,res) =>{
  console.log("helo from contact")
  res.send(req.rootUser)
})

//contact us

router.post('/contact',authenticate, async(req,res) => {
   try {
     
    const{name, email, phone, message} = req.body;

    if(!name || !email || !phone || !message){
      console.log("error in contact form")
      return res.json({error: "plzz filled the contact"});
    }

    const userContact =await User.findOne({_id: req.userID})

    if(userContact){
       const userMessage = await userContact.addMessage(name,email,phone,message);
       await userContact.save();

       res.status(201).json({message:"user contact success"})
      }

   } catch (error) {
     console.log(error)
   }
})

//
//logout
//
router.get('/logout', (req,res) =>{
  console.log("helo from logout")
  res.clearCookie('jwtoken', {path:'/'})
  res.status(200).send("user logout")
})

module.exports = router;
