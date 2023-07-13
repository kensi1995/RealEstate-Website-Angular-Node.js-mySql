const connection = require("../database/connection");

const getCategory = () => {
  const queryUser = `SELECT * FROM category`;
  return new Promise((resolve, reject) => {
    connection.query(queryUser, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const addCategory = (category) => {
  const { id, name } = category;
  const query = `INSERT INTO category (name) VALUE (?)`;
  return new Promise((resolve, reject) => {
    connection.query(query, [name], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getCategory,
  addCategory,
};
