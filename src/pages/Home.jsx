import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Video,
  Bookmark,
  Calendar,
  Settings,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share2,
  Image,
  Smile,
  Globe,
  Plus,
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- MOCK DATA ---
const currentUser = {
  name: "Jessica Smith",
  avatarInitial: "JS",
  profileLink: "#",
};

const shortcuts = [
  { icon: Users, label: "Friends", count: 5 },
  { icon: MessageSquare, label: "Messenger", count: 3 },
  { icon: Video, label: "Watch", count: 0 },
  { icon: Bookmark, label: "Saved", count: 0 },
  { icon: Calendar, label: "Events", count: 1 },
];

const mockStories = [
  { id: 1, user: "Elon Musk", initial: "EM", isUser: false, imageColor: "bg-blue-600/70" },
  { id: 2, user: "Jeff Bezos", initial: "JB", isUser: false, imageColor: "bg-green-500/70" },
  { id: 3, user: "Bill Gates", initial: "BG", isUser: false, imageColor: "bg-red-500/70" },
  { id: 4, user: "Oprah Winfrey", initial: "OW", isUser: false, imageColor: "bg-purple-500/70" },
];

const mockPosts = [
  {
    id: 1,
    user: "Mark Z.",
    initial: "MZ",
    time: "2h ago",
    content: "Just finished coding the next big feature! Exciting times ahead. Focusing on community connection and performance improvements.",
    image: null,
    likes: 1540,
    comments: 320,
    shares: 89,
    avatarColor: "bg-indigo-500"
  },
  {
    id: 2,
    user: "SpaceX Official",
    initial: "SX",
    time: "1 day ago",
    content: "Starship launch successful! Taking humanity one step closer to Mars. 🚀 We are proud of the team's dedication.",
    image: "placeholder_space", // Indicates an image should be displayed
    likes: 54000,
    comments: 12000,
    shares: 5100,
    avatarColor: "bg-red-700"
  },
];

// --- COMPONENTS ---

const Avatar = ({ initial, color, size = 'md', isStory = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  }[size];

  return (
    <div
      className={`relative rounded-full font-bold flex items-center justify-center text-white shrink-0 ${color} ${sizeClasses} ${isStory ? 'border-4 border-blue-500' : ''}`}
    >
      {initial}
    </div>
  );
};

const StoryCard = ({ story }) => {
  const isCurrentUserStory = story.isUser;
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`relative h-52 w-32 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 flex-shrink-0
        ${isCurrentUserStory ? 'bg-white border border-gray-200' : 'text-white'}`}
    >
      {/* Background/Image Placeholder */}
      <div className={`absolute inset-0 bg-cover bg-center ${isCurrentUserStory ? 'bg-gray-100' : story.imageColor} transition-opacity duration-300 hover:opacity-100`}>
        {/* Mock background pattern if not current user story */}
        {!isCurrentUserStory && (
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
        )}
      </div>

      {isCurrentUserStory ? (
        <div className="flex flex-col items-center justify-end h-full p-3 relative">
          <div className="relative mb-2 -mt-10">
            <Avatar initial={story.initial} color="bg-blue-600" size="lg" />
            <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full border-4 border-gray-100">
              <Plus className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-gray-800 font-semibold text-sm text-center">Create Story</p>
        </div>
      ) : (
        <>
          {/* Story User Avatar */}
          <div className="absolute top-3 left-3">
            <Avatar initial={story.initial} color="bg-white text-gray-800" size="md" isStory={true} />
          </div>
          {/* User Name */}
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-white text-sm font-semibold truncate">{story.user}</p>
          </div>
        </>
      )}
    </motion.div>
  );
};

