import {
    Send
} from "lucide-react";
import Sidebar from './Sidebar';
import { useState } from "react";
import Home from "./Home";
import CreatePost from "./CreatePost";

const Layout = () => {
    const [activePage, setActivePage] = useState('Home')
    const renderPage = () => {
        switch (activePage) {
            case 'Home':
                return <Home />
            case 'Create':
                return <CreatePost onClose={setActivePage} />
            default:
                return <Home />
        }
    }
    return (
        <div className="bg-black text-white min-h-screen flex">
            {/* Use your existing sidebar component */}
            <div className="fixed left-0 top-0 h-full z-10">
                <Sidebar onChange={setActivePage} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 mr-80">
                {renderPage()}
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