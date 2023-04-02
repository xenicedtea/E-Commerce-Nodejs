const jwt = require('jsonwebtoken');
require('dotenv').config();
const {ACCESS_TOKEN_SECRET} = process.env;
let getUserIdFromToken = async(token) => {
  try {
    const decoded = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    return decoded.userId;
  } catch (err) {
    return null;
  }
}

module.exports = {
  getUserIdFromToken,
}