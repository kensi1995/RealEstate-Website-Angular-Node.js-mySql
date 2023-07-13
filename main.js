const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

//user
const {
  registerUser,
  loginUser,
  banUserPermanently,
  getAllUsers,
  changeUserImg,
} = require("./controller/User.controller");

//category
const {
  getAllCategories,
  addNewCategory,
} = require("./controller/Category.controller");

//realestate
const {
  registerNewRealestate,
  fetchAllRealestates,
  deleteOneRealestate,
  addRealestateImg,
  getUserRealestate,
  fetchRealestateImg,
  fetchOneRealestate,
} = require("./controller/Realestate.controller");

//message
const {
  addMessage,
  fetchMessage,
  deleteOneMessage,
} = require("./controller/Message.controller");

const {
  searchRealestate,
  newSearchAll,
} = require("./controller/Search.controller");
app.use(express.json());
app.use(cors());

//category
app.get("/categories", getAllCategories);
app.post("/add/category", addNewCategory);

//User
app.post("/user/register", registerUser);
app.post("/user/login", loginUser);
app.put("/user/changeImg", changeUserImg);
app.put("/user/ban", banUserPermanently);
app.get("/getAllUsers", getAllUsers);

//RealEstate
app.post("/realestate/add", registerNewRealestate);
app.get("/getAllRealestates", fetchAllRealestates);
app.delete("/realestate/delete", deleteOneRealestate);
app.post("/realestate/addRealestateImg", addRealestateImg);
app.get("/getUserRealestate", getUserRealestate);
app.get("/realestate/getImg", fetchRealestateImg);

//Messagge
app.post("/message/send", addMessage);
app.get("/message/get", fetchMessage);
app.delete("/message/delete", deleteOneMessage);

app.get("/getRealestatePaige", fetchOneRealestate);
app.get("/search", searchRealestate);
app.get("/searchAll", newSearchAll);

app.listen(PORT, () => {
  console.log(`app started on port: ${PORT}`);
});
