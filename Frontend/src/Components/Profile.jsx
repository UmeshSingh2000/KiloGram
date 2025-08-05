import { Bookmark, Camera, Grid, MessageCircle, Plus, Settings, User } from 'lucide-react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { updateUserProfile } from '../Service/userService'
import Loader from './Loader/Loader'
import optimise from '../helpers/getOptimisedImageUrl'


const Profile = () => {
    const imageSelectorRef = useRef(null)
    const [imageFile, setImageFile] = useState(null)
    const { user } = useSelector((state) => state?.auth)

    const handleImageClick = () => {
        imageSelectorRef.current.click()
    }

    const handleFileChange = (e) => {
        const selectedImage = e.target.files[0]
        if (selectedImage) {
            setImageFile(selectedImage)
            updateProfilePicture(selectedImage)
        }
    }

    const updateProfilePicture = async (selectedImage) => {
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);
            const res = await updateUserProfile(formData);
        } catch (error) {
            console.log(error)
        }
    }

    if (!user) {
        return <Loader />
    }

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Profile Section */}
            <div className="px-8 py-8">
                <div className="flex items-start space-x-10">
                    {/* Profile Picture */}
                    {user.profilePicture ? (
                        <div className="relative group w-36 h-36">
                            <img
                                src={optimise(user.profilePicture, 300)}
                                alt="Profile"
                                className="w-36 h-36 object-cover rounded-full border-2 border-gray-700 group-hover:brightness-75 transition duration-200"
                            />
                            <div
                                onClick={handleImageClick}
                                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                            <input
                                accept="image/*"
                                onChange={(e) => handleFileChange(e)}
                                ref={imageSelectorRef}
                                type="file"
                                className="hidden"
                            />
                        </div>
                    ) : (
                        <div
                            className="w-36 h-36 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer group relative"
                            onClick={handleImageClick}
                        >
                            <Camera className="w-10 h-10 text-gray-400 group-hover:text-white transition" />
                            <input
                                accept="image/*"
                                onChange={(e) => handleFileChange(e)}
                                ref={imageSelectorRef}
                                type="file"
                                className="hidden"
                            />
                        </div>
                    )}


                    {/* Stats and Info */}
                    <div className="flex-1 pt-4">
                        <div className='flex gap-5'>
                            <span className="text-xl font-normal">{user.userName}</span>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm font-medium">
                                Edit profile
                            </button>
                            <Settings className="w-6 h-6 cursor-pointer" />
                        </div>
                        <div className="flex items-center space-x-12 mb-8 mt-6">
                            <div className="text-center flex items-center gap-2">
                                <div className="text-md font-bold">{user.noOfPosts}</div>
                                <div className="text-gray-400 text-sm">posts</div>
                            </div>
                            <div className="text-center flex items-center gap-2">
                                <div className="text-md font-bold">{user.followers.length}</div>
                                <div className="text-gray-400 text-sm">followers</div>
                            </div>
                            <div className="text-center flex items-center gap-2">
                                <div className="text-md font-bold">{user.followings.length}</div>
                                <div className="text-gray-400 text-sm">following</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Post Button */}
                <div className="mt-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
                            <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <span className="text-gray-400 text-sm">New</span>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-t border-gray-800">
                <div className="flex justify-center">
                    <div className="flex space-x-20 py-3">
                        <div className="flex flex-col items-center cursor-pointer border-t-2 border-white pt-3 -mt-3">
                            <Grid className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col items-center cursor-pointer pt-3">
                            <Bookmark className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex flex-col items-center cursor-pointer pt-3">
                            <User className="w-6 h-6 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Photos Section */}
            <div className="flex flex-col items-center py-20">
                <div className="w-20 h-20 border-2 border-gray-500 rounded-full flex items-center justify-center mb-6">
                    <Camera className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-3xl font-light mb-4">Share Photos</h2>
                <p className="text-gray-400 text-center">
                    When you share photos, they will appear on your profile.
                </p>
            </div>
        </div>
    )
}

export default Profile
