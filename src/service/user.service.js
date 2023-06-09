const db = require('../db/models/index')
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
require('dotenv').config();
const {SALT_ROUNDS, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env
let  changePassword = async (oldPassword,newPassword,token) => {
    // check exist
    if(!oldPassword || !newPassword){
        throw new Error("Missing value!")
    }

    // decode get user
    const decoded = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await db.users.findOne({
        where:  {
                    id: decoded.userId
                },
        raw: true
    });

    // compare password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    // If password is incorrect, throw an error
    if (!passwordMatch) {
        throw new Error('Incorrect password');
    }

    // update new password

    // hash password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // update
    const message = await  db.users.update(
        {
            password:hashedPassword
        },
        {
            where:user
        }
    )
    // return user
    return { message: 'Password updated successfully'};
}

module.exports = {
    changePassword
}