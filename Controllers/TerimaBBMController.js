const authentication = require("../Models/SheetsModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.inputTerimaBBM = async (req, res, next) => {
  try {
    const { sheets } = await authentication();
    const {
      tanggal,
      terimaBBM,
    } = req.body;
    const writeReq = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "TerimaBBM",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            tanggal,
            terimaBBM,
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

module.exports.getTerimaBBM = async (req, res, next) => {
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
      range: "TerimaBBM",
      majorDimension: "ROWS",
    });
    readReq.data.values.shift();
    res.json(readReq.data.values);
  } catch (error) {
    console.log("Error updating spreadsheet");
    console.log(error);
    res.status(500).send();
  }
};
