const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
        res;
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) res.json({ status: true, user: user.username });
        else {
          res.json({ status: false });
          next();
        }
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};

module.exports.checkInput = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret", (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        res.json({ idUser: decodedToken.id });
      }
    });
  } else {
    res.json({ status: false });
  }
};
