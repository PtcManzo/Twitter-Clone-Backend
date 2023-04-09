const express = require("express")
const {verifyUser} = require("../utils/Verifytoken")
const {createTweet,likeTweet,dislikeTweet,getsingleTweet,getallTweet,replyTweet,deleteTweet} = require("../controller/twitterpage")
const router = express.Router();



//UPDATE
router.post("/",verifyUser,createTweet,);
router.post("/:id/like",likeTweet);
router.post("/:id/dislike",dislikeTweet);
router.post("/:id/reply",replyTweet);
router.get("/:id",getsingleTweet);
router.get("",getallTweet);
router.delete("/:id",deleteTweet);
// router.post("/:id/retweet",retweetTweet);


module.exports = router