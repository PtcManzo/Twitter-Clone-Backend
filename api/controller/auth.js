const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
 const register = async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const newUser = new User({
       firstname: req.body.firstname,
       email: req.body.email,
       username: req.body.username,
       password: hash
      })
      console.log(newUser);
      await newUser.save();
      res.status(200).send("User has been created.");
    } catch (err) {
        console.log(err);
       res.status(500).json(err);
    }
  };
  const login = async(req,res,next)=>{
    try{
      const user = await User.findOne({username:req.body.username});

      if(!user) res.send("user not found")

      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password) ; 

      if(!isPasswordCorrect) res.send("wrong username and password")
        
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")

      const{password,isAdmin,...otherDetails} = user._doc  //._doc is to display the only require doc not all the unecessary stuff in postman
      res.cookie("access_token",token,{
        httpOnly: true // to make it more secure
      }).status(200).send(otherDetails);// hiding password and isAdmin and displaying other details
    }catch(err){
        next(err);
    }
}

  module.exports ={register,login}
