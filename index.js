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
app.use(cors({ credentials: true, origin: "https://ecrypt.herokuapp.com" }));
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

// app.use("/", routesIndex);
app.use("/", require("./routes/index"));

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
