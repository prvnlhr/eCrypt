import UserDatabase from "../models/userData.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import cookiesParser from "cookie-parser";

const {
  ACTIVATION_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  client_url,
} = process.env;
//_________________________________________________________________________________________________________________________________________
//REGISTERING NEW USER_____________________________________________________________________________________________________________________
export const register = async (req, res) => {
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
    const CLIENT_URL = client_url;
    const url = `${CLIENT_URL}/user/activate/${activation_token}`;
    sendMail(
      email,
      url,
      "Welcome on Board! Click below link to activate your account."
    );
    res.status(200).send({ msg: "Check your email for activation link" });
  } catch (error) {
    console.log(error);
  }
};

//ACTIVATING  ACCOUNT USING EMAIL VERIFICATION_______________________________________________________________________________
export const activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(
      req.body.data.activation_token,
      ACTIVATION_TOKEN_SECRET
    );
    const { name, email, password } = user;
    const check = await UserDatabase.findOne({ email });
    if (check) {
      return res.status(400).json({ msg: "Email address already exists" });
    }
    const newUser = await UserDatabase.create({
      name: name,
      email: email,
      password: password,
    });

    return res
      .status(200)
      .json({ msg: "Account activated. Login to continue !" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

//LOGGING IN USER________________________________________________________________________________________________________
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserDatabase.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "Email Id does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Password is incorrect" });
    }
    const refresh_token = createRefreshToken({ id: user._id });
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ msg: "Login success" });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ msg: error.message });
  }
};

//GETTING ACCESS TOKEN________________________________________________________________________________________
export const getAccessToken = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) {
      return res.status(401).json({ msg: "Please Login to continue !" });
    }
    const decode = jwt.verify(rf_token, REFRESH_TOKEN_SECRET);
    var userId = decode.id;
    const access_token = createAccessToken({ id: userId });
    res.status(200).json(access_token);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

//FORGOT PASSWORD____________________________________________________________________________________________________
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserDatabase.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Email Id doest not exist" });
    const access_token = createAccessToken({ id: user._id });
    const CLIENT_URL = client_url;

    const url = `${CLIENT_URL}/user/reset/${access_token}`;
    sendMail(email, url, "Reset your password. Click the below link");
    res.json({ msg: "Please check your email for reset link" });
  } catch (error) {
    return res.status(404).send(error);
  }
};
//RESET PASSWORD___________________________________________________________________________________________________
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    console.log(req.user);
    const newPassword = await UserDatabase.findOneAndUpdate(
      { _id: req.user.id },
      { password: passwordHash }
    );
    res.json({ msg: "Password successfully changed !" });
  } catch (error) {
    return res.status(404).send(error);
  }
};
//CHANGE PASSWORD__________________________________________________
export const changePassword = async (req, res) => {
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
    return res.status(404).send(error);
  }
};

//UPDATE PROFILE___________________________________________________________________
export const updateProfile = async (req, res) => {
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
    return res.status(404).send(error);
  }
};

//DELETE ACCOUNT__________________________________________________
export const deleteAccountPermanently = async (req, res) => {
  try {
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
    const response = await UserDatabase.findByIdAndDelete({ _id: req.user.id });

    res.json({ msg: "Account successfully deleted !" });
  } catch (error) {
    return res.status(404).send(error);
  }
};
//GETTING USER_________________________________________________________________________________________________
export const getUserInfo = async (req, res) => {
  try {
    const user = await UserDatabase.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    return res.status(404).send(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserDatabase.findById(req.user.id).select("-password");
    res.status(200).send(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//LOGOUT USER_________________________________________________________________________________________________________
export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.status(200).json({ msg: "Successfully Logged out" });
  } catch (error) {
    return res.status(404).send(error);
  }
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
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
