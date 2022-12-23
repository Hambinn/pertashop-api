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
    res.json({
      tanggal: tanggal,
      meteranAwal: meteranAwal,
      meteranAkhir: meteranAkhir,
      penjualanBukanMember: penjualanBukanMember,
      penjualanDiantar: penjualanDiantar,
      penjualanMember: penjualanMember,
      stik: stik,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getPenjualan = async (req, res, next) => {
  res.json({ message: "get penjualan" });
};
