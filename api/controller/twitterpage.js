const user = require("../model/User")
const Tweets = require("../model/tweet")
const jwt = require("jsonwebtoken")
const {verifyToken}= require("../utils/Verifytoken")


//create tweet
const createTweet = async(req,res,next)=>{

  const token = req.cookies.access_token;
  if (!token) {
    res.status("u are not authenticate")
  }
  jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", (err, user) => {
      if (err) res.status("token not valid")
      req.user = user;
      console.log(req.user.id)
  
    })

    try{
      
        const content = new Tweets(
            
        {
            content: req.body.content,
            tweetedby: req.user.id
        });
        console.log(content);
        await content.save();
        res.status(200).json(content)

    }catch(err){
        next(err)
    }

}

// like tweet
const likeTweet = async(req,res,next)=>{
  const token = req.cookies.access_token;
  if (!token) {
    res.status("u are not authenticate")
  }
  jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", (err, user) => {
      if (err) res.status("token not valid")
      req.user = user;
      console.log(req.user.id)
  
    })
    const likeuser = await Tweets.findById(req.params.id);
    if (req.user.id !== likeuser.tweetedby) {
        try {
    
          
          if (!likeuser.likes.includes(req.user.id)) {
            await Tweets.updateOne({ $push: { likes: req.user.id } });
            
            res.status(200).json("user have been like");
          } else {
            res.status(403).json("you allready like this user");
          }
        } catch (err) {
          next(err)
        }
      } else {
        res.status(403).json("you cant like your own tweet");
      }

}

const dislikeTweet = async (req,res,next)=>{
 
  const token = req.cookies.access_token;
  if (!token) {
    res.status("u are not authenticate")
  }
  jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", (err, user) => {
      if (err) res.status("token not valid")
      req.user = user;
      console.log(req.user.id)
  
    })
    const dislikeuser = await Tweets.findById(req.params.id);
    if (req.user.id !== dislikeuser.tweetedby) {
        try {
    
          
          if (dislikeuser.likes.includes(req.user.id)) {
            await Tweets.updateOne({ $pull: { likes: req.user.id } });
            
            res.status(200).json("user have been dislike");
          } else {
            res.status(403).json("you allready dislike this user");
          }
        } catch (err) {
          next(err)
        }
      } else {
        res.status(403).json("you cannot dislike you'r own tweet");
      }

}
const replyTweet = async(req,res)=>{
    try{
        const token = req.cookies.access_token;
        if (!token) {
          res.status("u are not authenticate")
        }
        jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", (err, user) => {
            if (err) res.status("token not valid")
            req.user = user;
            console.log(req.user.id)
        
          })
        const content = new Tweets(
            
        {
            content: req.body.content,
            tweetedby: req.user.id
        });
        console.log(content);
        await content.save();
        await Tweets.updateOne({$push:{ replies:req.body._id}});
        res.status(200).json(content)

    }catch(err){
        next(err)
    }
}
const getsingleTweet = async(req,res,next)=>{
    try{
        const singletweet = await Tweets.findById(req.params.id).populate('tweetedby');
        res.status(200).json(singletweet)
    }catch(err){
        next(err)
    }




    // const { tweetId } = req.params;

    // const tweet = await Tweets.findById(tweetId)
  
    // if (!tweet) {
    //   throw new ErrorHandler(404, 'Tweet not found');
    // }
  
    // res.json({ tweet });
}
const getallTweet = async(req,res,next)=>{
    try{
      const alltweet = await Tweets.find().populate('tweetedby').populate('likes');
      res.status(200).json(alltweet)

    }catch(err){
      next(err);
    }

};




const deleteTweet = async(req,res,next)=>{

  const token = req.cookies.access_token;
  if (!token) {
    res.status("u are not authenticate")
  }
  jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", (err, user) => {
      if (err) res.status("token not valid")
      req.user = user;
      console.log(req.user.id)
  
    })
    const deletetweetuser = await Tweets.findById(req.params.id);
    console.log(deleteTweet.tweetedby)
    if(!deletetweetuser){
      res.status(404).json("tweet dosent exist")
    }else{
        try {
    
          
          if (req.user.id == deletetweetuser.tweetedby) {
            await Tweets.deleteOne({_id:req.params.id});
            
            res.status(200).json("tweet have been deleted");
          } else {
            res.status(403).json("tweet dosent exist");
          }
        } catch (err) {
          next(err)
        }
      }
    


}

const retweetTweet = (req,res)=>{

}







module.exports = {createTweet,likeTweet,getsingleTweet,getallTweet,dislikeTweet,replyTweet,deleteTweet};