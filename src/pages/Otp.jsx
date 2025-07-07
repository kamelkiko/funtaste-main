import axios from 'axios';
import React, { useContext, useState } from 'react'
import AuthContext from '../auth/auth-context';
import { useNavigate } from 'react-router-dom';

export default function Otp() {
    const [verify, setVerify] = useState({ otp: '', phone: "" })
      const [errorMessage,setErrorMessage] = useState("")
        const [isError , setIsError] = useState(false)
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)
    console.log(authCtx.phone)
    const userPhone = authCtx.phone;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVerify(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(e.target.value)
    }
    const url = `/api/verify-otp?phone=${encodeURIComponent(userPhone)}&otp=${encodeURIComponent(verify.otp)}`;
    const handleVerify = (e) => {
        e.preventDefault()
        axios.post(url)
            .then((res) => {
                console.log(res.data.data)
                const token = res.data.data?.userTokensResponse?.accessToken;
                console.log(token)

                authCtx.login(token);
                setIsError(false)
                navigate("/login")
            }
            ).catch((err) =>{ console.log(err)
                setIsError(true)
                setErrorMessage(err.response.data.status.messageError)
            })

    }
    return (
        <div className="flex items-center justify-center font-tajawal bg-slate-400 min-h-screen">
            <form className="p-5 bg-white rounded-lg flex flex-col gap-5 lg:w-[300px]" onSubmit={handleVerify}>
                <h1>ادخل الكود المرسل اليك</h1>
                <input
                    type="text"
                    placeholder="ادخل الكود  "
                    name="otp"
                    onChange={handleInputChange}
                    className="rounded-lg p-2 border border-gray-300"
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
