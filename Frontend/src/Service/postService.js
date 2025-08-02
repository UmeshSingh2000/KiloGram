
import StatusCodes from "../helpers/statusCodes"
import api from "../helpers/axios"

const createPost = async (formData) => {
    try {
        if (!formData || !formData.get('content')) {
            return {
                status: StatusCodes.NO_CONTENT,
                message: "All fields are required!"
            }
        }

        const res = await api.post('/post/createPost', formData)
        if (res.status === StatusCodes.CREATED) {
            return {
                status: StatusCodes.CREATED,
                message: res.data.message,
                post: res.data.post
            }
        }

    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.message || "Internal Server Error");
    }
}

const getMypost = async () => {
    try {
        const res = await api.get('/post/getMyPosts')
        if (res.status === StatusCodes.OK) {
            return res.data
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.message || "Internal Server Error");
    }
}

const toggleLike = async (id) => {
    try {
        const res = await api.post(`/post/postLikeToggle/${id}`)
        if (res.status === StatusCodes.OK) {
            return {
                status: StatusCodes.OK,
                message: res.data.message
            }
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.message || "Internal Server Error");
    }
}


export { createPost, getMypost, toggleLike }