import {
  Home,
  Search,
  Compass,
  Play,
  Send,
  Heart,
  Plus,
  User,
  Menu,
  Grid3X3
} from "lucide-react";

export default function Sidebar({ onChange }) {
  const menuItems = [
    { icon: Home, label: "Home" },
    { icon: Search, label: "Search" },
    { icon: Compass, label: "Explore" },
    { icon: Play, label: "Reels" },
    { icon: Send, label: "Messages" },
    { icon: Heart, label: "Notifications" },
    { icon: Plus, label: "Create" },
    { icon: User, label: "Profile" },
  ];

  return (
    <div className="bg-black text-white w-64 h-screen p-4 flex flex-col">
      {/* Instagram Logo */}
      <div className="mb-8 mt-4">
        <h1 className="text-white font-bold text-4xl">KiloGram</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                href="#"
                className="flex items-center space-x-4 px-3 py-3 w-full cursor-pointer rounded-lg hover:bg-gray-800 transition-colors duration-200"
                onClick={() => onChange(item.label)}
              >
                <item.icon size={24} strokeWidth={1.5} />
                <span className="text-base font-normal">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Menu Items */}
      <div className="mt-auto space-y-1">
        <a
          href="#"
          className="flex items-center space-x-4 px-3 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <Menu size={24} strokeWidth={1.5} />
          <span className="text-base font-normal">More</span>
        </a>

        <a
          href="#"
          className="flex items-center space-x-4 px-3 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <Grid3X3 size={24} strokeWidth={1.5} />
          <span className="text-base font-normal">Also from Meta</span>
        </a>
      </div>
    </div>
  );
}