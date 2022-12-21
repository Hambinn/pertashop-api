const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose
  .connect("mongodb://localhost:27017/portashop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use("/", authRoutes);
