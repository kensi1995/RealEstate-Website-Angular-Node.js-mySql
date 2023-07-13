const connection = require("../database/connection");

const registerRealestate = (realestate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await saveRealestate(realestate);
      console.log("save realestate", id);
      resolve("Realestate sucessfully created");
    } catch (error) {
      reject(error);
    }
  });
};
saveRealestate = (realestate) => {
  const {
    name,
    price,
    location,
    size,
    description,
    room,
    floor,
    category_id,
    user_id,
  } = realestate;

  const query = `
    INSERT INTO realestate (name, price, location, size, description, room, floor, category_id, user_id)
    SELECT ?,?,?,?,?,?,?,?,id FROM user WHERE id = ?
  `;
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [
        name,
        price,
        location,
        size,
        description,
        room,
        floor,
        category_id,
        user_id,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};
// saveRealestate = (realestate) => {
//   const {
//     name,
//     price,
//     location,
//     size,
//     description,
//     room,
//     floor,
//     category_id,
//     user_id,
//   } = realestate;

//   const query = `INSERT INTO realestate( name, price, location, size, description, room, floor, category_id, user_id) VALUES(?,?,?,?,?,?,?,?,?)`;
//   return new Promise((resolve, reject) => {
//     connection.query(
//       query,
//       [
//         name,
//         price,
//         location,
//         size,
//         description,
//         room,
//         floor,
//         category_id,
//         user_id,
//       ],
//       (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       }
//     );
//   });
// };

const fetchRealestate = (realestate) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      price,
      location,
      size,
      description,
      room,
      floor,
      category_id,
      user_id,
    } = realestate;
    const queryRealestate = `SELECT * FROM realestate`;
    // const queryRealestate = `SELECT realestate.*,realestate_image.image FROM realestate, realestate_image WHERE realestate_image.realestateId=realestate.id`;
    connection.query(
      queryRealestate,
      [
        name,
        price,
        location,
        size,
        description,
        room,
        floor,
        category_id,
        user_id,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const deleteRealestate = (realestateId) => {
  return new Promise((resolve, reject) => {
    //Ovdje ce ici query commentkad bude
    const queryRealestate = `DELETE FROM realestate WHERE realestate.id=?`;
    connection.query(queryRealestate, [realestateId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const saveRealestateImage = (realestateImg) => {
  const { id, image } = realestateImg;
  console.log("realestate repository prije querya", realestateImg, id, image);
  const query = `INSERT INTO realestate_image (realestateId, image) VALUES (?, ?)`;
  return new Promise((resolve, reject) => {
    connection.query(query, [id, image], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const fetchUserRealestate = (userId) => {
  return new Promise((resolve, reject) => {
    const queryRealestate = `SELECT realestate_image.image, realestate.name, realestate.price, realestate.id FROM realestate JOIN user ON realestate.user_id = user.id LEFT JOIN realestate_image ON realestate_image.realestateId = realestate.id WHERE user.id = user_id;`;
    connection.query(queryRealestate, [userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const getRealestateImg = (realestateId) => {
  return new Promise((resolve, reject) => {
    const queryRealestate = `SELECT * FROM realestate_image WHERE realestate_image.realestateId=?`;
    connection.query(queryRealestate, [realestateId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getOneRealestate = (realestateId) => {
  return new Promise((resolve, reject) => {
    const queryRealestate = `SELECT realestate.*,user.username,realestate_image.image FROM realestate,user,realestate_image  WHERE  user.id=realestate.user_id and realestate.id=? `;

    connection.query(queryRealestate, [realestateId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  registerRealestate,
  fetchRealestate,
  deleteRealestate,
  saveRealestateImage,
  fetchUserRealestate,
  getRealestateImg,
  getOneRealestate,
};
