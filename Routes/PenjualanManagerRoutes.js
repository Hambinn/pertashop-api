const { getPenjualanManager } = require("../Controllers/PenjualanManagerController");
  const router = require("express").Router();
  
  router.get("/penjualanmanager", getPenjualanManager);
  
  module.exports = router;
  