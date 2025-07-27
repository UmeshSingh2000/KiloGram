
import {
    MoreHorizontal,
    Bookmark,
    MessageCircle,
    Share,
    VolumeX,
    Heart,
    Send
} from "lucide-react";
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="bg-black text-white min-h-screen flex">
            {/* Use your existing sidebar component */}
            <div className="fixed left-0 top-0 h-full z-10">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 mr-80">
                <div className="max-w-lg mx-auto py-8">
                    {/* Post 1 */}
                    <div className="mb-8">
                        {/* Post Header */}
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold">H</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-sm">hubbri.e</span>
                                    <span className="text-blue-500 ml-1">✓</span>
                                </div>
                            </div>
                            <MoreHorizontal size={20} />
                        </div>

                        {/* Post Image */}
                        <div className="bg-gray-800 aspect-square rounded-lg mb-4 relative">
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <span>Post Image</span>
                            </div>
                            <div className="absolute top-4 right-4">
                                <VolumeX size={20} className="text-white" />
                            </div>
                        </div>

                        {/* Post Actions */}
                        <div className="flex items-center justify-between px-4 mb-3">
                            <div className="flex items-center space-x-4">
                                <Heart size={24} strokeWidth={1.5} className="hover:text-red-500 cursor-pointer" />
                                <MessageCircle size={24} strokeWidth={1.5} className="hover:text-gray-300 cursor-pointer" />
                                <Share size={24} strokeWidth={1.5} className="hover:text-gray-300 cursor-pointer" />
                            </div>
                            <Bookmark size={24} strokeWidth={1.5} className="hover:text-gray-300 cursor-pointer" />
                        </div>

                        {/* Post Info */}
                        <div className="px-4">
                            <p className="font-semibold text-sm mb-2">12,093 likes</p>
                            <p className="text-sm">
                                <span className="font-semibold">hubbri.e</span>
                                <span className="text-blue-500 ml-1">✓</span>
                                <span className="ml-2">Studies suggest that the average human can hold their breath for about 30-90 seconds, but trained individuals or those...</span>
                                <span className="text-gray-400 ml-1 cursor-pointer hover:text-gray-300">more</span>
                            </p>
                            <p className="text-gray-400 text-sm mt-2 cursor-pointer hover:text-gray-300">View all 77 comments</p>
                            <div className="flex items-center mt-3">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="bg-transparent text-sm flex-1 outline-none placeholder-gray-400"
                                />
                                <span className="text-gray-400 cursor-pointer hover:text-gray-300">😊</span>
                            </div>
                        </div>
                    </div>

                    {/* Post 2 */}
                    <div className="mb-8">
                        {/* Post Header */}
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">I</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold text-sm">indiatoday</span>
                                    <span className="text-blue-500 ml-1">✓</span>
                                    <span className="text-gray-400 ml-2">• 1d</span>
                                    <button className="text-blue-500 ml-2 text-sm font-semibold hover:text-blue-400">Follow</button>
                                </div>
                            </div>
                            <MoreHorizontal size={20} className="cursor-pointer hover:text-gray-300" />
                        </div>

                        {/* Post Image - Supreme Court Building */}
                        <div className="bg-gray-800 aspect-square rounded-lg mb-4 relative">
                            <div className="w-full h-full bg-gradient-to-b from-blue-200 to-blue-100 rounded-lg flex items-center justify-center">
                                <div className="w-3/4 h-3/4 bg-white rounded-full relative">
                                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-1/2 h-1/2 bg-red-300 rounded-t-full"></div>
                                    <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/4 bg-red-400"></div>
                                </div>
                            </div>
                        </div>

                        {/* Post Actions */}
                        <div className="flex items-center justify-between px-4 mb-3">
                            <div className="flex items-center space-x-4">
                                <Heart size={24} strokeWidth={1.5} className="hover:text-red-500 cursor-pointer" />
                                <MessageCircle size={24} strokeWidth={1.5} className="hover:text-gray-300 cursor-pointer" />
                                <Share size={24} strokeWidth={1.5} className="hover:text-gray-300 cursor-pointer" />
                            </div>
                            <Bookmark size={24} strokeWidth={1.5} className="hover:text-gray-300 cursor-pointer" />
                        </div>

                        {/* Post Info */}
                        <div className="px-4">
                            <p className="font-semibold text-sm mb-2">8,547 likes</p>
                            <p className="text-sm">
                                <span className="font-semibold">indiatoday</span>
                                <span className="text-blue-500 ml-1">✓</span>
                                <span className="ml-2">Supreme Court of India building showcasing the architectural beauty...</span>
                                <span className="text-gray-400 ml-1 cursor-pointer hover:text-gray-300">more</span>
                            </p>
                            <p className="text-gray-400 text-sm mt-2 cursor-pointer hover:text-gray-300">View all 124 comments</p>
                            <div className="flex items-center mt-3">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="bg-transparent text-sm flex-1 outline-none placeholder-gray-400"
                                />
                                <span className="text-gray-400 cursor-pointer hover:text-gray-300">😊</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages Panel */}
            <div className="w-80 fixed right-0 h-full bg-black border-l border-gray-800 p-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Messages</h2>
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                    </div>
                </div>

                <div className="text-center text-gray-400 mt-20">
                    <Send size={40} className="mx-auto mb-4 opacity-50" />
                    <p>Your messages</p>
                    <p className="text-sm mt-2">Send private photos and messages to a friend or group.</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 text-sm hover:bg-blue-600 transition-colors">
                        Send message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Layout;