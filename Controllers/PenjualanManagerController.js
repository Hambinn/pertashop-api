const authentication = require("../Models/SheetsModels");

module.exports.getPenjualanManager = async (req, res, next) => {
  try {
    const { sheets } = await authentication();
    const readReq = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Oktober-2022",
    //   majorDimension: "ROWS",
    });
    res.send(readReq.data);
  } catch (error) {
    console.log("Error to get the Spreadsheet");
    console.log(error);
    res.status(500).send();
  }
};
