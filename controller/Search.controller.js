const {
  searchRealestates,
  newSearchAllRealestates,
} = require("../repository/search.repository");

const searchRealestate = async (req, res) => {
  try {
    console.log("queryparams", req.query);
    const response = await searchRealestates(req.query);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const newSearchAll = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const response = await newSearchAllRealestates(searchQuery);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = {
  searchRealestate,
  newSearchAll,
};
