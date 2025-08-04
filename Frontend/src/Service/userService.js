import StatusCodes from '../helpers/statusCodes';
import api from '../helpers/axios';

const updateUserProfile = async (formData) => {
    try {
        const res = await api.put('/user/updateProfile', formData)
        if (res.status === 200) {
            console.log(res)
        }
    } catch (error) {
        console.log(error)
    }
}

export {
    updateUserProfile
}