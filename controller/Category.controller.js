const {
  getCategory,
  addCategory,
} = require("../repository/Category.repository");

const getAllCategories = async (req, res) => {
  try {
    const category = req.body;
    const response = await getCategory(category);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addNewCategory = async (req, res) => {
  try {
    const name = req.body;
    const response = await addCategory(name);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllCategories,
  addNewCategory,
};
