import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../auth/auth-context";
import axios from "axios";
import BackgroundImage from "../components/BackgroundImage";
import logo from '../assets/images/logo.png';

export default function Login() {
    const [user, setUser] = useState({ phone: '', password: '' });
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handlePhoneInputChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.startsWith("966")) {
            value = value.slice(3);
        }

        if (value.startsWith("0")) {
            value = value.slice(1);
        }

        if (value.length > 9) {
            value = value.slice(0, 9);
        }

        setUser(prevUser => ({
            ...prevUser,
            phone: "966" + value,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.phone || !user.password) {
            setIsError(true);
            setErrorMessage("يرجى ملء جميع الحقول");
            return;
        }

        setIsLoading(true);
        setIsError(false);

        try {
            const url = `/api/login?phone=${encodeURIComponent(user.phone)}&password=${encodeURIComponent(user.password)}`;
            const response = await axios.post(url);
            
            const token = response.data.data?.userTokensResponse?.accessToken;
            authCtx.login(token);
            navigate("/");
        } catch (err) {
            setIsError(true);
            setErrorMessage(err.response?.data?.status?.messageError || "حدث خطأ في تسجيل الدخول");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BackgroundImage variant="hero" className="min-h-screen">
            <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Logo and Header */}
                    <div className="text-center">
                        <Link to="/" className="inline-block">
                            <img 
                                src={logo} 
                                className="h-16 w-auto mx-auto animate-float" 
                                alt="Restaurant Logo" 
                            />
                        </Link>
                        <h2 className="mt-6 text-3xl font-bold text-white">
                            مرحباً بعودتك
                        </h2>
                        <p className="mt-2 text-sm text-gray-200">
                            سجل دخولك للاستمتاع بخدماتنا المميزة
                        </p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-large border border-white/20">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Phone Input */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                                    رقم الجوال
                                </label>
                                <div className="relative">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                        placeholder="رقم الجوال"
                                        onChange={handlePhoneInputChange}
                                        value={user.phone.replace('966', '')}
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 text-sm font-medium">
                                        +966
                                    </div>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                    كلمة المرور
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={passwordVisible ? "text" : "password"}
                                        required
                                        className="w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                        placeholder="كلمة المرور"
                                        value={user.password}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {passwordVisible ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="text-right">
                                <Link 
                                    to="/forgotPassword" 
                                    className="text-sm text-primary-300 hover:text-primary-200 transition-colors"
                                >
                                    نسيت كلمة المرور؟
                                </Link>
                            </div>

                            {/* Error Message */}
                            {isError && (
                                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                                    <p className="text-red-200 text-sm text-center">{errorMessage}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-glow-green"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        جاري تسجيل الدخول...
                                    </div>
                                ) : (
                                    'تسجيل الدخول'
                                )}
                            </button>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <p className="text-sm text-gray-200">
                                    ليس لديك حساب؟{' '}
                                    <Link 
                                        to="/signUp" 
                                        className="text-primary-300 hover:text-primary-200 font-medium transition-colors"
                                    >
                                        إنشاء حساب جديد
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </BackgroundImage>
    );
}