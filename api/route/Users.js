const router = require("express").Router();
const {upload} = require ("../utils/userprofile")
const {getUser,followUser,unfollowuser,updateUser,uploadpic} = require("../controller/users")

router.get("/:id",getUser)
router.post("/user/:id/follow",followUser)
router.post("/user/:id/unfollow",unfollowuser)
router.put("/:id",updateUser)
router.post("/:id/profilepic",upload.single('profileimage'),uploadpic);



module.exports = router