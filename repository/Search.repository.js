const connection = require("../database/connection");

const searchRealestates = (filter) => {
  let query = `SELECT realestate.id,realestate.name,realestate.price,realestate.location,realestate.size,realestate.description,
  realestate.room,realestate.floor,realestate.category_id,realestate.user_id,realestate_image.image
    FROM realestate LEFT JOIN realestate_image ON realestate.id=realestate_image.realestateId WHERE 1=1 `;

  if (filter.carName) {
    query =
      query + `AND upper(name) LIKE '%${filter.realestateName.toUpperCase()}%'`;
  }

  if (filter.categoryId) {
    query = query + `AND category_id=${filter.categoryId}`;
  }
  query += " GROUP BY realestate.id";

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.log("search realestate error", err);
        return reject(err);
      }
      resolve(result);
      console.log("Rezultat querya je", result);
    });
  });
};
const newSearchAllRealestates = (searchQuery) => {
  return new Promise((resolve, reject) => {
    const queryRealestate = `SELECT * FROM realestate WHERE name LIKE '%${searchQuery}%'`;
    connection.query(queryRealestate, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  searchRealestates,
  newSearchAllRealestates,
};
