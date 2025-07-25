const bcrypt = require('bcrypt')
const hashPassword = async(password)=>{
    try {
        if(!password){
            throw new Error('Password is Required!')
        }
        let saltRound = 10;
        return await bcrypt.hash(password,saltRound);
    } catch (error) {
        throw error
    }
}

const comparePassword = async(password,hashedPassword)=>{
    try {
        if(!password || !hashedPassword){
            throw new Error('Password is Required!')
        }
        return bcrypt.compare(password,hashedPassword);
    } catch (error) {
        throw error
    }
}
module.exports = {
    hashPassword,
    comparePassword
}