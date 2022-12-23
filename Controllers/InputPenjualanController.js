// const inputPenjualanModel = require("../Models/InputPenjualanModel");

module.exports.inputPenjualan = async (req, res, next) => {
  try {
    const {
      tanggal,
      meteranAwal,
      meteranAkhir,
      penjualanBukanMember,
      penjualanDiantar,
      penjualanMember,
      stik,
    } = req.body;
    res.send("input penjualan");
  } catch (err) {
    console.log(err);
  }
};

module.exports.getPenjualan = async (req, res, next) => {
  res.json({ message: "get penjualan" });
};