const CreatePostWidget = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-6 border border-gray-100">
      {/* Top Input Area */}
      <div className="flex items-center border-b border-gray-200 pb-3 mb-3">
        <Avatar initial={user.avatarInitial} color="bg-gray-500" size="lg" />
        <input
          type="text"
          placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
          className="flex-grow ml-3 p-2.5 bg-gray-100 rounded-full focus:outline-none placeholder-gray-500 text-gray-800 transition duration-150 cursor-pointer hover:bg-gray-200"
        />
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex justify-around items-center pt-1">
        <button className="flex items-center text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition duration-150 w-1/3 justify-center">
          <Video className="w-6 h-6 text-red-500 mr-2" />
          <span className="font-medium text-sm hidden sm:inline">Live Video</span>
        </button>
        <button className="flex items-center text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition duration-150 w-1/3 justify-center">
          <Image className="w-6 h-6 text-green-500 mr-2" />
          <span className="font-medium text-sm hidden sm:inline">Photo/Video</span>
        </button>
        <button className="flex items-center text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition duration-150 w-1/3 justify-center">
          <Smile className="w-6 h-6 text-yellow-500 mr-2" />
          <span className="font-medium text-sm hidden sm:inline">Feeling</span>
        </button>
      </div>
    </div>
  );
};

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);

  const formatCount = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md mb-6 border border-gray-100"
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar initial={post.initial} color={post.avatarColor} size="lg" />
          <div className="ml-3">
            <p className="font-bold text-gray-900 hover:underline cursor-pointer">{post.user}</p>
            <div className="flex items-center text-xs text-gray-500">
                <span>{post.time}</span>
                <Globe className="w-3 h-3 ml-1" />
            </div>
          </div>
        </div>
        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4 text-gray-800">
        <p>{post.content}</p>
      </div>

      {/* Post Image/Placeholder */}
      {post.image && (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 font-bold border-y border-gray-200">
          Photo/Video Placeholder
        </div>
      )}

      {/* Stats */}
      <div className="flex justify-between items-center px-4 pt-3 pb-2 text-gray-500 text-sm border-b border-gray-100">
        <div className="flex items-center">
          <ThumbsUp className="w-4 h-4 text-blue-500 fill-blue-500 mr-1" />
          <span className='font-semibold'>{formatCount(post.likes + (liked ? 1 : 0))}</span>
        </div>
        <div className="flex space-x-3">
          <span className='hover:underline cursor-pointer'>{formatCount(post.comments)} Comments</span>
          <span className='hover:underline cursor-pointer'>{formatCount(post.shares)} Shares</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex justify-around p-1">
        <button
          onClick={handleLike}
          className={`flex items-center w-full justify-center p-2 rounded-lg hover:bg-gray-100 transition duration-150 ${liked ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
        >
          <ThumbsUp className={`w-5 h-5 mr-2 ${liked ? 'fill-blue-600 text-blue-600' : 'text-gray-700'}`} />
          Like
        </button>
        <button className="flex items-center w-full justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150">
          <MessageCircle className="w-5 h-5 mr-2" />
          Comment
        </button>
        <button className="flex items-center w-full justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150">
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </button>
      </div>
    </motion.div>
  );
};


const LeftSidebar = () => {
    return (
        <div className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] overflow-y-auto hidden lg:block p-3 custom-scrollbar">
            <div className="flex flex-col space-y-1 pr-2">
                {/* User Profile Link */}
                <a href={currentUser.profileLink} className="flex items-center p-2 rounded-lg hover:bg-gray-200 transition duration-150">
                    <Avatar initial={currentUser.avatarInitial} color="bg-gray-500" size="md" />
                    <span className="ml-3 font-semibold text-gray-800">{currentUser.name}</span>
                </a>
                
                {/* Shortcuts */}
                {shortcuts.map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition duration-150"
                    >
                        <item.icon className="w-6 h-6 text-blue-600 shrink-0" />
                        <span className="ml-3 font-medium truncate">{item.label}</span>
                        {item.count > 0 && (
                            <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-2 py-0.5">{item.count}</span>
                        )}
                    </a>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-gray-500 font-semibold mb-2 ml-2 text-sm">More</h3>
                 <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition duration-150">
                    <Settings className="w-6 h-6 text-gray-500 shrink-0" />
                    <span className="ml-3 font-medium truncate">Settings & Privacy</span>
                </a>
            </div>
            <div className="p-2 mt-10 text-xs text-gray-500">
                Privacy · Terms · Advertising · Cookies · Facebook Clone © 2024
            </div>
        </div>
    );
}

const RightSidebar = () => {
    const contacts = [
        { name: "Bill Gates", initial: "BG", color: "bg-red-400", online: true },
        { name: "Elon Musk", initial: "EM", color: "bg-purple-400", online: false },
        { name: "Jane Doe", initial: "JD", color: "bg-green-400", online: true },
        { name: "The Rock", initial: "TR", color: "bg-yellow-400", online: true },
        { name: "Taylor Swift", initial: "TS", color: "bg-pink-400", online: false },
        { name: "Leo Messi", initial: "LM", color: "bg-cyan-400", online: true },
    ];

    return (
        <div className="fixed top-16 right-0 w-72 h-[calc(100vh-64px)] overflow-y-auto hidden xl:block p-3 custom-scrollbar">
            {/* Sponsored Section */}
            <div className="mb-6 border-b border-gray-200 pb-4">
                <h3 className="text-gray-500 font-semibold mb-3">Sponsored</h3>
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:bg-gray-50 transition cursor-pointer">
                    <div className="w-full h-24 bg-blue-100 mb-2 flex items-center justify-center text-blue-600 font-bold text-sm rounded-md">React Mastery Course</div>
                    <p className="text-sm font-semibold">Learn Advanced Hooks Today!</p>
                    <p className="text-xs text-gray-500">learnreact.io</p>
                </div>
            </div>

            {/* Contacts Section */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-gray-500 font-semibold">Contacts</h3>
                    <div className="flex space-x-2 text-gray-500">
                        <Video className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                        <MessageSquare className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                        <MoreHorizontal className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                    </div>
                </div>

                {contacts.map((contact, index) => (
                    <div
                        key={index}
                        className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition duration-150"
                    >
                        <div className="relative">
                            <Avatar initial={contact.initial} color={contact.color} size="md" />
                            {contact.online && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                        </div>
                        <span className="ml-3 text-gray-800 font-medium">{contact.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen pt-16">
            <div className="max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* 1. Left Sidebar (Fixed, LG+) */}
                    <div className="hidden lg:col-span-3 xl:col-span-3 lg:block">
                        <LeftSidebar />
                    </div>

                    {/* 2. Main Feed (Center Column) */}
                    {/* Centered column structure adapted for responsiveness */}
                    <main className="col-span-1 lg:col-span-9 xl:col-span-6 lg:ml-64 xl:ml-0 flex justify-center">
                        <div className="w-full max-w-xl px-4 py-6 sm:px-0">
                            
                            {/* Stories Carousel */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold mb-3 text-gray-800 hidden sm:block">Stories</h2>
                                {/* Note: We use an external utility class 'scrollbar-hide' for a cleaner look, assuming it's configured. */}
                                <div className="flex space-x-3 pb-2 overflow-x-scroll scrollbar-hide">
                                    {/* Current User Story (Create Story) */}
                                    <StoryCard story={{ ...currentUser, initial: currentUser.avatarInitial, isUser: true, imageColor: "bg-blue-100" }} />
                                    {/* Mock Stories */}
                                    {mockStories.map(story => (
                                        <StoryCard key={story.id} story={story} />
                                    ))}
                                </div>
                            </div>

                            {/* Create Post Widget */}
                            <CreatePostWidget user={currentUser} />

                            {/* Feed */}
                            <h2 className="text-xl font-bold mb-4 text-gray-800">News Feed</h2>
                            {mockPosts.map(post => (
                                <PostCard key={post.id} post={post} />
                            ))}
                            
                            <div className="text-center py-10 text-gray-500">
                                <p>Loading more posts...</p>
                            </div>
                        </div>
                    </main>

                    {/* 3. Right Sidebar (Fixed, XL+) */}
                    <div className="hidden xl:col-span-3 xl:block">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;