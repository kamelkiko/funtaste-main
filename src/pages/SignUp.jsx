import React, { useState, useContext } from "react";
import food from '../assets/images/food.jpg';
import login from '../assets/images/logo.png';
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth/auth-context";

export default function SignUp() {
    const [user, setUser] = useState({ fullName: '', gender: "", phone: "", email: "", password: "" });
    const [chicking, setChicking] = useState("");
    const [nameCheck, setNameCheck] = useState("");
    const [phoneCheck, setPhoneCheck] = useState("");
    const [passCheck, setPassCheck] = useState("");
    const [emailCheck, setEmailCheck] = useState("");
    const [genderCheck, setGenderCheck] = useState("");
    const [errorMessage,setErrorMessage]= useState("")
    const [isError , setiseError] = useState(false)
    const [chickingClass, setChickingClass] = useState(false);
      const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
    
      const authctx = useContext(AuthContext);
      const togglePasswordVisibility = () => {
          setPasswordVisible((prev) => !prev); // Toggle the visibility state
      };
    const navigate = useNavigate();

    const handlePhoneInputChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    
        if (value.startsWith("966")) {
            value = value.slice(3); // Remove the extra "966" if the user types it
        }
    
        if (value.startsWith("0")) {
            value = value.slice(1); // Remove leading zero
        }
    
        if (value.length > 9) {
            value = value.slice(0, 9); // Ensure only 9 digits are entered
        }
    
        setUser(prevUser => ({
            ...prevUser,
            phone: "966" + value, // Always set the value as 966 + 9 digits
        }));
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));

        // Validation for each input
        if (name === 'fullName') {
            if (value.trim() === "") {
                setNameCheck("من فضلك ادخل اسمك");
            } else {
                setNameCheck("");
            }
        }

        if (name === 'phone') {
            if (value.trim() === "") {
                setPhoneCheck("من فضلك ادخل رقم الجوال");
            } else {
                setPhoneCheck("");
            }
        }

        if (name === 'email') {
            if (value.trim() === "") {
                setEmailCheck("من فضلك ادخل البريد الإلكتروني");
            } else {
                setEmailCheck("");
            }
        }

        if (name === 'gender') {
            if (value.trim() === "") {
                setGenderCheck("من فضلك اختر الجنس");
            } else {
                setGenderCheck("");
            }
        }

        if (name === 'password') {
            if (value.trim() === "") {
                setPassCheck("من فضلك ادخل كلمة المرور");
            } else {
                setPassCheck("");
            }
        }

        if (name === 'confirmPassword') {
            if (value !== user.password) {
                setChicking("كلمة السر غير متطابقه");
                setChickingClass(true);
            } else {
                setChicking("كلمة السر متطابقه");
                setChickingClass(false);
            }
        }
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const addUser = (e) => {
        e.preventDefault();

        // Check if any required field is empty
        if (!user.fullName || !user.phone || !user.gender || !user.password) {
            alert("من فضلك املأ جميع الحقول المطلوبة");
            return;
        }

        axios.post("/api/signup", user)
            .then((res) => {
                console.log(res.data.data);
                authctx.phone = user.phone;
                setiseError(false)
                navigate("/otp");
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data.status.messageError);
                    setiseError(true)
                    setErrorMessage(err.response.data.status.messageError)
                } else {
                    console.error('Error:', err.message);
                }
            });
    };

    return (
        <div className="w-full h-full p-4 text-black font-tajawal shadow-lg" style={{ backgroundColor: "#FFE3D4" }}>
            <div className="flex flex-col lg:flex-row h-full space-y-6 lg:space-y-0 lg:gap-[54px]">
                {/* الجزء الأول: النموذج */}
                <div className="w-full lg:w-2/5 flex flex-col items-end p-6">
                    <div className="w-full max-w-md p-10 text-black text-right rounded-[20px] ml-auto">
                        <a href="/">
                            <img src={login} className="h-[100px] w-[115px] mr-5 mx-auto" alt="Login Icon" />
                        </a>
                        <h1 className="text-right text-2xl sm:text-3xl md:text-4xl font-Tajawal">انشاء حساب</h1>
                        <p className="text-right text-sm sm:text-lg font-medium">
                            لدي حساب بالفعل؟{" "}
                            <a href="/login" className="text-green-500">سجل الدخول</a>
                        </p>
                    </div>

                    {/* النموذج */}
                    <div className="w-full text-right ml-auto">
                        <form className="text-black space-y-6 h-[548px]" onSubmit={addUser}>
                            {/* الاسم الأول والأخير */}
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-[24px]">
                                <input
                                    type="text"
                                    id="first"
                                    name="fullName"
                                    className="px-4 py-2 border border-white rounded-[20px] focus:outline-none focus:ring-2 focus:557C56 w-full sm:w-[211px]"
                                    placeholder="الاسم"
                                    onChange={handleInput}
                                    value={user.fullName}
                                />
                                <br />
                                <div className={`text-red-600`}>{nameCheck}</div>
                            </div>

                            {/* رقم الهاتف */}
                            <div className="relative">
                  
                                <input
                                    type="text"
                                    id="mobile"
                                    name="phone"
                               
                                    required
                                    className="px-4 py-2 text-right border border-gray-300 md:w-[447px] lg:w-[447px] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-[447px]"
                                    placeholder="رقم الجوال"
                                    onChange={handlePhoneInputChange}
                                />
                                <p className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 font-semibold">+966</p>
                                <div className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                                    <i className="fas fa-phone"></i>
                                </div>
                                <div className={`text-red-600`}>{phoneCheck}</div>
                            </div>

                            {/* البريد الإلكتروني */}
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="px-4 py-2 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-[447px]"
                                placeholder="البريد الالكتروني"
                                onChange={handleInput}
                                value={user.email}
                            />
                            

                            {/* الجنس */}
                            <div className="flex flex-col sm:flex-row gap-8 sm:gap-[24px]">
                                <div className="relative">
                                    <label htmlFor="gender" className="font-semibold text-orange-500">الجنس</label>
                                    <div className="flex gap-4 items-center mt-3">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="male"
                                                name="gender"
                                                value="Male"
                                                className="hidden peer"
                                                required
                                                onChange={handleInput}
                                            />
                                            <label
                                                htmlFor="male"
                                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-[20px] cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white"
                                            >
                                                ذكر
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="female"
                                                name="gender"
                                                value="Female"
                                                className="hidden peer"
                                                onChange={handleInput}
                                            />
                                            <label
                                                htmlFor="female"
                                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-[20px] cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white"
                                            >
                                                أنثى
                                            </label>
                                        </div>
                                    </div>
                                    <div className={`text-red-600`}>{genderCheck}</div>
                                </div>
                            </div>

                            {/* كلمة المرور */}
                            <div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="&nbsp; &nbsp; ادخل الرقم السري"
                                    required
                                    className="py-2 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-[447px]"
                                    onChange={handleInput}
                                    value={user.password}
                                />
                                 <button
                  type="button"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 font-semibold"
                >
                  <svg
                    style={{ color: "green" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                    onClick={togglePasswordVisibility}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                            </div>
                                <div className={`text-red-600`}>{passCheck}</div>

                            {/* تأكيد كلمة المرور */}
                            <div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="&nbsp; &nbsp; تأكيد الرقم السري"
                                    required
                                    className="py-2 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-[447px] "
                                    onChange={handleInput}
                                />
                                 <button
                  type="button"
                  className="absolute left-4 top-1/2 transform -translate-y-8 text-gray-700 font-semibold"
                >
                  <svg
                    style={{ color: "green" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                    onClick={togglePasswordVisibility}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                                <br />
                            </div>
                                <div className={`${!chickingClass ? 'text-green-600' : "text-red-600"}`}>{chicking}</div>

                            {/* الشروط والأحكام */}
                            {/* <div className="flex items-center space-x-2 justify-start">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="terms" className="text-sm text-gray-700">موافق على الشروط والأحكام</label>
                            </div> */}

                            <br />
                            {isError && <p className="font-semibold text-red-600">{errorMessage}</p>}
                            {/* زر التسجيل */}
                            <button
                                type="submit"
                                className={`w-full sm:w-[447px] h-[52px] text-white py-2 px-4 rounded-[20px] hover:bg-blue-600 transition`}
                                style={{ background: "#557C56" }}
                                // disabled={!isChecked}
                            >
                                تسجيل الدخول
                            </button>
                        </form>
                        
                    </div>
                </div>

                {/* الجزء الثاني: الصورة */}
                <div className="hidden lg:block md:block w-full lg:w-3/7 p-6 relative">
                    <img
                        style={{ opacity: "0.7" }}
                        src={food}
                        className="lg:h-full w-full object-cover rounded-[30px] transition-all duration-300"
                        alt="Food"
                    />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-10 rounded-[20px]">
                        <p className="text-sm sm:text-base md:text-lg font-bold leading-tight">
                            باقات متنوعه في مطعمنا
                            <br />
                            استمتع ب اشتراك شهري يناسبك
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}