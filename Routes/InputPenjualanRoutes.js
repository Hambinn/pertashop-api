const { inputPenjualan } = require("../Controllers/InputPenjualanController");
const { checkInput } = require("../Middlewares/AuthMiddlewares");
const router = require("express").Router();

router.post("/checkinput", checkInput);
router.post("/inputpenjualan", inputPenjualan);

module.exports = router;
