const authentication = require("../Models/SheetsModels");

module.exports.getPenjualanManager = async (req, res, next) => {
  try {
    month = req.body.month;
    const { sheets } = await authentication();
    const readReq = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: month,
    });
    readReq.data.values.shift();
    res.send(readReq.data);
  } catch (error) {
    console.log("Error to get the Spreadsheet");
    console.log(error);
    res.status(500).send();
  }
};

module.exports.getSheetsList = async (req, res, next) => {
    try {
      const { sheets } = await authentication();
      readReq = await sheets.spreadsheets.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        });
      const list_sheets = []
      for (let i = 1; i < readReq.data.sheets.length; i++) {
        list_sheets.push(readReq.data.sheets[i].properties.title);
        }
      res.send(list_sheets);
    } catch (error) {
      console.log("Error to get the Spreadsheet");
      console.log(error);
      res.status(500).send();
    }
  };  