const {
    getBiayaOperasional,
  } = require("../Controllers/BiayaOperasionalController");
  const { checkInput } = require("../Middlewares/AuthMiddlewares");
  const router = require("express").Router();
  
  router.post("/getbiayaoperasional", getBiayaOperasional);

  module.exports = router;
  