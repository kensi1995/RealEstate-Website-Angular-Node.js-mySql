const {
  register,
  getUserbyEmail,
  getUsers,
  banUser,
  changeImg,
} = require("../repository/User.repository");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const banUserPermanently = async (req, res) => {
  try {
    const user = req.body;
    const response = banUser(user);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = req.body;
    const response = await getUsers(user);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const registerUser = async (req, res) => {
  try {
    const user = req.body;
    console.log("user", user);
    if (!(user.email && user.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }
    const salt = await bcrypt.genSalt(10);
    console.log("salt", salt);
    user.password = await bcrypt.hash(user.password, salt);
    console.log("password", user.password);

    const response = await register(user);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const body = req.body;
    const user = await getUserbyEmail(body);
    console.log("user", user);
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const changeUserImg = async (req, res) => {
  try {
    const userImg = req.body;
    const response = await changeImg(userImg);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  banUserPermanently,
  getAllUsers,
  changeUserImg,
};
