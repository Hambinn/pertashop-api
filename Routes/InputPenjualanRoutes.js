const {
  inputPenjualan,
  getPenjualan,
} = require("../Controllers/InputPenjualanController");
const router = require("express").Router();

router.post("/inputpenjualan", inputPenjualan);
router.get("/inputpenjualan", getPenjualan);

module.exports = router;
