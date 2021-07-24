//IMPORTS
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookiesParser = require("cookie-parser");
const path = require("path");

const app = express();

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// var corsOptions = {
//   credentials: true,
//   origin: "https://ecrypt.herokuapp.com",
//   methods: ["POST", "GET", "DELETE" ,"PUT","OPTIONS"],
//   maxAge: 3600,
// };
// app.use(cors(corsOptions));

app.use(cookiesParser());
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CONNECTION_URL = process.env.MONGODB_URL;
// const CONNECTION_URL = process.env.MONGODB_LOCAL_URL;

const PORT = process.env.PORT || 9000;
//MONGODB CLOUD DATABASE CONNECTION________________________
mongoose
  .connect(CONNECTION_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to Database :: MongoDB Cloud"))
  .catch((err) => console.log(err.message));

// const allowedOrigins = [
//   "https://ecrypt.herokuapp.com",
//   "http://localhost:3000",
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Origin not allowed by CORS"));
//     }
//   },
//   methods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"],
//   maxAge: 3600,
//   credentials: true,
//   //   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
// };
// Enable preflight requests for all routes
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

app.use(function (req, res, next) {
  // Access-Control-Allow-Credentials: true
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS,PATCH"
  );
  res.header("Access-Control-Allow-Credentials", true);
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "https://ecrypt.herokuapp.com");
  // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept ,Authorization"
  );
  next();
});

app.use("/", require("./routes/index"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
//SERVER LISTENING
app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Listening on localhost:${PORT}`);
  }
});
