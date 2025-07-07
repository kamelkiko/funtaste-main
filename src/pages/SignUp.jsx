import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../auth/auth-context";
import BackgroundImage from "../components/BackgroundImage";
import LoadingSpinner from "../components/LoadingSpinner";
import logo from '../assets/images/logo.png';

export default function SignUp() {
    const [user, setUser] = useState({ 
        fullName: '', 
        gender: "", 
        phone: "", 
        email: "", 
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const authctx = useContext(AuthContext);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^966[0-9]{9}$/;
        return phoneRegex.test(phone);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
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

        const fullPhone = "966" + value;
        setUser(prevUser => ({
            ...prevUser,
            phone: fullPhone,
        }));

        // Clear phone error
        if (errors.phone) {
            setErrors(prev => ({ ...prev, phone: '' }));
        }

        // Real-time validation
        if (value.length === 9 && !validatePhone(fullPhone)) {
            setErrors(prev => ({ ...prev, phone: 'رقم الجوال غير صحيح' }));
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear specific field error
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        // Real-time validation
        switch (name) {
            case 'fullName':
                if (value.trim().length > 0 && value.trim().length < 2) {
                    setErrors(prev => ({ ...prev, fullName: 'الاسم يجب أن يكون حرفين على الأقل' }));
                }
                break;
            case 'email':
                if (value.length > 0 && !validateEmail(value)) {
                    setErrors(prev => ({ ...prev, email: 'البريد الإلكتروني غير صحيح' }));
                }
                break;
            case 'password':
                if (value.length > 0 && !validatePassword(value)) {
                    setErrors(prev => ({ ...prev, password: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' }));
                }
                // Check confirm password if it exists
                if (user.confirmPassword && value !== user.confirmPassword) {
                    setErrors(prev => ({ ...prev, confirmPassword: 'كلمات المرور غير متطابقة' }));
                } else if (user.confirmPassword && value === user.confirmPassword) {
                    setErrors(prev => ({ ...prev, confirmPassword: '' }));
                }
                break;
            case 'confirmPassword':
                if (value && user.password !== value) {
                    setErrors(prev => ({ ...prev, confirmPassword: 'كلمات المرور غير متطابقة' }));
                }
                break;
            default:
                break;
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!user.fullName.trim()) {
            newErrors.fullName = "الاسم مطلوب";
        } else if (user.fullName.trim().length < 2) {
            newErrors.fullName = "الاسم يجب أن يكون حرفين على الأقل";
        }

        if (!user.phone.trim()) {
            newErrors.phone = "رقم الجوال مطلوب";
        } else if (!validatePhone(user.phone)) {
            newErrors.phone = "رقم الجوال غير صحيح";
        }

        if (!user.email.trim()) {
            newErrors.email = "البريد الإلكتروني مطلوب";
        } else if (!validateEmail(user.email)) {
            newErrors.email = "البريد الإلكتروني غير صحيح";
        }

        if (!user.gender) {
            newErrors.gender = "يرجى اختيار الجنس";
        }

        if (!user.password) {
            newErrors.password = "كلمة المرور مطلوبة";
        } else if (!validatePassword(user.password)) {
            newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
        }

        if (!user.confirmPassword) {
            newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
        } else if (user.password !== user.confirmPassword) {
            newErrors.confirmPassword = "كلمات المرور غير متطابقة";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");

        try {
            const response = await axios.post("/api/signup", {
                fullName: user.fullName,
                gender: user.gender,
                phone: user.phone,
                email: user.email,
                password: user.password
            });

            authctx.phone = user.phone;
            navigate("/otp");
        } catch (err) {
            setIsError(true);
            if (err.response?.status === 409) {
                setErrorMessage("رقم الجوال أو البريد الإلكتروني مستخدم بالفعل");
            } else if (err.response?.status === 422) {
                setErrorMessage("البيانات المدخلة غير صحيحة. يرجى التحقق من جميع الحقول");
            } else {
                setErrorMessage(err.response?.data?.status?.messageError || "حدث خطأ في إنشاء الحساب. يرجى المحاولة مرة أخرى");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BackgroundImage variant="restaurant" className="min-h-screen">
            <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-lg w-full space-y-8">
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
                            إنشاء حساب جديد
                        </h2>
                        <p className="mt-2 text-sm text-gray-200">
                            انضم إلينا واستمتع بتجربة طعام مميزة
                        </p>
                    </div>

                    {/* Sign Up Form */}
                    <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl p-8 shadow-large border border-white/20 dark:border-gray-700/30">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                                    الاسم الكامل
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    className={`w-full px-4 py-3 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border ${
                                        errors.fullName ? 'border-red-400' : 'border-white/30 dark:border-gray-600'
                                    } rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
                                    placeholder="الاسم الكامل"
                                    value={user.fullName}
                                    onChange={handleInput}
                                />
                                {errors.fullName && <p className="mt-1 text-sm text-red-300">{errors.fullName}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                                    رقم الجوال
                                </label>
                                <div className="relative">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        className={`w-full px-4 py-3 pr-12 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border ${
                                            errors.phone ? 'border-red-400' : 'border-white/30 dark:border-gray-600'
                                        } rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
                                        placeholder="رقم الجوال"
                                        onChange={handlePhoneInputChange}
                                        value={user.phone.replace('966', '')}
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 text-sm font-medium">
                                        +966
                                    </div>
                                </div>
                                {errors.phone && <p className="mt-1 text-sm text-red-300">{errors.phone}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={`w-full px-4 py-3 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border ${
                                        errors.email ? 'border-red-400' : 'border-white/30 dark:border-gray-600'
                                    } rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
                                    placeholder="البريد الإلكتروني"
                                    value={user.email}
                                    onChange={handleInput}
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-3">الجنس</label>
                                <div className="flex gap-4">
                                    <label className="flex-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            className="sr-only peer"
                                            onChange={handleInput}
                                        />
                                        <div className="w-full px-4 py-3 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-600 rounded-xl text-white text-center transition-all duration-300 peer-checked:bg-primary-600 peer-checked:border-primary-500 peer-checked:shadow-glow-green">
                                            ذكر
                                        </div>
                                    </label>
                                    <label className="flex-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            className="sr-only peer"
                                            onChange={handleInput}
                                        />
                                        <div className="w-full px-4 py-3 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-600 rounded-xl text-white text-center transition-all duration-300 peer-checked:bg-primary-600 peer-checked:border-primary-500 peer-checked:shadow-glow-green">
                                            أنثى
                                        </div>
                                    </label>
                                </div>
                                {errors.gender && <p className="mt-1 text-sm text-red-300">{errors.gender}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                    كلمة المرور
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={passwordVisible ? "text" : "password"}
                                        className={`w-full px-4 py-3 pr-12 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border ${
                                            errors.password ? 'border-red-400' : 'border-white/30 dark:border-gray-600'
                                        } rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
                                        placeholder="كلمة المرور"
                                        value={user.password}
                                        onChange={handleInput}
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
                                {errors.password && <p className="mt-1 text-sm text-red-300">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                                    تأكيد كلمة المرور
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        className={`w-full px-4 py-3 pr-12 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border ${
                                            errors.confirmPassword ? 'border-red-400' : 'border-white/30 dark:border-gray-600'
                                        } rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
                                        placeholder="تأكيد كلمة المرور"
                                        value={user.confirmPassword}
                                        onChange={handleInput}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {confirmPasswordVisible ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-300">{errors.confirmPassword}</p>}
                            </div>

                            {/* Error Message */}
                            {isError && (
                                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-300 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-red-200 text-sm">{errorMessage}</p>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || Object.keys(errors).length > 0}
                                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-glow-green"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <LoadingSpinner size="sm" color="white" className="ml-2" />
                                        جاري إنشاء الحساب...
                                    </div>
                                ) : (
                                    'إنشاء حساب'
                                )}
                            </button>

                            {/* Login Link */}
                            <div className="text-center">
                                <p className="text-sm text-gray-200">
                                    لديك حساب بالفعل؟{' '}
                                    <Link 
                                        to="/login" 
                                        className="text-primary-300 hover:text-primary-200 font-medium transition-colors"
                                    >
                                        تسجيل الدخول
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