const User = require('../Database/Models/userSchema');
const { generateToken, generateRefreshToken } = require('../Utils/generateToken');
const isEmail = require('../Utils/isEmail');
const { hashPassword, comparePassword } = require('../Utils/password');
const StatusCodes = require('../Utils/statusCodes');


const userRegister = async (req, res) => {
    try {
        let { name, userName, password, email } = req.body;

        //trim inputs
        name = name?.trim();
        userName = userName?.trim();
        email = email?.trim().toLowerCase();
        if (!name || !userName || !password || !email) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields Required!" });
        }
        if (password.length < 6) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password must be at least 6 Character long' })
        }

        //check if the email is already exist
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email already exist" })
        }
        //check if the userName is already exist
        const userNameExist = await User.findOne({ userName })
        if (userNameExist) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Username already exist" })
        }

        //hash password
        const hashedPass = await hashPassword(password)
        const newUser = new User({
            name,
            userName,
            email,
            password: hashedPass
        })
        await newUser.save()
        res.status(StatusCodes.CREATED).json({ message: "Account created Successfully" })
    } catch (error) {
        console.error('Error in user registration:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(StatusCodes.BAD_REQUEST).json({ errors });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error || 'Internal Server Error' });
    }
}

const userLogin = async (req, res) => {
    try {
        const { identifier, password } = req.body // identifier can be email || username
        if (!identifier || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "All field Required!" });
        }
        const email = isEmail(identifier)
        const query = email ? { email: identifier.trim().toLowerCase() } : { userName: identifier.trim() }

        const user = await User.findOne(query);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: `User does Not exist with this ${email ? 'Email' : 'UserName'}` })
        }
        const passMatch = await comparePassword(password, user.password)
        if (!passMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Password is incorrect" });
        }
        // generate token
        const token = generateToken(user._id);
        const refresh = generateRefreshToken(user._id)
        res.cookie('token', token, {
            httpOnly:true,
            maxAge: 15 * 60 * 1000, // 15 mint
            
        })
        res.cookie('refreshToken', refresh, {
            httpOnly:true,
            maxAge: 15 * 24 * 60 * 60 * 1000 // 15day
        })


        const { password: _p, __v, ...userData } = user.toObject();

        res.status(StatusCodes.OK).json({ message: "Login Successfull", user: userData })
    } catch (error) {
        console.error('Error in user Login:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
}

const refreshToken = (req, res) => {
    try {
        const token = generateToken(req.user.id)
        res.cookie('token', token, {
            httpOnly:true,
            maxAge: 15 * 60 * 1000 // 15 mint
        })
        res.status(200).json({ message: "Access token refreshed" });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    userRegister,
    userLogin,
    refreshToken
}