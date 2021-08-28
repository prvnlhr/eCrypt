const UserDatabase = require("../models/userData");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");
const sendMail = require("../utils/sendMail");

const {
  ACTIVATION_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  CLIENT_URL,
  SEND_GRID_API_KEY,
  SENDER_EMAIL_ADDRESS,
} = process.env;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SEND_GRID_API_KEY);
//_________________________________________________________________________________________________________________________________________
//REGISTERING NEW USER_____________________________________________________________________________________________________________________

const authController = {
  register: async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
      //checking all field fill or not.
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ msg: "Please fill in all fields" });
      }
      //checking email address is valid or not.
      if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Not a valid email address" });
      }
      //checking if password fields match or not
      if (password !== confirmPassword) {
        return res.status(400).json({ msg: " Passwords does not match" });
      }
      //checking email address already exist or not.
      const existingUser = await UserDatabase.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email address already exist" });
      }
      //checking password length for minimum password length.
      if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be least 6 digit" });
      }
      //hashing password.
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name: `${firstName} ${lastName}`,
        email,
        password: passwordHash,
      };
      //creating jwt Token.
      const activation_token = createActivationToken(newUser);
      const txt = "Account Activation Link";
      const url = `${CLIENT_URL}/user/auth/activate/${activation_token}`;

      const response = sendMail(email, url, txt);
      res.status(200).json({ msg: "Check your email for activation link" });
    } catch (error) {
      console.log("error in registration", error);
    }
  },
  activateEmail: async (req, res) => {
    try {
      // const { activation_token } = req.body.data;
      console.log("activation token cntorl", req.body.data);
      const user = jwt.verify(
        req.body.data.activation_token,
        ACTIVATION_TOKEN_SECRET
      );

      const { name, email, password } = user;

      const check = await UserDatabase.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });

      const newUser = await UserDatabase.create({
        name: name,
        email: email,
        password: password,
      });

      res.json({ msg: "Account has been activated!" });
    } catch (err) {
      if (
        err.name === "TokenExpiredError" ||
        err.name === "JsonWebTokenError"
      ) {
        return res.status(401).json({ msg: "Link Expired! Register again" });
      }
      console.log("error at activateEmail", err.name);
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log("at login cntrl", req.body);
      const user = await UserDatabase.findOne({ email });
      // console.log("user", user);
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });
      // console.log("check1");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });
      // console.log("check2");
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        secure: true,
        samSite: "none",
        path: "/user/auth/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      // console.log("check3");

      const access_token = createAccessToken({ id: user._id });
      // console.log("check4");

      res.status(200).json(access_token);
    } catch (err) {
      console.log("error at Login controller", err);
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      // console.log("refresh_token from cookies::", req.cookies.refreshtoken);
      if (!rf_token) {
        return res.status(401).json({ msg: "Please Login to continue !" });
      }
      const decode = jwt.verify(rf_token, REFRESH_TOKEN_SECRET);
      var userId = decode.id;
      const access_token = createAccessToken({ id: userId });
      res.status(200).json(access_token);
    } catch (error) {
      // console.log("error at get token controller", error.name);
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        return res.status(401).json({ msg: "Please Login to continue !" });
      }
      return res.status(400).json({ msg: error });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UserDatabase.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Email Id doest not exist" });
      }
      // console.log("user", user.email, user._id, user.name);

      const tokenPayload = {
        name: user.name,
        email: user.email,
        id: user._id,
      };
      const reset_token = createAccessToken(tokenPayload);
      // const activation_token = createActivationToken(user);

      const url = `${CLIENT_URL}/user/auth/reset/${reset_token}`;
      sendMail(email, url, "Reset your password. Click the below link");
      res.json({ msg: "Please check your email for reset link" });
    } catch (error) {
      console.log("error at forgot password controller", error);
      return res.status(404).send(error);
    }
  },
  resetPassword: async (req, res) => {
    try {
      console.log("reset password cntrl", req.body);
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      console.log(req.user);
      const newPassword = await UserDatabase.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );
      res.json({ msg: "Password successfully changed !" });
    } catch (error) {
      console.log("error at reset password controller", error);
      return res.status(404).send(error);
    }
  },
  changePassword: async (req, res) => {
    // console.log("at change PAss controller",req.body)
    try {
      const { oldPassword, newPassword } = req.body;
      const id = req.user.id;
      const user = await UserDatabase.findById(id);
      if (!user) {
        return res.status(400).send({ msg: "Email Id does not exist." });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Old Password does not matched !" });
      }
      const passwordHash = await bcrypt.hash(newPassword, 12);
      const changePassword = await UserDatabase.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );
      res.json({ msg: "Password successfully changed !" });
    } catch (error) {
      console.log("error at changePassword controller", error);
      return res.status(404).send(error);
    }
  },
  updateProfile: async (req, res) => {
    const { firstName, lastName, email } = req.body.profileData;
    try {
      const id = req.user.id;
      const user = await UserDatabase.findById(id);
      if (!user) {
        return res.status(400).send({ msg: "Email Id does not exist." });
      }
      const response = await UserDatabase.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: `${firstName} ${lastName}`,
            email: email,
          },
        },
        { returnOriginal: false }
      );
      const newData = {
        _id: response._id,
        name: response.name,
        email: response.email,
      };
      res.json({ msg: "Profile Successfully updated !", newData });
    } catch (error) {
      console.log("error at edit profile controller", error);
      return res.status(404).send(error);
    }
  },
  deleteAccountPermanently: async (req, res) => {
    try {
      console.log(req.body);
      const { oldPassword } = req.body;
      const id = req.user.id;
      const user = await UserDatabase.findById(id);
      if (!user) {
        return res.status(400).send({ msg: "User does not exist." });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Password invalid !" });
      }
      const response = await UserDatabase.findByIdAndDelete({
        _id: req.user.id,
      });

      res.json({ msg: "Account successfully deleted !" });
    } catch (error) {
      console.log("error at edit delete account controller", error);

      return res.status(404).send(error);
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const user = await UserDatabase.findById(req.user.id).select("-password");
      res.json({ user });
    } catch (error) {
      console.log("error at getUserinfo controller", error);
      return res.status(404).send(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await UserDatabase.findById(req.user.id).select("-password");
      res.status(200).send(user);
    } catch (error) {
      console.log(error);

      res.status(404).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/auth/refresh_token" });
      return res.status(200).json({ msg: "Successfully Logged out" });
    } catch (error) {
      console.log("error at logout controller", error);
      return res.status(404).send(error);
    }
  },
};

//_________________________________________________________________________________________________________________-
//_______________________________________________________________________________________________________

//___________________________________________________________________________________________________
function createActivationToken(payload) {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: "5m" });
}
function createAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
function createRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "2d" });
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
module.exports = authController;
