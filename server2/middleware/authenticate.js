const jwt = require('jsonwebtoken')
const User = require("../model/userSchema")
console.log("hi")

const Authenticate =async (req, res, next) =>{
   try {
       const token = req.cookies.jwtoken;
       console.log(token)
       const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

       const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token": token});

       console.log(rootUser);
        
       if(!rootUser){
           throw new Error('user not found')
       }

       req.token = token;
       req.rootUser = rootUser;
       req.userID= rootUser._id;

       next();
   
    } catch (err) {
    //    res.status(401).send("Unasuthorised: No token provided ")
    //    console.log(err)
       if(err.name==='jsonWebTokenError'){
        res.status(401).send("Unasuthorised: No token provided ")
        console.log(err)
       }else{
        res.status(401).send("Unasuthorised: token expires ")
        console.log(err)
       }
   }
}

module.exports = Authenticate