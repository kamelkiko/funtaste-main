import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth/auth-context';

export default function ResetPassword() {
    const [reset, setReset] = useState({ phone: " ", otp: " ", password: " " })
      const [errorMessage,setErrorMessage] = useState("")
        const [isError , setIsError] = useState(false)
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    console.log(authCtx.phoneForgot)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReset(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(e.target.value)
    }
    const url = `/api/reset-password?phone=${encodeURIComponent(authCtx.phoneForgot)}&otp=${encodeURIComponent(reset.otp)}&password=${encodeURIComponent(reset.password)}`;
    const handleVerify = (e) => {
        e.preventDefault()
        axios.post(url)
            .then((res) => {
                console.log(res.data.data)
                setIsError(false)
                navigate("/login")
            }
            ).catch((err) => {
                console.log(err)
                setIsError(true)
                setErrorMessage(err.response.data.status.messageError)
            })

    }
    return (
        <div className="flex items-center justify-center font-tajawal bg-slate-400 min-h-screen">
            <form className="p-5 bg-white rounded-lg flex flex-col gap-5 lg:w-[300px]" onSubmit={handleVerify}>
                
                <input
                    type="text"
                    placeholder="ادخل الكود  "
                    name="otp"
                    onChange={handleInputChange}
                    className="rounded-lg p-2 border border-gray-300 "
                />
                <input
                    type="password"
                    placeholder="ادخل الرقم السري الجديد  "
                    name="password"
                    onChange={handleInputChange}
                    className="rounded-lg p-2 border border-gray-300 "
                />

<br />
                        {isError && <p className="font-semibold text-red-600">{errorMessage}</p>}
                <button className="p-2 bg-green-700 text-white rounded-lg hover:bg-green-600">
                    ارسال
                </button>
            </form>
        </div>

    )
}
