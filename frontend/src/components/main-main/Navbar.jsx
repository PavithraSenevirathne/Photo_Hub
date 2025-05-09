import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  NotebookText,
  TrendingUp,
  CircleUserRound,
  LogOut,
  BadgeCheck,
  X,
  LayoutDashboard,
  Settings,
  HelpCircle,
  Search
} from 'lucide-react';
import logo from '../../assets/skillsync-logo.jpg';

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const navigateToHome = () => {
    navigate('/home');
    setSidebarOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  return (
    <div className="relative">
      <nav className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center h-16 px-6">
            <div className="flex items-center space-x-4">
              <img
                src={logo}
                alt="SkillSync Logo"
                className="h-12 w-12 cursor-pointer hover:opacity-80"
                onClick={toggleSidebar}
              />
              <h1
                className="text-2xl font-bold text-purple-300 cursor-pointer hover:text-purple-500"
                onClick={navigateToHome}
              >
                PhotoHub
              </h1>
            </div>

            <div className="flex-1 flex items-center justify-start pl-[25%]">
              <div className="flex items-center space-x-8">
                <div className="relative group">
                  <button
                    onClick={toggleSearch}
                    className="p-2 rounded-full hover:bg-zinc-800"
                  >
                    <Search className="w-7 h-7 text-zinc-300 group-hover:text-purple-400" />
                  </button>
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm text-white bg-zinc-700 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Search
                  </span>
                </div>

                <div className="relative group">
                  <button
                    onClick={() => navigate('/s')}
                    className="p-2 rounded-full hover:bg-zinc-800"
                  >
                    <Send className="w-7 h-7 text-zinc-300 group-hover:text-purple-400" />
                  </button>
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm text-white bg-zinc-700 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Skill Posts
                  </span>
                </div>

                <div className="relative group">
                  <button
                    onClick={() => navigate('/courses')}
                    className="p-2 rounded-full hover:bg-zinc-800"
                  >
                    <NotebookText className="w-7 h-7 text-zinc-300 group-hover:text-purple-400" />
                  </button>
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm text-white bg-zinc-700 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Learning Plans
                  </span>
                </div>

                <div className="relative group">
                  <button
                    onClick={() => navigate('/progress')}
                    className="p-2 rounded-full hover:bg-zinc-800"
                  >
                    <TrendingUp className="w-7 h-7 text-zinc-300 group-hover:text-purple-400" />
                  </button>
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm text-white bg-zinc-700 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Learning Progress
                  </span>
                </div>
              </div>
            </div>

            <div className="ml-auto">
              <button
                onClick={toggleDropdown}
                className="p-2 rounded-full hover:bg-zinc-800"
              >
                <CircleUserRound className="w-7 h-7 text-zinc-300 hover:text-purple-400" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <button
                      onClick={() => navigate('/profile')}
                      className="w-full text-left px-4 py-2 hover:bg-zinc-700 flex items-center gap-2 text-zinc-300"
                    >
                      <BadgeCheck className="w-4 h-4 text-purple-300" />
                      <span>View Profile</span>
                    </button>
                    <button
                      onClick={() => navigate('/update')}
                      className="w-full text-left px-4 py-2 hover:bg-zinc-700 text-zinc-300"
                    >
                      Update Profile
                    </button>
                    <hr className="my-2 border-zinc-600" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-zinc-700 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showSearch && (
        <div className="absolute top-16 left-0 w-full bg-zinc-900 shadow-lg z-40 border-b border-zinc-800">
          <div className="max-w-3xl mx-auto py-4 px-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 pl-10 bg-zinc-800 border border-zinc-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <Search className="w-5 h-5 text-zinc-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <button
                onClick={toggleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {sidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-zinc-900 border-r border-zinc-800 shadow-lg p-6 z-40">
          <h2 className="text-xl font-bold text-purple-300 mb-6">Menu</h2>
          <ul className="space-y-4">
            <li
              className="flex items-center space-x-3 text-zinc-300 hover:text-purple-400 cursor-pointer p-2 rounded-lg hover:bg-zinc-800"
              onClick={navigateToHome}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </li>
            <li className="flex items-center space-x-3 text-zinc-300 hover:text-purple-400 cursor-pointer p-2 rounded-lg hover:bg-zinc-800">
              <Send className="w-5 h-5" />
              <span>My Posts</span>
            </li>
            <li className="flex items-center space-x-3 text-zinc-300 hover:text-purple-400 cursor-pointer p-2 rounded-lg hover:bg-zinc-800">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </li>
            <li className="flex items-center space-x-3 text-zinc-300 hover:text-purple-400 cursor-pointer p-2 rounded-lg hover:bg-zinc-800">
              <HelpCircle className="w-5 h-5" />
              <span>Help</span>
            </li>
          </ul>
          <button
            className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            onClick={toggleSidebar}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
