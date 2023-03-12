const db = require('../db/models/index')
let getHello = async(req,res) => {
    let message = "hello";
    res.json({message})
}

let getAllUser = async(req,res) => {
    let users = await db.user.findAll();
    res.json({users});
}

let createUser = async(req,res) => {
    try {
        const {name} = req.body;
        console.log(name);
        const jane = await db.user.create({name: `"${name}"`});
        res.json({status:jane.id?'success':'error'});
    } catch (error) {
        console.log(error)
    }
}

let getHi = async(req,res) => {
    let message = "hi";
    res.json({message})
}

module.exports = {
    getHello,
    getHi,
    getAllUser,
    createUser
}