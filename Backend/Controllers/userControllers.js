const User = require('../Database/Models/userSchema');
const generateToken = require('../Utils/generateToken');
const isEmail = require('../Utils/isEmail');
const { hashPassword, comparePassword } = require('../Utils/password');

const userRegister = async (req, res) => {
    try {
        let { name, userName, password, email } = req.body;

        //trim inputs
        name = name?.trim();
        userName = userName?.trim();
        email = email?.trim().toLowerCase();
        if (!name || !userName || !password || !email) {
            return res.status(400).json({ message: "All fields Required!" });
        }

        //check if the email is already exist
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: "Email already exist" })
        }
        //check if the userName is already exist
        const userNameExist = await User.findOne({ userName })
        if (userNameExist) {
            return res.status(400).json({ message: "Username already exist" })
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
        res.status(201).json({ message: "Account created Successfully" })
    } catch (error) {
        console.error('Error in user registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const userLogin = async (req, res) => {
    try {
        const { identifier, password } = req.body // identifier can be email || username
        if (!identifier || !password) {
            return res.status(400).json({ message: "All field Required!" });
        }
        const email = isEmail(identifier)
        const query = email ? { email: identifier.trim().toLowerCase() } : { userName: identifier.trim() }

        const user = await User.findOne(query);
        if (!user) {
            return res.status(404).json({ message: `User does Not exist with this ${email ? 'Email' : 'UserName'}` })
        }
        const passMatch = await comparePassword(password, user.password)
        if (!passMatch) {
            return res.status(401).json({ message: "Password is incorrect" });
        }
        // generate token
        const token = generateToken(user._id);
        res.status(200).json({ message: "Login Successfull", token })
    } catch (error) {
        console.error('Error in user Login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    userRegister,
    userLogin
}