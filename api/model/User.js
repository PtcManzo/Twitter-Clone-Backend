const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
      },
    password: {
      type: String,
      required: true,
     
    },
    profilepicture: {
      type: String,
      default: "",
      
    },
    location: {
        type: String,
        default: "",
        
       
      },
    dateofbirth: {
        type: Number,
        default: "",
        
       
      },  
    followers: [{
        type: String
       
      }],
    following: [{
        type: String
       
      }], 
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },{timestamps:true});
  

// export default mongoose.model("User", UserSchema)
const User = mongoose.model("User",UserSchema);
module.exports = User;