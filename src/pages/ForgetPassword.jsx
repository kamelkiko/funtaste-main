import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth/auth-context';

export default function ForgetPassword() {
    const [forget, setForget] = useState({ phone: "" })
      const [errorMessage,setErrorMessage] = useState("")
        const [isError , setIsError] = useState(false)
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForget(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(e.target.value)
        
    }
    
    const handleVerify = (e) => {
        e.preventDefault()
        const url = `/api/forgot-password?phone=${encodeURIComponent(forget.phone)}`;
        axios.post(url)
            .then((res) => {
                console.log(res.data.data)
                setIsError(false)
                navigate('/resetPassword')
                authCtx.phoneForgot=forget.phone;
            }
            ).catch((err) => {console.log(err)
                setIsError(true)
                setErrorMessage(err.response.data.status.messageError)
            })

    }
    return (
        <div className="flex items-center justify-center font-tajawal bg-slate-400 min-h-screen">
            <form className="p-5 bg-white rounded-lg flex flex-col gap-5 lg:w-[300px]" onSubmit={handleVerify}>
                <input
                    type="text"
                    placeholder="ادخل رقم الهاتف "
                    name="phone"
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
