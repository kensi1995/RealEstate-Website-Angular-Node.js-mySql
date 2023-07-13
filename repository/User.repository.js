const connection = require("../database/connection");
const { USER_ROLE, USER_ACTIVE, USER_BANED } = require("../constant");

const banUser = (user) => {
  const { status, id } = user;
  const queryUser = ` UPDATE user SET status=? WHERE user.id=?`;
  return new Promise((resolve, reject) => {
    connection.query(queryUser, [status, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getUserbyEmail = (user) => {
  return new Promise((resolve, reject) => {
    const { email } = user;
    const queryUser = `SELECT user.password,user.status,user.username,user.id,user.email,user.role,profile.firstName,
        profile.lastName,profile.city,profile.phone,profile.address,profile.image FROM user,profile WHERE email = ? and user.id=profile.id `;

    connection.query(queryUser, [email], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};

const register = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await saveUser(user);
      console.log("save user", id);
      await saveProfile(user, id);
      resolve("profile successfully created");
    } catch (error) {
      reject(error);
    }
  });
};

const saveUser = (user) => {
  const { email, username, password } = user;
  const queryUser = `INSERT INTO user (email,username,password,role,status)  VALUES (?,?,?,?,?) `;
  return new Promise((resolve, reject) => {
    connection.query(
      queryUser,
      [email, username, password, USER_ROLE, USER_ACTIVE],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
};
const saveProfile = (user, id) => {
  const { firstName, lastName, address, city, phone } = user;
  const queryUser = `INSERT INTO profile (id,firstName,lastName,address,city,phone)  VALUES (?,?,?,?,?,?) `;
  return new Promise((resolve, reject) => {
    connection.query(
      queryUser,
      [id, firstName, lastName, address, city, phone],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const getUsers = (user) => {
  const { id, email, username, role, status } = user;
  const queryUser = `SELECT * FROM user `;
  return new Promise((resolve, reject) => {
    connection.query(
      queryUser,
      [id, email, username, role, status],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const changeImg = (userImg) => {
  const { userId, imgUrl } = userImg;

  const queryUser = `UPDATE profile SET image=?  where profile.id=?`;
  return new Promise((resolve, reject) => {
    connection.query(queryUser, [imgUrl, userId], (err, result) => {
      if (err) return reject(err);
      resolve(imgUrl);
    });
  });
};

module.exports = {
  register,
  getUserbyEmail,
  getUsers,
  banUser,
  changeImg,
};
