const User = require("../models").User;
const UserRole = require("../models").UserRole;
const Role = require("../models").Role;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/app");
//Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).send({
        status: "Error",
        message: "Invalid credentials",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({
        status: "Error",
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ id: user.id }, config.appKey, {
      expiresIn: "1h",
    });
    return res.status(200).send({
      status: "Success",
      message: "Login successfully!",
      token: token,
    });
  } catch (err) {
    return res.status(500).send({
      status: "Error",
      message: err.message,
    });
  }
};

//Register Controller
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(403).send({
        status: "Error",
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });

    const memberRole = await Role.findOne({
      where: {
        title: "Member",
      },
    });
    await UserRole.create({
      userId: newUser.id,
      roleId: memberRole.id,
    });

    const token = jwt.sign({ id: newUser.id }, config.appKey, {
      expiresIn: "1h",
    });
    return res.status(200).send({
      status: "Success",
      message: "Register successfully!",
      token: token,
    });
  } catch (err) {
    return res.status(500).send({
      status: "Error",
      message: err.message,
    });
  }
};

//Refresh Token Controller
exports.refreshToken = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user.id }, config.appKey, {
      expiresIn: "1h",
    });
    res.send({
      status: "Success",
      token: token,
    });
  } catch (err) {
    return res.status(500).send({
      status: "Error",
      message: err.message,
    });
  }
};

