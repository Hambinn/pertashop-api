const { getPenjualanManager, getSheetsList } = require("../Controllers/PenjualanManagerController");
const router = require("express").Router();
  
router.post("/penjualanmanager", getPenjualanManager);
router.get("/sheetslist", getSheetsList);

module.exports = router;
