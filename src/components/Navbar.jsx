import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import AuthContext from '../auth/auth-context';
import ThemeToggle from './ThemeToggle';
import Badge from './Badge';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const logged = auth.isLoggedIn;

    // Mock notification count - replace with actual data
    const notificationCount = 3;

    const handleLogout = () => {
        auth.logout();
        setIsMenuOpen(false);
        navigate("/");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-soft transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <img 
                            src={logo} 
                            className="h-10 w-auto transition-transform duration-300 group-hover:scale-110" 
                            alt="Restaurant Logo" 
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            to="/" 
                            className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group"
                        >
                            الرئيسية
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link 
                            to="/menu" 
                            className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group"
                        >
                            القائمة
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link 
                            to="/plans" 
                            className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group"
                        >
                            الباقات
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        {logged && (
                            <Badge count={notificationCount} color="red" size="sm">
                                <Link 
                                    to="/profile" 
                                    className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group"
                                >
                                    حسابي
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </Badge>
                        )}
                    </div>

                    {/* Theme Toggle and Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        {logged ? (
                            <button
                                onClick={handleLogout}
                                className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-glow-red"
                            >
                                تسجيل خروج
                            </button>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-glow-green"
                                >
                                    تسجيل الدخول
                                </Link>
                                <Link
                                    to="/signUp"
                                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 border border-primary-600 dark:border-primary-400 hover:border-primary-700 dark:hover:border-primary-300 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                                >
                                    إنشاء حساب
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <button
                            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
                        <div className="flex flex-col space-y-2">
                            <Link
                                to="/"
                                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                الرئيسية
                            </Link>
                            <Link
                                to="/menu"
                                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                القائمة
                            </Link>
                            <Link
                                to="/plans"
                                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                الباقات
                            </Link>
                            {logged && (
                                <div className="flex items-center">
                                    <Badge count={notificationCount} color="red" size="sm">
                                        <Link
                                            to="/profile"
                                            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            حسابي
                                        </Link>
                                    </Badge>
                                </div>
                            )}
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                {logged ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                                    >
                                        تسجيل خروج
                                    </button>
                                ) : (
                                    <div className="space-y-2">
                                        <Link
                                            to="/login"
                                            className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-3 py-2 rounded-xl text-sm font-medium text-center transition-all duration-300"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            تسجيل الدخول
                                        </Link>
                                        <Link
                                            to="/signUp"
                                            className="block w-full text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 border border-primary-600 dark:border-primary-400 hover:border-primary-700 dark:hover:border-primary-300 px-3 py-2 rounded-xl text-sm font-medium text-center transition-all duration-300"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            إنشاء حساب
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}