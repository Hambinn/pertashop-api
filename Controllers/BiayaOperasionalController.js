const authentication = require("../Models/SheetsModels");

module.exports.getBiayaOperasional = async (req, res, next) => {
  try {
    date = req.body.date;
    const { sheets } = await authentication();
    const readReq = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Biaya Operasional",
    });
    readReq.data.values.shift();
    const data = readReq.data.values.filter((item) => item[0].slice(0,7) === date);
    res.send(data);
  } catch (error) {
    console.log("Error to get the Spreadsheet");
    console.log(error);
    res.status(500).send();
  }
};

module.exports.inputBiayaOperasional = async (req, res, next) => {
  try {
    const { sheets } = await authentication();
    const {
      tanggal,
      gaji,
      seragamKaryawan,
      rewardKaryawan,
      uangTapBBM,
      pln,
      kebersihan,
      perawatanAlat,
      atk,
      perizinan,
      marketing,
      total,
    } = req.body;
    const writeReq = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Biaya Operasional",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            tanggal,
            gaji,
            seragamKaryawan,
            rewardKaryawan,
            uangTapBBM,
            pln,
            kebersihan,
            perawatanAlat,
            atk,
            perizinan,
            marketing,
            total,
          ],
        ],
      },
    });

    if (writeReq.status === 200) {
      return res.json({ msg: "Success" });
    } else {
      return res.json({ msg: "Update failed" });
    }
  } catch (error) {
    console.log("Error updating spreadsheet");
    console.log(error);
    res.status(500).send();
  }
};