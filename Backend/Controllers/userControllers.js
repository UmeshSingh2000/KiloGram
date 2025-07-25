const User = require('../Database/Models/userSchema');
const { hashPassword } = require('../Utils/password');

const userRegister = async (req, res) => {
    try {
        let { name, userName, password, email } = req.body;

        //trim inputs
        name = name?.trim();
        userName = userName?.trim();
        email = email?.trim();
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
        
    } catch (error) {
        console.error('Error in user Login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    userRegister
}