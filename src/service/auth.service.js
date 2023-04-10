const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../db/models/index')
const userUtil = require('../util/user.util')
const { Op } = require('sequelize');
const {SALT_ROUNDS, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRESIN, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRESIN} = process.env
let register = async(name, email, password) => {
  //check exist
  const existingUser = await db.users.findOne({
    where: {
      email: {
        [Op.eq]: email
      }
    }
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash password before save to db
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
    // Mã hóa mật khẩu sử dụng bcrypt
  const hashedPassword = await bcrypt.hash(password, salt);

  // save to db
  const user = await db.users.create({
    name: name,
    email: email,
    password: hashedPassword
  });

  return {
    name:user.name,
    email:user.email,
  };
}

let login = async(email, password) => {
  //check exist
  const existingUser = await db.users.findOne({
    where: {
      email: {
        [Op.eq]: email
      }
    },raw:true
  });
  if (!existingUser) {
    throw new Error('Account not found');
  }

  // compare password
  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    throw new Error('Incorrect password');
  }

  // gen Token
  const accesstoken = jwt.sign({ userId: existingUser.id, role: existingUser.admin}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRESIN});
  const refreshToken = jwt.sign({ userId: existingUser.id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRESIN });
   
  // Return user and token
  userResult = existingUser;
  return  {
            user:{
              name:userResult.name,
              email:userResult.email
            },
            token:{
              access_token:accesstoken,
              refresh_token:refreshToken
            }
          };
}

let refreshToken = async(token) => {
    // decode
    const decode = jwt.verify(token, REFRESH_TOKEN_SECRET)
    // get user
    const user = await db.users.findOne({
      where:{
        id:decode.userId
      },raw:true
    })
    const accesstoken = jwt.sign({ userId: user.id, role: user.admin}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRESIN});
    return accesstoken
}
module.exports = {
  register,
  login,
  refreshToken,
};