import axios from "axios"
import StatusCodes from "../helpers/statusCodes"

const api = import.meta.env.VITE_BACKEND_API
const createPost = async (formData, token) => {
    try {
        if (!formData || !formData.content) {
            return {
                status: StatusCodes.NO_CONTENT,
                message: "All fields are required!"
            }
        }
        if (!token) {
            return {
                status: StatusCodes.UNAUTHORIZED,
                message: 'No token provided'
            }
        }
        const res = await axios.post(`${api}/createPost`,
            formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === StatusCodes.CREATED) {
            return {
                status: StatusCodes.CREATED,
                message: res.data.message
            }
        }

    } catch (error) {
        throw new Error(error.response?.data?.message);
    }
}

export { createPost }