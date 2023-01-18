const authentication = require("../Models/SheetsModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.inputPenjualan = async (req, res, next) => {
  try {
    const { sheets } = await authentication();
    const {
      tanggal,
      meteranAwal,
      meteranAkhir,
      penjualanBukanMember,
      penjualanDiantar,
      penjualanMember,
      stik,
      userId,
      shift,
      penjualanId,
    } = req.body;
    const hashPenjualan = await bcrypt.hash(penjualanId.toString(), 10);
    const stringHash = hashPenjualan.toString();
    const writeReq = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            tanggal,
            meteranAwal,
            meteranAkhir,
            penjualanBukanMember,
            penjualanDiantar,
            penjualanMember,
            stik,
            userId,
            shift,
            stringHash,
          ],
        ],
      },
    });

    if (writeReq.status === 200) {
      return res.json({ userId: userId, msg: stik });
    } else {
      return res.json({ msg: "Update failed" });
    }
  } catch (error) {
    console.log("Error updating spreadsheet");
    console.log(error);
    res.status(500).send();
  }
};

module.exports.getPenjualan = async (req, res, next) => {
  const token = req.cookies.jwt;
  let decoded = "";
  jwt.verify(token, "secret", (err, decodedToken) => {
    if (err) {
      res.json({ status: false });
      next();
    } else {
      decoded = decodedToken.id;
    }
  });
  try {
    const { sheets } = await authentication();
    const readReq = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1",
      majorDimension: "ROWS",
    });
    readReq.data.values.shift();
    const data = readReq.data.values.filter((item) => item[7] === decoded);
    res.json(data);
  } catch (error) {
    console.log("Error updating spreadsheet");
    console.log(error);
    res.status(500).send();
  }
};
