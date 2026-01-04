import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Home, Users, Clapperboard, ShoppingBag, Group, MessageSquare, Bell,
    ChevronDown, Plus, Search, Image, Smile, Mic, ThumbsUp, MessageCircle,
    Share2, Globe, Heart, MoreHorizontal, User, Rss, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---

const currentUser = {
    id: 1,
    name: 'Jane Doe',
    avatar: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=JD',
};

const navigationItems = [
    { icon: Users, label: 'Friends', href: '/friends' },
    { icon: Rss, label: 'Feeds (All)', href: '/feeds' },
    { icon: Group, label: 'Groups', href: '/groups' },
    { icon: ShoppingBag, label: 'Marketplace', href: '/marketplace' },
    { icon: Clapperboard, label: 'Watch', href: '/watch' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

const mockStories = [
    { id: 1, user: 'Alex H.', image: 'https://picsum.photos/200/300?random=1', isMine: true },
    { id: 2, user: 'Maria K.', image: 'https://picsum.photos/200/300?random=2', isMine: false },
    { id: 3, user: 'John S.', image: 'https://picsum.photos/200/300?random=3', isMine: false },
    { id: 4, user: 'Sarah M.', image: 'https://picsum.photos/200/300?random=4', isMine: false },
    { id: 5, user: 'Tech Hub', image: 'https://picsum.photos/200/300?random=5', isMine: false },
];

const mockPosts = [
    {
        id: 101,
        user: { name: 'Mark Zuckerberg', avatar: 'https://via.placeholder.com/150/1877F2/FFFFFF?text=MZ' },
        timestamp: '1 hour ago',
        content: "Exciting progress being made on our new AI models! Building the metaverse foundation stronger every day. #Meta #AI",
        image: 'https://picsum.photos/800/450?random=6',
        likes: 2500,
        comments: 320,
        shares: 55,
    },
    {
        id: 102,
        user: { name: 'Sarah Connor', avatar: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=SC' },
        timestamp: '5 hours ago',
        content: "Just finished a killer workout! Feeling the burn and loving the energy boost. Consistency is key! 💪",
        image: null,
        likes: 120,
        comments: 15,
        shares: 2,
    },
    {
        id: 103,
        user: { name: 'Facebook Developers', avatar: 'https://via.placeholder.com/150/000000/FFFFFF?text=FB' },
        timestamp: '1 day ago',
        content: "Don't forget to check out the latest updates to the Graph API v18. Performance improvements across the board!",
        image: 'https://picsum.photos/800/400?random=7',
        likes: 800,
        comments: 90,
        shares: 10,
    },
];

const mockContacts = [
    { id: 1, name: 'Alice Smith', avatar: 'https://via.placeholder.com/150/FFC0CB/000000?text=AS', isActive: true },
    { id: 2, name: 'Bob Johnson', avatar: 'https://via.placeholder.com/150/ADD8E6/000000?text=BJ', isActive: false },
    { id: 3, name: 'Charlie Day', avatar: 'https://via.placeholder.com/150/F08080/000000?text=CD', isActive: true },
    { id: 4, name: 'Diana Prince', avatar: 'https://via.placeholder.com/150/90EE90/000000?text=DP', isActive: true },
    { id: 5, name: 'Ethan Hunt', avatar: 'https://via.placeholder.com/150/DDA0DD/000000?text=EH', isActive: false },
];

// --- Sub Components ---

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    return (
        <motion.div
            className="bg-white rounded-xl shadow-md mb-4 p-4 lg:p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-100" src={post.user.avatar} alt={post.user.name} />
                    <div>
                        <p className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">{post.user.name}</p>
                        <span className="text-xs text-gray-500 flex items-center">{post.timestamp} &middot; <Globe className="w-3 h-3 ml-1" /></span>
                    </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>

            {/* Content */}
            <p className="text-gray-700 mb-3 whitespace-pre-wrap">{post.content}</p>

            {post.image && (
                <div className="mt-3 -mx-4 lg:-mx-5">
                    <img className="w-full object-cover max-h-[500px]" src={post.image} alt="Post content" />
                </div>
            )}

            {/* Stats */}
            <div className="flex justify-between items-center text-gray-500 text-sm mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4 text-blue-500 fill-blue-500" />
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span>{likeCount}</span>
                </div>
                <div>
                    <span>{post.comments} Comments</span> &middot; <span>{post.shares} Shares</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-around border-t border-gray-100 mt-2 pt-2">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLike}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${liked ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    <ThumbsUp className={`w-5 h-5 mr-2 ${liked ? 'fill-blue-600' : ''}`} />
                    Like
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Comment
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                </motion.button>
            </div>
        </motion.div>
    );
};

const StatusUpdater = ({ user }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 mb-5">
            <div className="flex items-center pb-3 border-b border-gray-100">
                <img className="w-10 h-10 rounded-full object-cover mr-3" src={user.avatar} alt={user.name} />
                <input
                    type="text"
                    placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
                    className="flex-grow bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    onClick={() => alert('Opening post composer... (Mock action)')}
                />
            </div>
            <div className="flex justify-around pt-3">
                <motion.button
                    whileHover={{ backgroundColor: '#F0F2F5' }}
                    className="flex items-center text-red-500 p-2 rounded-lg transition-colors text-sm font-medium"
                >
                    <Clapperboard className="w-5 h-5 mr-2" />
                    Live Video
                </motion.button>
                <motion.button
                    whileHover={{ backgroundColor: '#F0F2F5' }}
                    className="flex items-center text-green-500 p-2 rounded-lg transition-colors text-sm font-medium"
                >
                    <Image className="w-5 h-5 mr-2" />
                    Photo/Video
                </motion.button>
                <motion.button
                    whileHover={{ backgroundColor: '#F0F2F5' }}
                    className="flex items-center text-yellow-600 p-2 rounded-lg transition-colors text-sm font-medium hidden sm:flex"
                >
                    <Smile className="w-5 h-5 mr-2" />
                    Feeling/Activity
                </motion.button>
            </div>
        </div>
    );
};

const StoryCard = ({ story }) => {
    const isMine = story.isMine;
    return (
        <motion.div
            className={`w-28 h-48 rounded-xl relative overflow-hidden shadow-md flex-shrink-0 cursor-pointer transition-transform duration-300 ${isMine ? 'border-2 border-blue-500' : ''}`}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            style={{ backgroundImage: `url(${story.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition duration-300"></div>

            {isMine ? (
                <div className="absolute top-2 left-2 bg-white rounded-full p-2 text-blue-600 border-4 border-white shadow-md">
                    <Plus className="w-5 h-5" />
                </div>
            ) : (
                <img
                    src={story.user.startsWith('Alex') ? currentUser.avatar : `https://via.placeholder.com/100/AAAAAA/FFFFFF?text=${story.user.charAt(0)}`}
                    alt={story.user}
                    className="w-10 h-10 rounded-full object-cover absolute top-2 left-2 border-4 border-blue-500"
                />
            )}

            <span className="absolute bottom-2 left-2 text-white text-sm font-semibold truncate max-w-[90%]">
                {isMine ? 'Create Story' : story.user}
            </span>
        </motion.div>
    );
};

const StoriesSection = () => {
    // Modify first story to be the current user's creation story
    const storiesWithMine = [
        { id: 0, user: currentUser.name, image: currentUser.avatar, isMine: true },
        ...mockStories.filter(s => s.id !== 1).map(s => ({ ...s, image: s.image, user: s.user }))
    ];

    return (
        <div className="flex space-x-3 overflow-x-scroll scrollbar-hide mb-5 p-1">
            {storiesWithMine.map((story) => (
                <StoryCard key={story.id} story={story} />
            ))}
        </div>
    );
};


const SidebarItem = ({ icon: Icon, label, href, isBlue = false }) => (
    <Link to={href} className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
        <Icon className={`w-6 h-6 mr-3 ${isBlue ? 'text-blue-500' : 'text-gray-600'}`} />
        <span className="text-gray-700 font-medium">{label}</span>
    </Link>
);

const LeftSidebar = () => {
    return (
        <div className="hidden lg:block w-72 fixed h-full overflow-y-auto pt-4 pb-20 scrollbar-hide">
            <div className="px-2">
                {/* User Profile Link */}
                <SidebarItem
                    icon={User}
                    label={currentUser.name}
                    href="/profile"
                    isBlue={true}
                />

                {/* Navigation Links */}
                <div className="mt-2 space-y-1">
                    {navigationItems.map(item => (
                        <SidebarItem key={item.label} {...item} />
                    ))}
                    <motion.div
                        className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-700 font-medium"
                        whileHover={{ x: 5 }}
                    >
                        <ChevronDown className="w-6 h-6 mr-3 bg-gray-200 p-1 rounded-full" />
                        See More
                    </motion.div>
                </div>

                {/* Shortcuts/Divider */}
                <div className="border-t border-gray-200 mt-4 pt-4">
                    <h3 className="text-md text-gray-500 font-semibold px-2 mb-2">Your Shortcuts</h3>
                    {/* Placeholder for groups/pages */}
                    <SidebarItem icon={Group} label="React Developers" href="/group/react" />
                    <SidebarItem icon={Home} label="Local News" href="/news" />
                </div>
            </div>
        </div>
    );
};

const ContactItem = ({ contact }) => (
    <motion.div
        whileHover={{ backgroundColor: '#F0F2F5' }}
        className="flex items-center p-2 rounded-lg cursor-pointer transition-colors"
    >
        <div className="relative mr-3">
            <img className="w-9 h-9 rounded-full object-cover" src={contact.avatar} alt={contact.name} />
            {contact.isActive && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
        </div>
        <span className="text-gray-700 font-medium text-sm">{contact.name}</span>
    </motion.div>
);

const RightSidebar = () => {
    return (
        <div className="hidden xl:block w-72 fixed right-0 h-full overflow-y-auto pt-4 pb-20 scrollbar-hide">
            <div className="px-2">
                {/* Sponsored Ads (Mock) */}
                <div className="pb-4 border-b border-gray-200 mb-4">
                    <h3 className="text-md text-gray-500 font-semibold px-2 mb-2">Sponsored</h3>
                    <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
                        <img src="https://picsum.photos/300/100?random=ad1" alt="Ad" className="rounded-lg mb-2" />
                        <p className="text-sm font-semibold">New Coffee Subscription!</p>
                        <p className="text-xs text-blue-500">coffee.com</p>
                    </div>
                </div>

                {/* Contacts */}
                <div className="pt-2">
                    <div className="flex justify-between items-center px-2 mb-2">
                        <h3 className="text-md text-gray-500 font-semibold">Contacts</h3>
                        <div className="flex space-x-2 text-gray-500">
                            <MessageSquare className="w-5 h-5 cursor-pointer hover:text-gray-800" />
                            <Search className="w-5 h-5 cursor-pointer hover:text-gray-800" />
                            <MoreHorizontal className="w-5 h-5 cursor-pointer hover:text-gray-800" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        {mockContacts.map(contact => (
                            <ContactItem key={contact.id} contact={contact} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Dashboard Component ---

const Dashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen pt-4">
            <div className="max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_600px_280px] gap-6">

                {/* Left Sidebar (fixed) */}
                <aside className="hidden lg:block">
                    <LeftSidebar />
                </aside>

                {/* Center Feed */}
                <main className="col-span-1 lg:col-span-2 xl:col-span-1 mx-auto w-full max-w-[600px] px-3 md:px-0">
                    <StoriesSection />
                    <StatusUpdater user={currentUser} />

                    {/* Feed Posts */}
                    {mockPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </main>

                {/* Right Sidebar (fixed) */}
                <aside className="hidden xl:block">
                    <RightSidebar />
                </aside>

            </div>
        </div>
    );
};

export default Dashboard;

// Simple scrollbar hide utility (optional, often included in global CSS)
// .scrollbar-hide::-webkit-scrollbar { display: none; }
// .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }