// authentication related servies
import { toast } from 'react-hot-toast'
import axios from 'axios'
import StatusCodes from '../helpers/statusCodes';
const api = import.meta.env.VITE_BACKEND_API

const loginUser = async ({ identifier, password }) => {
    try {
        //trim extra spaces
        identifier = identifier.trim();
        password = password.trim();

        if (!identifier || !password) {
            toast.error('All Fields Required!')
            return {
                status : StatusCodes.NO_CONTENT
            }
        }
        const response = await axios.post(`${api}/userLogin`, {
            identifier,
            password
        })
        if (response.status === 200) {
            toast.success(response.data.message)
            return {
                status: StatusCodes.OK,
                token: response.data.token
            }
        }
    } catch (error) {
        // console.log(error.response?.data?.message || 'Something Wrong');
        throw new Error(error.response?.data?.message);
    }
}

export { loginUser }