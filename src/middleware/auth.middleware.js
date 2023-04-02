const jwt = require('jsonwebtoken');
const db = require('../db/models/index')
require('dotenv').config();
const {ACCESS_TOKEN_SECRET} = process.env
let checkAuthorization = async (req, res, next) => {
  // Lấy token từ header Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    // Nếu không có token, trả về lỗi 401 Unauthorized
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Giải mã token
    const decoded = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await db.user.findOne({
      where:{
        id: decoded.userId
      }, raw:true
    })
    if(user){
      next();
    }else{
      throw new Error("")
    }
  } catch (error) {
    // Nếu giải mã không thành công, trả về lỗi 401 Unauthorized
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

let checkAuthorizationAdmin = async (req, res, next) => {
  // Lấy token từ header Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    // Nếu không có token, trả về lỗi 401 Unauthorized
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Giải mã token
    const decoded = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await db.user.findOne({
      where:{
        id: decoded.userId
      }, raw:true
    })
    if(user){
      if(user.admin === 1 && decoded.role === 1){
        next();
      }
      else{
        return res.status(403).json({ message: 'You are unauthorized to access this API' });
      }
    }else{
      throw new Error("")
    }
  } catch (error) {
    // Nếu giải mã không thành công, trả về lỗi 401 Unauthorized
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = {
    checkAuthorization,
    checkAuthorizationAdmin
}