const userService = require('../service/user.service')
const jwt = require('jsonwebtoken');
let changePassword = async(req,res,next) => {
	try {
		// get variable
		const authHeader = req.headers.authorization;
  		const token = authHeader && authHeader.split(' ')[1];
		const {old_password, new_password} = req.body;
		// change password
		const result = await userService.changePassword(old_password, new_password,token);
		res.json({
			success:true,
			message:result
		})
	} catch (error) {
		if(error.message === 'Incorrect password'){
            return res.status(400).send({ message: 'Incorect password'});
		}
		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).send({ message: 'Token has expired'});
		}
		next(error)
	}
}


module.exports = {
	changePassword
}
