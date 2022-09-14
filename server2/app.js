const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser =require("cookie-parser");
// const router = require("../server/router/auth")

app.use(cookieParser());


dotenv.config({ path: "./config.env" });
require("./db/conn");
// const User = require("./model/userSchema")
app.use(express.json());

app.use(require("./router/auth")); // we make router files to make our route easy

const PORT = process.env.PORT || 8000;

//MiddleWare
// const middleware = (req, res, next) => {
//   console.log(`Hello`);
//   next();
// };

// as we are calling router first then router will get read not app
// app.get("/", (req, res) => {
//   res.send("hello");
// });
// app.get("/about", middleware, (req, res) => {
//   res.send("akash");
// });

if ( process.env.NODE_ENV == "production"){

  app.use(express.static("client/build"));

  const path = require("path");

  app.get("*", (req, res) => {

      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

})
}



app.listen(PORT, () => {
  console.log(`helo ${PORT}`);
});
