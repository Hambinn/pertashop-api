const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { username: "", password: "" };

  if (err.message === "Incorrect username") {
    errors.username = "That username is not registered";
  }

  if (err.message === "Incorrect Password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.username = "username already exists";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.create({ username, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: false,
      withCredentials: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.login(username, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: false,
      withCredentials: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
