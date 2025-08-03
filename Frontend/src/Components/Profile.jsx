import { Bookmark, Camera, Grid, MessageCircle, Plus, Settings, User } from 'lucide-react'
import React from 'react'

const Profile = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            {/* Top Header */}
            <div className="flex items-center justify-between p-4">
                <div className="text-gray-400 text-sm">Note...</div>
                <div className="flex items-center space-x-4">
                    <span className="text-xl font-normal">uhhh_mesh</span>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm font-medium">
                        Edit profile
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm font-medium">
                        View archive
                    </button>
                    <Settings className="w-6 h-6 cursor-pointer" />
                </div>
            </div>

            {/* Profile Section */}
            <div className="px-8 py-8">
                <div className="flex items-start space-x-16">
                    {/* Profile Picture */}
                    <div className="flex-shrink-0">
                        <div className="w-36 h-36 bg-gray-600 rounded-full flex items-center justify-center relative">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                <Camera className="w-10 h-10 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Stats and Info */}
                    <div className="flex-1 pt-4">
                        <div className="flex items-center space-x-12 mb-8">
                            <div className="text-center">
                                <div className="text-2xl font-light">0</div>
                                <div className="text-gray-400 text-sm">posts</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-light">16</div>
                                <div className="text-gray-400 text-sm">followers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-light">14</div>
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
