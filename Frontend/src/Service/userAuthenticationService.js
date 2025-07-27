// authentication related servies
import axios from 'axios'
import StatusCodes from '../helpers/statusCodes';
const api = import.meta.env.VITE_BACKEND_API


const loginUser = async ({ identifier, password }) => {
    try {
        //trim extra spaces
        identifier = identifier.trim();
        password = password.trim();

        if (!identifier || !password) {
            return {
                message: 'All fields are required!',
                status: StatusCodes.NO_CONTENT
            }
        }
        const response = await axios.post(`${api}/userLogin`, {
            identifier,
            password
        })
        if (response.status === StatusCodes.OK) {
            return {
                message: response.data.message,
                status: StatusCodes.OK,
                token: response.data.token
            }
        }
    } catch (error) {
        // console.log(error.response?.data?.message || 'Something Wrong');
        throw new Error(error.response?.data?.message);
    }
}


const registerUser = async ({ name, email, password, userName }) => {
    try {
        //trim extra spaces
        name = name.trim()
        email = email.trim().toLowerCase()
        password = password.trim();
        userName = userName.trim()

        if (!name || !email || !password || !userName) {
            return {
                status: StatusCodes.NO_CONTENT,
                message: 'All Fields Required!'
            }
        }

        const response = await axios.post(`${api}/userRegister`, {
            name, email, password, userName
        })
        if (response.status === StatusCodes.CREATED) {
            return {
                status: StatusCodes.CREATED,
                message: response.data.message
            }
        }

    } catch (error) {
        // const message =
        //     error.response.data.errors ||
        //     error.response.data.message
        // console.log(error.response.data.errors)
        throw {
            response: {
                data: {
                    errors: error.response?.data?.errors || [error.response?.data?.message || "Something went wrong"]
                }
            }
        };
    }
}

const checkUserAuth = async (token) => {
    const response = await axios.get(`${api}/auth-check`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export {
    loginUser,
    registerUser,
    checkUserAuth
}