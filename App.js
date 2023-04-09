const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const userdata = require("./api/route/Users");
const auth = require("./api/route/Auth");

const tweet = require("./api/route/Twitterpage")
const cookieParser = require("cookie-parser");



// connect to database

const connect = async ()=>{
    try{
        await mongoose.connect('mongodb+srv://manso:manso123@cluster0.7kzcmpj.mongodb.net/twitter?retryWrites=true&w=majority');
        console.log("connect to database");
    }catch(error){
        throw error;
    }
}


mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected!")
});



app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(cookieParser());
app.use(express.json());

//middleware

app.use("/api/auth",auth);
app.use("/api/user",userdata);
app.use("/api/tweet",tweet);





app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });




//connection

app.listen(9090,()=>{
    connect();
    console.log("working");
})