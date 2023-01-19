const {
    inputTerimaBBM,
    getTerimaBBM,
  } = require("../Controllers/TerimaBBMController");
  const { checkInput } = require("../Middlewares/AuthMiddlewares");
  const router = require("express").Router();
  
  router.post("/checkinput", checkInput);
  router.post("/inputterimabbm", inputTerimaBBM);
  router.post("/getterimabbm", getTerimaBBM);
  
  module.exports = router;
  