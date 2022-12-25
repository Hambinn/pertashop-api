const {
  inputPenjualan,
  getPenjualan,
} = require("../Controllers/InputPenjualanController");
const { checkInput } = require("../Middlewares/AuthMiddlewares");
const router = require("express").Router();

router.post("/checkinput", checkInput);
router.post("/inputpenjualan", inputPenjualan);
router.post("/penjualan", getPenjualan);

module.exports = router;
