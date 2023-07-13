const {
  registerRealestate,
  fetchRealestate,
  deleteRealestate,
  saveRealestateImage,
  fetchUserRealestate,
  getRealestateImg,
  getOneRealestate,
} = require("../repository/Realestate.repository");

const registerNewRealestate = async (req, res) => {
  try {
    const realestate = req.body;
    const response = await registerRealestate(realestate);
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const fetchAllRealestates = async (req, res) => {
  try {
    const realestate = req.body;
    const response = await fetchRealestate(realestate);
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteOneRealestate = async (req, res) => {
  try {
    const realestateid = req.query.realestateId;
    console.log("Delete car with id", realestateid);
    const response = await deleteRealestate(realestateid);

    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
const addRealestateImg = async (req, res) => {
  try {
    const realestateImg = req.body;
    const response = await saveRealestateImage(realestateImg);
    console.log("Realestate picture is added");
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUserRealestate = async (req, res) => {
  try {
    const userId = req.query.userId;
    const response = await fetchUserRealestate(userId);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
const fetchRealestateImg = async (req, res) => {
  try {
    const realestateId = req.query.realestateId;
    const response = await getRealestateImg(realestateId);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const fetchOneRealestate = async (req, res) => {
  try {
    const realestateid = req.query.realestateid;
    console.log("Getting realestate with  fetch one id", realestateid);
    const response = await getOneRealestate(realestateid);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  registerNewRealestate,
  deleteOneRealestate,
  fetchAllRealestates,
  addRealestateImg,
  getUserRealestate,
  fetchRealestateImg,
  fetchOneRealestate,
};
