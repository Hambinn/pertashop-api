const {
    inputBulanan,
    getTerimaBBM,
    getShiftAwal,
    getStikAwal
  } = require("../Controllers/InputBulananController");
  const { checkInput } = require("../Middlewares/AuthMiddlewares");
  const router = require("express").Router();
  
  router.post("/inputbulanan", inputBulanan);
  router.get("/getterimabbm", getTerimaBBM);
  router.get("/getshiftawal", getShiftAwal);
  router.get("/getstikawal", getStikAwal);

  module.exports = router;
  