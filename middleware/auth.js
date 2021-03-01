// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  // console.log("Header cookies::", req.headers);
  try {
    const token = req.header("Authorization");
    // console.log(token);
    if (!token) return res.status(400).json({ msg: "Token not present " });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: "Token Verification failed!" });
      }
      req.user = user;
      // console.log("Middleware::", req.user);
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};
// export default authNew;
module.exports = auth;
