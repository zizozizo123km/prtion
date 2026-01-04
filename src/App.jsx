import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, LogIn, UserPlus } from 'lucide-react';

// --- MOCK COMPONENTS AND CONTEXT (Assume these are defined elsewhere in a real project) ---

// Mock Auth Hook
const useAuth = () => ({ 
  // NOTE: Set isAuthenticated to false to test the redirect to /login
  isAuthenticated: true, 
  user: { id: 1, name: 'Senior Dev' },
  loading: false 
}); 

// Mock Navigation/Layout Components
const Navbar = () => (
    <header className="bg-white shadow-md p-3 fixed w-full top-0 z-50 flex justify-between items-center px-4 md:px-6 h-16">
        <h1 className="text-3xl font-extrabold text-blue-600 font-sans tracking-tight cursor-pointer">
            فيسبوك
        </h1>
        {/* Search bar placeholder */}
        <div className="hidden md:block w-96">
            <input 
                type="text" 
                placeholder="Search Facebook..." 
                className="w-full p-2 bg-gray-100 rounded-full border-0 focus:ring-2 focus:ring-blue-300 transition"
            />
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"><Home size={22} /></button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"><User size={22} /></button>
            <img 
                src="https://via.placeholder.com/40" 
                alt="Profile" 
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
            />
        </div>
    </header>
);

const Sidebar = () => (
    <aside className="w-64 fixed top-16 h-[calc(100vh-64px)] bg-white border-r p-4 hidden lg:block z-40 overflow-y-auto">
        <nav className="space-y-2">
            <a href="/" className="flex items-center p-3 text-blue-600 font-semibold bg-blue-50 rounded-lg transition hover:bg-blue-100">
                <Home className="mr-3" size={20} /> Feed
            </a>
            <a href="/profile/1" className="flex items-center p-3 hover:bg-gray-100 rounded-lg transition">
                <User className="mr-3" size={20} /> My Profile
            </a>
            <hr className="my-2 border-gray-200" />
            <div className="text-sm font-semibold text-gray-500 pt-2">Your Shortcuts</div>
            {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center p-3 text-sm hover:bg-gray-100 rounded-lg cursor-pointer transition">
                    <img src={`https://via.placeholder.com/20?text=G${i+1}`} className="rounded-md mr-3" alt="" />
                    Group Name {i + 1}
                </div>
            ))}
        </nav>
    </aside>
);

// Mock Pages
const LoginPage = () => (
    <div className="w-full max-w-sm bg-white p-8 shadow-xl rounded-xl">
        <h2 className="text-4xl font-bold text-blue-600 mb-6 text-center">Login to فيسبوك</h2>
        <input type="text" placeholder="Email or Phone" className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" />
        <input type="password" placeholder="Password" className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" />
        <motion.button 
            whileHover={{ scale: 1.01 }} 
            whileTap={{ scale: 0.99 }} 
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-150 shadow-md"
        >
            <LogIn className="inline mr-2" size={20} /> Log In
        </motion.button>
        <div className="mt-4 text-center">
            <a href="/signup" className="text-sm text-green-500 hover:underline">Create New Account</a>
        </div>
    </div>
);
const SignupPage = () => (
    <div className="w-full max-w-sm bg-white p-8 shadow-xl rounded-xl text-center">
        <h2 className="text-4xl font-bold text-green-500 mb-6">Create Account</h2>
        <p className="mb-4">It's quick and easy.</p>
         <motion.button 
            whileHover={{ scale: 1.05 }} 
            className="w-full bg-green-500 text-white p-3 rounded-lg font-bold hover:bg-green-600 transition"
        >
            <UserPlus className="inline mr-2" size={20} /> Sign Up Now
        </motion.button>
    </div>
);

const PostCard = ({ title, content }) => (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200"
    >
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <p className="text-gray-600 mt-2">{content}</p>
        <div className="mt-4 flex justify-between text-sm text-blue-500">
            <span>Like</span>
            <span>Comment</span>
            <span>Share</span>
        </div>
    </motion.div>
);

const FeedPage = () => (
    <div className="max-w-xl mx-auto space-y-4">
        <PostCard title="Welcome Back!" content="Your daily dose of social connection starts here. What's on your mind?" />
        <PostCard title="React Development Update" content="Just finished integrating Framer Motion for smooth page transitions. The UX is significantly improved!" />
        <PostCard title="Senior Dev Milestone" content="One step closer to launch! Keep pushing those commits." />
    </div>
);

const ProfilePage = () => (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
            <img src="https://via.placeholder.com/150" alt="Avatar" className="w-32 h-32 rounded-full border-4 border-white absolute bottom-[-40px] left-8" />
        </div>
        <div className="p-8 pt-16">
            <h2 className="text-4xl font-bold text-gray-800">Senior React Developer</h2>
            <p className="text-gray-500 mt-1">Building the modern web.</p>
            <div className="mt-6">
                <PostCard title="Profile Post 1" content="Setting up the architecture is crucial for a scalable Facebook clone." />
            </div>
        </div>
    </div>
);

// ----------------------------------------------------------------------------


// Protected Layout Wrapper
const MainLayout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="pt-16 flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-4 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};


// Protected Route HOC
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); 

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-xl text-blue-600">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

// Framer Motion Page Transition Wrapper
const PageTransition = ({ children }) => {
    const variants = {
        initial: { opacity: 0, y: 15, scale: 0.98 },
        in: { opacity: 1, y: 0, scale: 1 },
        out: { opacity: 0, y: -15, scale: 0.98 }
    };
    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ type: "tween", duration: 0.3 }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};


// Main Router Component managing transitions
const RouterManager = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                
                {/* Public Routes */}
                <Route 
                    path="/login" 
                    element={
                        <div className="flex items-center justify-center min-h-screen bg-gray-100">
                            <PageTransition><LoginPage /></PageTransition>
                        </div>
                    } 
                />
                
                <Route 
                    path="/signup" 
                    element={
                         <div className="flex items-center justify-center min-h-screen bg-gray-100">
                            <PageTransition><SignupPage /></PageTransition>
                        </div>
                    } 
                />

                {/* Protected Routes */}
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <PageTransition><FeedPage /></PageTransition>
                        </ProtectedRoute>
                    } 
                />
                
                <Route 
                    path="/profile/:userId" 
                    element={
                        <ProtectedRoute>
                            <PageTransition><ProfilePage /></PageTransition>
                        </ProtectedRoute>
                    } 
                />

                {/* Default redirect for unknown paths */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
}


const App = () => {
  return (
    // Context providers (e.g., AuthProvider, ThemeProvider) would typically wrap the Router
    <Router>
        <RouterManager />
    </Router>
  );
};

export default App;