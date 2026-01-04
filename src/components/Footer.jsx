import React from 'react';

const LANGUAGE_LINKS = [
    'English (US)',
    'Español',
    'Français (France)',
    'العربية',
    'Português (Brasil)',
    'Deutsch',
    'Italiano',
    '한국어',
    '日本語',
    '简体中文',
];

const UTILITY_LINKS = [
    'Sign Up',
    'Log In',
    'Messenger',
    'Facebook Lite',
    'Video',
    'Places',
    'Games',
    'Marketplace',
    'Meta Pay',
    'Meta Store',
    'Meta Quest',
    'Instagram',
    'Threads',
    'Fundraisers',
    'Services',
    'Voting Information Center',
    'Privacy Policy',
    'Privacy Center',
    'Groups',
    'About',
    'Create Ad',
    'Create Page',
    'Developers',
    'Careers',
    'Cookies',
    'Ad Choices',
    'Terms',
    'Help',
    'Contact Uploading & Non-Users',
    'Settings',
];

const Footer = () => {
    return (
        <footer className="w-full bg-white text-gray-500 border-t border-gray-200 mt-6 md:mt-10 pt-4 pb-8 text-xs">
            <div className="max-w-4xl mx-auto px-4">
                
                {/* Language Links Section */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                    {LANGUAGE_LINKS.map((link, index) => (
                        <a key={index} href="#" className="hover:underline">
                            {link}
                        </a>
                    ))}
                    <button 
                        className="bg-gray-100 border border-gray-300 w-5 h-5 flex items-center justify-center text-gray-700 font-bold rounded-sm hover:bg-gray-200"
                        title="More Languages"
                    >
                        +
                    </button>
                </div>

                {/* Separator */}
                <hr className="my-3 border-gray-200" />

                {/* Utility Links Section */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                    {UTILITY_LINKS.map((link, index) => (
                        <a key={index} href="#" className="hover:underline">
                            {link}
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <div className="text-gray-500 mt-4">
                    Meta © 2024
                </div>
            </div>
        </footer>
    );
};

export default Footer;