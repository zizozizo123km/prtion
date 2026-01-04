import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Store,
  Calendar,
  Clock3,
  MonitorPlay,
  Group,
  ChevronDown,
  ChevronUp,
  Save,
  Briefcase,
  Gamepad2,
  Settings,
  HelpCircle,
} from 'lucide-react';

// Placeholder user data
const USER_PROFILE = {
  name: 'Jane Doe',
  avatarUrl: '/path/to/user/avatar.jpg', // Placeholder
};

// Primary navigation links
const NAV_LINKS = [
  { icon: Users, label: 'Friends', path: '/friends' },
  { icon: Group, label: 'Groups', path: '/groups' },
  { icon: Store, label: 'Marketplace', path: '/marketplace' },
  { icon: MonitorPlay, label: 'Watch', path: '/watch' },
  { icon: Clock3, label: 'Memories', path: '/memories' },
  { icon: Save, label: 'Saved', path: '/saved' },
  { icon: Calendar, label: 'Events', path: '/events' },
];

// Short list of shortcuts for demonstration
const SHORTCUTS = [
  { icon: Briefcase, label: 'Jobs', path: '/jobs' },
  { icon: Gamepad2, label: 'Gaming Video', path: '/gaming' },
  { icon: Settings, label: 'Settings & Privacy', path: '/settings' },
];

const SidebarItem = ({ Icon, label, path, isUser = false }) => {
  const IconComponent = Icon;

  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      className="p-2 rounded-lg cursor-pointer transition-colors"
    >
      <Link to={path} className="flex items-center space-x-3 text-base font-medium text-gray-700">
        {isUser ? (
          <img
            src={USER_PROFILE.avatarUrl}
            alt={label}
            className="w-8 h-8 rounded-full object-cover bg-gray-300"
          />
        ) : (
          <div className="w-8 h-8 flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-blue-500" />
          </div>
        )}
        <span className="truncate">{label}</span>
      </Link>
    </motion.div>
  );
};

const Sidebar = () => {
  const [showMore, setShowMore] = useState(false);

  // We split the NAV_LINKS to show only a few initially
  const visibleLinks = NAV_LINKS.slice(0, 5);
  const hiddenLinks = NAV_LINKS.slice(5);

  const handleToggleMore = () => {
    setShowMore(!showMore);
  };

  const Divider = () => <hr className="my-2 border-t border-gray-200 mx-2" />;

  return (
    <div className="hidden lg:block w-[280px] fixed top-[56px] left-0 bottom-0 overflow-y-auto px-2 py-4 custom-scrollbar">
      <nav>
        {/* User Profile Link */}
        <SidebarItem
          Icon={null}
          label={USER_PROFILE.name}
          path="/profile"
          isUser={true}
        />

        {/* Primary Links */}
        {visibleLinks.map((link) => (
          <SidebarItem
            key={link.label}
            Icon={link.icon}
            label={link.label}
            path={link.path}
          />
        ))}

        {/* See More/Less Button */}
        {(NAV_LINKS.length > 5 || showMore) && (
          <SidebarItem
            Icon={showMore ? ChevronUp : ChevronDown}
            label={showMore ? 'See Less' : 'See More'}
            path="#"
            IconComponent={showMore ? ChevronUp : ChevronDown}
            onClick={handleToggleMore}
          />
        )}
        
        {/* Hidden Links (Expanded View) */}
        <motion.div
          initial={false}
          animate={{ height: showMore ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          {hiddenLinks.map((link) => (
            <SidebarItem
              key={link.label}
              Icon={link.icon}
              label={link.label}
              path={link.path}
            />
          ))}
        </motion.div>

        <Divider />

        {/* Shortcuts Section */}
        <h3 className="text-gray-500 font-semibold text-sm px-4 pt-2 pb-1">Your Shortcuts</h3>
        {SHORTCUTS.map((link) => (
          <SidebarItem
            key={link.label}
            Icon={link.icon}
            label={link.label}
            path={link.path}
          />
        ))}

        <Divider />
        
        {/* Footer Links (Settings, Help) */}
        <SidebarItem Icon={HelpCircle} label="Help & Support" path="/help" />
        <SidebarItem Icon={Settings} label="Settings & Privacy" path="/settings" />

        {/* Copyright Footer */}
        <footer className="mt-4 text-xs text-gray-500 px-4 pb-10">
          <p>Privacy · Terms · Advertising · Ad Choices · Cookies · Facebook © 2024</p>
        </footer>
      </nav>
    </div>
  );
};

export default Sidebar;
// Note on custom-scrollbar: In a real project, this class would define browser-specific styles to hide or customize the scrollbar appearance.