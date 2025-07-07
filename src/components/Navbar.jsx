import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import AuthContext from '../auth/auth-context';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const logged = auth.isLoggedIn;

    const handleLogout = () => {
        auth.logout();
        setIsMenuOpen(false);
        navigate("/");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={logo} className="h-10 w-auto" alt="Restaurant Logo" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            to="/" 
                            className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            الرئيسية
                        </Link>
                        <Link 
                            to="/menu" 
                            className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            القائمة
                        </Link>
                        <Link 
                            to="/plans" 
                            className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            الباقات
                        </Link>
                        {logged && (
                            <Link 
                                to="/profile" 
                                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                حسابي
                            </Link>
                        )}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {logged ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                تسجيل خروج
                            </button>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    تسجيل الدخول
                                </Link>
                                <Link
                                    to="/signUp"
                                    className="text-primary-600 hover:text-primary-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    إنشاء حساب
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-2">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                الرئيسية
                            </Link>
                            <Link
                                to="/menu"
                                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                القائمة
                            </Link>
                            <Link
                                to="/plans"
                                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                الباقات
                            </Link>
                            {logged && (
                                <Link
                                    to="/profile"
                                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    حسابي
                                </Link>
                            )}
                            <div className="pt-4 border-t border-gray-200">
                                {logged ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        تسجيل خروج
                                    </button>
                                ) : (
                                    <div className="space-y-2">
                                        <Link
                                            to="/login"
                                            className="block w-full bg-primary-600 text-white hover:bg-primary-700 px-3 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            تسجيل الدخول
                                        </Link>
                                        <Link
                                            to="/signUp"
                                            className="block w-full text-primary-600 hover:text-primary-700 px-3 py-2 rounded-lg text-sm font-medium text-center transition-colors"
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