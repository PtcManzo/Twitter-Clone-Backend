const jwt = require("jsonwebtoken")

 const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      res.status("u are not authenticate")
    }
  
    jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", (err, user) => {
      if (err) res.status("token not valid")
      req.user = user;
      next();
    });
  };
  
const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status("u are not authorised")
      }
    });
  };
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
       res.status("you are not authorised")
      }
    });
  };


  module.exports = {verifyToken,verifyAdmin,verifyUser}