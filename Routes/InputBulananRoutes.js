const {
    inputBulanan,
    getTerimaBBM,
    getShiftAwal,
    getStikAwal,
    addNewSheet,
    addNewValueSheet
  } = require("../Controllers/InputBulananController");
  const { checkInput } = require("../Middlewares/AuthMiddlewares");
  const router = require("express").Router();
  
  router.post("/inputbulanan", inputBulanan);
  router.get("/getterimabbm", getTerimaBBM);
  router.get("/getshiftawal", getShiftAwal);
  router.get("/getstikawal", getStikAwal);
  router.post("/addnewsheet", addNewSheet);
  router.post("/addnewvaluesheet", addNewValueSheet);

  module.exports = router;
  