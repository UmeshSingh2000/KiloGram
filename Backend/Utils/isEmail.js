const regex = /^\S+@\S+\.\S+$/

const isEmail = (email) => {
    return regex.test(email)
}

module.exports = isEmail