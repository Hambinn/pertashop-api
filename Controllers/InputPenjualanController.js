const authentication = require("../Models/SheetsModels");

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
    } = req.body;

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
