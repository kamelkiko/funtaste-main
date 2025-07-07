import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import AuthContext from '../auth/auth-context';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()
    const auth= useContext(AuthContext)
    const logged=auth.isLoggedIn

    const handleLogout = () =>{
        auth.logout()
        setIsMenuOpen(false)
        navigate("/")
    }
    return (
        <div className="h-[80px] bg-white/50 backdrop-blur-sm flex items-center font-tajawal relative z-50">
            <div className="container mx-auto flex items-center justify-between px-4">
                {/* Logo Section */}
                <div className="text-white font-bold text-xl">
                    <Link to="/">
                    
                    <img src={logo} className="size-20" alt="Logo" />
                    </Link>
                </div>

                {/* Hamburger Icon for Medium and Small Screens */}
                <div className="lg:hidden">
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Navigation Links (Hidden on Medium and Small Screens) */}
                <div className="hidden lg:flex items-center space-x-10">
                    <div className="text-black font-bold text-lg ml-6">
                        <Link to="/">الرئيسية</Link>
                    </div>
                    <div className="text-black font-bold text-lg">
                        <Link to="/menu">Menu</Link>
                    </div>
                    {logged && <div className="text-black font-bold text-lg">
                        <Link to="/profile">صفحتي</Link>
                    </div>}
                    
                    {/* <div className="text-black font-bold text-lg">
                        <Link to="/offers">الطلبات</Link>
                    </div> */}
                    <div className="text-black font-bold text-lg">
                        <Link to={'/plans'}>الباقات</Link>
                    </div>
                    <div className="flex justify-around gap-4">
                        {
                            logged ? (
                                <button
                            onClick={handleLogout}
                            className="text-black px-4 py-2 rounded-lg shadow hover:text-red-400 transition"
                            style={{ backgroundColor: '#80A881' }}
                        >
                            تسجيل خروج
                        </button>
                            ): (
                                <>
                                <Link
                            to="/login"
                            className="text-black px-4 py-2 rounded-lg shadow hover:text-red-400 transition"
                            style={{ backgroundColor: '#80A881' }}
                        >
                            تسجيل الدخول
                        </Link>
                        <div className="text-black font-semibold mt-1 text-xl">
                            <Link to="/signUp">إنشاء حساب</Link>
                        </div></>
                            )
                        }
                        
                    </div>
                </div>
            </div>

            {/* Dropdown Menu for Medium and Small Screens */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-[80px] left-0 w-full bg-white shadow-lg z-50">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                        <li>
                            <Link
                                to="/"
                                className="text-gray-800 font-bold text-lg hover:text-gray-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                الرئيسية
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/menu"
                                className="text-gray-800 font-bold text-lg hover:text-gray-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Menu
                            </Link>
                        </li>
                        {logged && 

                        <li>
                            <Link
                                to="/profile"
                                className="text-gray-800 font-bold text-lg hover:text-gray-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                صفحتي
                            </Link>
                        </li>
                        }
                        {/* <li>
                            <Link
                                to="/offers"
                                className="text-gray-800 font-bold text-lg hover:text-gray-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                الطلبات
                            </Link>
                        </li> */}
                        <li>
                            <Link
                                to="/plans"
                                className="text-gray-800 font-bold text-lg hover:text-gray-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                الباقات
                            </Link>
                        </li>
                        {
                            logged ? (
                                <li>
                                <button
                                    
                                    className="text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-green-200"
                                    style={{ backgroundColor: '#80A881' }}
                                    onClick={handleLogout}
                                >
                                    تسجيل خروج
                                </button>
                            </li>

                            ) : (<>
                            
                                <li>
                                <Link
                                    to="/login"
                                    className="text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-green-200"
                                    style={{ backgroundColor: '#80A881' }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    تسجيل الدخول
                                </Link>
                            </li>
                               <li>
                               <Link
                                   to="/signUp"
                                   className="text-gray-800 font-semibold text-lg hover:text-gray-600"
                                   onClick={() => setIsMenuOpen(false)}
                               >
                                   إنشاء حساب
                               </Link>
                           </li>
                           </>
                            )

                        }


                        
                      
                     
                    </ul>
                </div>
            )}
        </div>
    );
}
