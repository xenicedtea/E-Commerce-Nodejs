const { checkAuthorization } = require('../middleware/auth.middleware');
const authService = require('../service/auth.service')
const jwt = require('jsonwebtoken');
let register = async (req, res,next) => {
    try {
        const { name, email, password } = req.body;
        // check null
        if (!name || !email || !password){
            throw new Error('Missing value!');
        }
        // register
        const user = await authService.register(name, email, password);
        // return success
        res.json({
          success: true,
          message: 'Đăng ký tài khoản thành công',
          data: user
        });
    } catch (error) {
        if (error.message === 'Email already exists') {
            return res.status(409).json({ message: 'Email already exists' });
        }
        if (error.message === 'Missing value!') {
            return res.status(422).json({ message: 'Please provide all the required information to create an account.' });
        }
        next(error);
    }
}

let login = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        // check null
        if (!email || !password){
            throw new Error('Missing value!');
        }
        
        //check login
        const result = await authService.login(email,password);
        
        res.json({
            success:true,
            message: "Login success",
            data: result
        })
    } catch (error) {
        if (error.message === 'Account not found') {
            return res.status(404).send({ message: 'Account not found' });
        }
        if (error.message === 'Missing value!') {
            return res.status(422).json({ message: 'Please provide all the required information to login an account.' });
        }
        if (error.message === 'Incorrect password') {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        next(error);
    }
}

let refreshAccessToken = async(req,res,next) => {
    try {
        const authHeader = req.headers.authorization;
        const refreshToken = authHeader && authHeader.split(" ")[1];
        const access_token = await authService.refreshToken(refreshToken);
        res.json({
            success:true,
            data:{
                token:{
                    access_token:access_token
                }
            }
        })
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).send({ message: 'Token has expired'});
		}
        next(error);
    }
}

module.exports = {
    register,
    login,
    refreshAccessToken
}
