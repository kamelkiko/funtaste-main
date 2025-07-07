import React, { useContext, useState } from "react";
import food from '../assets/images/food.jpg';
import login from '../assets/images/logo.png';
import phone from '../assets/images/phone.png';
import AuthContext from "../auth/auth-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [user, setUser] = useState({ phone: '', password: '' });
  const [errorMessage, setErrorMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

  const togglePasswordVisibility = () => {
      setPasswordVisible((prev) => !prev); // Toggle the visibility state
  };
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)

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
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
    console.log(e.target.value)
  }

  console.log(user)
  let getUser = (e) => {
    e.preventDefault();
    if (!user.phone || !user.password) {
      console.log(("enter a phone"))
    }
    const formData = new FormData();
    formData.append("phone", user.phone);
    formData.append("password", user.password);
    const url = `/api/login?phone=${encodeURIComponent(user.phone)}&password=${encodeURIComponent(user.password)}`;
    axios.post(url)

      // {
      //     headers: {
      //         'Content-Type': 'application/json'
      //     }
      // }

      .then((res) => {
        console.log(res.data)
        const token = res.data.data?.userTokensResponse?.accessToken;
        console.log(token)
        console.log(user); // Log the user object
        authCtx.login(token);
        setIsError(false)
        navigate("/")
      })
      .catch((err) => {
        if (err.response) {
          console.log('Error response:', err.response.data);
          setIsError(true)
          setErrorMessage(err.response.data.status.messageError)
        } else {
          console.log('Error:', err.message);
        }
      });
  }
  return (
    <div
      className="w-full h-full p-4 text-black font-tajawal shadow-lg"
      style={{ backgroundColor: "#FFE3D4" }}
    >
      <div className="flex flex-col lg:flex-row md:flex-row sm-flex-row h-full space-y-6 lg:space-y-0 lg:gap-[54px]">
        {/* الجزء الأول: النموذج */}
        <div className="w-full lg:w-2/5  flex-col items-end p-6 gap-8">
          {/* الديف الخاص بالصورة والنصوص */}
          <div className="w-full  flex-wrap md:flex-nowrap items-start justify-end max-w-md p-6 text-black text-right rounded-[20px] gap-4">
            <a href="/">
              <img
                src={login}
                className="h-[76px] w-[115px] self-start"
                alt="Login Icon"
              />
            </a>

            <div className=" flex-col items-end w-full gap-4 p-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-Tajawal">
                مرحبا بعودتك
              </h1>
              <h2 className="text-xl sm:text-lg font-large">
                تسجيل الدخول
              </h2>
            </div>
          </div>

          {/* الديف الخاص بالفورم */}
          <div className="w-full text-right">
            <form className="text-black space-y-6 h-auto" onSubmit={getUser}  >
              {/* رقم الهاتف */}
              <div className="relative">
                <input
                  style={{ textAlign: "right", paddingRight: "50px" }}
                  type="text"
                  id="mobile"
                  name="phone"
            
                  required
                  className="px-4 py-2 border border-white rounded-[20px] focus:outline-none focus:ring-1 focus:ring-green-500 w-full h-[64px]"
                  placeholder="رقم الجوال" onChange={handlePhoneInputChange}
                />
                <p className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 font-semibold">966+</p>
                <div className="absolute inset-y-0 right-3 flex items-center text-green-500">
                  <img src={phone} alt="" />
                </div>
              </div>

              {/* كلمة المرور */}
              <div className="relative">
                <input

type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="ادخل الرقم السري"
                  value={user.password}
                  required onChange={handleInputChange}
                  className="px-4 py-2 pr-12 border border-white rounded-[20px] focus:outline-none focus:ring-1 focus:ring-green-500 w-full h-[64px]"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
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
              <div>
                <a style={{ color: "#557C56", }} href="/forgotPassword" className="text-green-300 border-b-2  border-green-500">
                  <span style={{ color: "#557C5" }}>نسيت كلمه السر؟</span>
                </a>
              </div>
              <br />
              {isError && <p className="font-semibold text-red-600">{errorMessage}</p>}

              {/* زر تسجيل الدخول */}
              <button
                type="submit"
                className="w-full h-[52px] text-white py-2 px-4 rounded-[20px] hover:bg-blue-600 transition"
                style={{ background: "#557C56" }}
              >
                تسجيل الدخول
              </button>
            </form>
          </div>
        </div>


        {/* الجزء الثاني: الصورة */}
        <div className="w-full lg:w-3/7  p-6 relative">
          <img
            style={{ opacity: "0.7" }}
            src={food}
            className="h-full w-full object-cover rounded-[30px] transition-all duration-300"
            alt="Food"
          />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-10 rounded-[20px]">
            <div className="text-center justify-center">
              <p className="text-sm sm:text-base md:text-lg font-bold leading-tight">
                باقات متنوعه في مطعمنا
                <br />
                استمتع باشتراك شهري يناسبك
              </p>
              <div className="flex justify-center items-center lg:mr-[50px] mt-2 lg:w-[96px] sm:w-[20px]  h-[8px] gap-4 ">

                <div className="h-[8px] w-[20px] bg-white rounded-[5px]"></div>
                <div className="h-[8px] w-[20px] bg-white rounded-[5px]"></div>
                <div className="h-[8px] w-[56px]  bg-[#FC3B13] rounded-[5px] "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}