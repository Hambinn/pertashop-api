const {
    getBiayaOperasional,
    inputBiayaOperasional,
  } = require("../Controllers/BiayaOperasionalController");
  const { checkInput } = require("../Middlewares/AuthMiddlewares");
  const router = require("express").Router();
  
  router.post("/getbiayaoperasional", getBiayaOperasional);
  router.post("/inputbiayaoperasional", inputBiayaOperasional);

  module.exports = router;
  