const authentication = require("../Models/SheetsModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.inputBulanan = async (req, res, next) => {
  try {
    const { sheets } = await authentication();
    const {
      tanggal,
      sheet,
      terimaBBM,
      tera,
      stanAwal,
      stanAkhir,
      stikAwalCm,
      stikAkhirCm,
      penjualanJerigen,
      userId
    } = req.body;
    const omset = stanAkhir-stanAwal-tera;
    const stikAwalLt = stikAwalCm*21;
    const stikAkhirLt = stikAkhirCm*21;
    const lossisHarianLt = stikAkhirLt-stikAwalLt+omset-terimaBBM;
    const lossisHarianRp = lossisHarianLt*12500;
    const penjualanRetail = omset-penjualanJerigen;
    const totalRetail = penjualanRetail*13900;
    const totalJerigen = penjualanJerigen*12400;
    const jumlah = totalRetail+totalJerigen;
    const writeReq = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: sheet,
    valueInputOption: "USER_ENTERED",
    resource: {
        values: [
          [
            tanggal,
            terimaBBM,
            tera,
            stanAwal,
            stanAkhir,
            omset,
            stikAwalCm,
            stikAwalLt,
            stikAkhirCm,
            stikAkhirLt,
            lossisHarianLt,
            lossisHarianRp,
            penjualanRetail,
            penjualanJerigen,
            totalRetail,
            totalJerigen,
            jumlah
          ],
        ],
      },
    });

    if (writeReq.status === 200) {
      return res.json({ userId: userId });
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
  const tanggal = req.headers.tanggal;
  try {
    const { sheets } = await authentication();
    const readReq = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "TerimaBBM",
      majorDimension: "ROWS",
    });
    readReq.data.values.shift();
    const data = readReq.data.values.filter((item) => item[0] === tanggal);
    if (data.length === 0) {
      return res.json({ value: 0 });
    }
    else{
      return res.json({ value: data[0][1] });
    }
  } catch (error) {
    console.log("Error updating spreadsheet");
    console.log(error);
    res.status(500).send();
  }
}

module.exports.getShiftAwal = async (req, res, next) => {
  const tanggal = req.headers.tanggal;
  try {
    const { sheets } = await authentication();
    const readReq = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1",
      majorDimension: "ROWS",
    });
    readReq.data.values.shift();
    const data = readReq.data.values.filter((item) => item[0] === tanggal && item[8] === "1");
    res.json(data);
  } catch (error) {
    console.log("Error updating spreadsheet");
    console.log(error);
    res.status(500).send();
  }
};

module.exports.getStikAwal = async (req, res, next) => {
  const tanggal = req.headers.tanggal;
  try {
    const { sheets } = await authentication();
    const readReq = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1",
      majorDimension: "ROWS",
    });
    readReq.data.values.shift();
    const data = readReq.data.values.filter((item) => item[0] === tanggal && item[8] === "2");
    res.json(data);
  } catch (error) {
    console.log("Error updating spreadsheet");
    console.log(error);
    res.status(500).send();
  }
};

module.exports.addNewSheet = async (req, res, next) => {
  const sheet = req.body.sheet;
  try {
    const { sheets } = await authentication();
    const writeReq = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.SPREADSHEET_ID,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheet
              },
            },
          },
        ],
      },
    });
    res.json(writeReq.data);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

module.exports.addNewValueSheet = async (req, res, next) => {
  try {
    const sheet = req.body.sheet;
    const { sheets } = await authentication();
    const writeReq = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: sheet,
    valueInputOption: "USER_ENTERED",
    resource: {
        values: [
          [
            "Tanggal",
            "Terima BBM",
            "Tera",
            "Stan Awal",
            "Stan Akhir",
            "Omset",
            "Stik Awal cm",
            "Stik Awal lt",
            "Stik Akhir cm",
            "Stik Akhir lt",
            "Lossis Harian lt",
            "Lossis Harian Rp",
            "Penjualan Retail",
            "Penjualan Jerigen",
            "13900",
            "13800",
            "Jumlah"
          ],
        ],
      },
    });

    if (writeReq.status === 200) {
      return res.json();
    } else {
      return res.json({ msg: "Update failed" });
    }
  } catch (error) {
    console.log("Error updating spreadsheet");
    console.log(error);
    res.status(500).send();
  }
};