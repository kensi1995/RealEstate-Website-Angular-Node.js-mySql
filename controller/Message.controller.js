const {
  sendMessage,
  getMessage,
  deleteMessage,
} = require("../repository/Message.repository");

const addMessage = async (req, res) => {
  try {
    const message = req.body;
    const response = await sendMessage(message);
    console.log("Message is added", response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const fetchMessage = async (req, res) => {
  try {
    const toUserId = req.query.toUser;
    // console.log("Fetch toUserId controler je", toUserId);
    const response = await getMessage(toUserId);
    // console.log("Message is added", response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteOneMessage = async (req, res) => {
  try {
    const messId = req.query.messageId;
    const response = await deleteMessage(messId);
    console.log("Message is deleted", response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addMessage,
  fetchMessage,
  deleteOneMessage,
};
