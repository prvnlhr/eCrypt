//IMPORTS
import "./loadEnv.js";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import UserDatabase from "./models/userData.js";
import routesIndex from "./routes/index.js";
import cookiesParser from "cookie-parser";
import path from "path";

//MIDDLEWARE
dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookiesParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

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

app.use("/", routesIndex);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//SERVER LISTEN
app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Listening on localhost:${PORT}`);
  }
});

// MONGODB LOCAL DATABASE CONNECTION___________________________
// mongoose.connect(process.env.MONGODB_LOCAL_URL, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

// db.once("open", function () {
//   console.log("Connected to Database :: MongoDB Local");
// });
