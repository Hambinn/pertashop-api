const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const authRoutes = require("./Routes/AuthRoutes");
const inputPenjualanRoutes = require("./Routes/InputPenjualanRoutes");
const penjualanManagerRoutes = require("./Routes/PenjualanManagerRoutes");
const terimaBBMRoutes = require("./Routes/TerimaBBMRoutes");
const inputBulananRoutes = require("./Routes/InputBulananRoutes");
const biayaOperasional = require("./Routes/BiayaOperasionalRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();
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
  console.log(process.env.MONGODB_URI);
});

mongoose
  .connect(process.env.MONGODB_URI, {
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
app.use("/", inputPenjualanRoutes);
app.use("/", penjualanManagerRoutes);
app.use("/", terimaBBMRoutes);
app.use("/", inputBulananRoutes);
app.use("/", biayaOperasional);
