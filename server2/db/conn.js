const mongoose = require('mongoose')
 
const DB = process.env.DATABASE;

// const DB ="mongodb://localhost:27017/mern?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false" 

mongoose.connect(DB,{
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useUnifiedTopology:true,
    // useFindAndModify:false
}).then(() => {
    console.log("suuccess")
}).catch((err) =>{
    console.log("err")
})

