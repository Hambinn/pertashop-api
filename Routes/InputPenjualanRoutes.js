const { inputPenjualan } = require("../Controllers/InputPenjualanController");
const router = require("express").Router();

router.post("/inputpenjualan", inputPenjualan);

module.exports = router;
