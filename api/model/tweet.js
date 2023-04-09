const user = require("./User")
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    content: {
      type: String,
      required: true,
      unique: true
    },
    tweetedby: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: user
    },
    likes: [{
        type: Schema.Types.ObjectId,
       
        ref: user
      }],
    retweetby: [{
      type: String,
      default:"",
      
     
    }],
    image: {
      type: String,
      default:""
      
    },
    replies: [{
        type: String,
        default:""
        
       
      }],
    
  },{timestamps:true});
  

// export default mongoose.model("User", UserSchema)
const Tweets = mongoose.model("Tweets",TweetSchema);
module.exports = Tweets;