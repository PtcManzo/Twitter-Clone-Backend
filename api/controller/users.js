const User = require("../model/User")
const multer = require("multer")


const upload = multer().single('profileimage')

//getuser
const getUser = async (req, res) => {
    try {
        
      const user = await User.findById(req.params.id);
      
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  //add folower and following
  const followUser = async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you allready follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant follow yourself");
      }
  };

// remove follower and following
const unfollowuser = async (req,res,next)=>{
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you dont follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }
};

const updateUser = async (req,res,next)=>{
try{
    const updateUser = await User.findByIdAndUpdate({$set:req.body},{new:true});
    res.status(200).json(updateUser);

}catch(err){
    next(err)
}

}

const uploadpic = async (req,res,next)=>{
  try{
    
    const updateUser = await User.findById(req.params.id)
    await updateUser.updateOne({profilepicture:req.file.path})
    res.status(200).json(updateUser);
  }catch(err){
    next(err)
  }
};

      // const user = await User.findById(req.params.id);
      // await user.profilepicture.set(req.file);
      // console.log(user);
      // res.status(200).json(user);
  
  // }catch(err){next(err)}

  // upload(req, res, function (err) {
  //   if (err instanceof multer.MulterError) {
  //    res.send(err)
  //   } else if (err) {
  //    res.send(err)
  //   }
  //   else{
  //     console.log(req.file)
  //   }
    
    
  // })
// }


  module.exports = {getUser,followUser,unfollowuser,updateUser,uploadpic}


  