import React, { useState } from 'react';
import {
  Search,
  Home,
  Users,
  Store,
  Tv,
  Gamepad2,
  Plus,
  MessageCircle,
  Bell,
  User,
  Facebook,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Utility component for circular action buttons (right side)
const ActionButton = ({ icon: Icon }) => (
  <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition-colors duration-150 ml-2">
    <Icon className="w-6 h-6 text-gray-800" />
  </div>
);

// Navigation link component (center section)
const NavLink = ({ icon: Icon, active, href = '#' }) => {
  const baseClasses = 'flex items-center justify-center h-14 w-32 relative cursor-pointer';
  const iconClasses = active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700 transition-colors duration-150';
  const borderClasses = active
    ? 'border-b-4 border-blue-600 rounded-sm'
    : 'hover:bg-gray-100 rounded-lg';

  return (
    <Link to={href} className={`${baseClasses} group ${borderClasses}`}>
      <Icon className={`w-7 h-7 ${iconClasses}`} />
    </Link>
  );
};

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock user data for profile display
  const user = {
    avatarUrl: 'https://via.placeholder.com/32/3b82f6/ffffff?text=U', // Placeholder for user avatar
    name: 'User',
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-14 bg-white shadow-md px-4">
      {/* Left Section (Logo and Search) */}
      <div className="flex items-center space-x-2">
        {/* Facebook Logo (Blue) */}
        <Link to="/">
          <Facebook className="w-10 h-10 text-blue-600 fill-blue-600" />
        </Link>
        
        {/* Search Bar (Rounded, Gray background) */}
        <div className="relative flex items-center bg-gray-100 rounded-full px-3 py-1.5 ml-2 max-w-[240px] hidden sm:flex">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Facebook"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent focus:outline-none text-sm text-gray-800 w-full"
          />
        </div>
        
        {/* Mobile Search Button */}
        <div className="sm:hidden flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full cursor-pointer ml-2">
            <Search className="w-5 h-5 text-gray-800" />
        </div>
      </div>

      {/* Center Section (Navigation Icons) */}
      <nav className="hidden md:flex flex-1 justify-center space-x-1">
        <NavLink icon={Home} active href="/" />
        <NavLink icon={Tv} href="/watch" />
        <NavLink icon={Store} href="/marketplace" />
        <NavLink icon={Users} href="/groups" />
        <NavLink icon={Gamepad2} href="/gaming" />
      </nav>

      {/* Right Section (User Actions and Profile) */}
      <div className="flex items-center">
        
        {/* User Profile Shortcut (Desktop/Tablet) */}
        <Link to="/profile" className="hidden lg:flex items-center p-1 pr-3 rounded-full hover:bg-gray-200 transition-colors duration-150 cursor-pointer">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
          <span className="font-semibold text-sm text-gray-800">{user.name}</span>
        </Link>

        {/* Action Buttons */}
        <ActionButton icon={Plus} />
        <ActionButton icon={MessageCircle} />
        <ActionButton icon={Bell} />
        
        {/* Profile Menu/User Avatar */}
        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition-colors duration-150 ml-2">
            <User className="w-6 h-6 text-gray-800 lg:hidden" /> {/* Show User icon on mobile/tablet */}
            <img 
                src={user.avatarUrl} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover hidden lg:block" 
            /> {/* Show full avatar on large screens */}
        </div>
      </div>
    </header>
  );
};

export default Header;
// NOTE: To display the actual profile picture, replace the placeholder URL 
// in `user.avatarUrl` with a dynamic source (e.g., fetched from state/context).
// For the final Facebook aesthetic, the logo usually requires custom SVGs, 
// but using the Lucide Facebook icon provides a good stand-in.