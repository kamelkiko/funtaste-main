import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../auth/auth-context";

const Modal = ({ isOpen, onClose,carps,proteins,meals,expdate,planId,proteinValue }) => {
    const [isChecked, setIsChecked] = useState(false); // Checkbox state
    const [isSubmitted, setIsSubmitted] = useState(false); // Success message state
    const [sub,setSub]=useState({mealPlanId:planId,extraProteinGrams:0})
    const [errorMessage,setErrorMessage] = useState("")
            const [isError , setIsError] = useState(false)
    const authCtx = useContext(AuthContext)
    const logged = authCtx.isLoggedIn;
    console.log(planId)
    console.log(proteinValue)
    const addSub=(e)=>{
        e.preventDefault();
        axios.post('/api/subscription',{mealPlanId:planId,extraProteinGrams:proteinValue ? proteinValue : 0},{
            headers:{
                "Authorization" : `Bearer ${authCtx.token}`
            }
        }).then((res)=>{
            console.log(res)
            setIsSubmitted(true)
            setIsError(false)
        }).catch((err)=>{

            console.log(err)
            setIsError(true)
            setErrorMessage(err.response.data.status.messageError)
        }
        )
    }
    
    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const handleClose = () => {
        setIsSubmitted(false); // Reset success state
        setIsChecked(false); // Reset checkbox state
        onClose(); // Close modal
    };
    
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleClose} // Close modal when clicking the overlay
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl"
                    onClick={handleClose} // Close on X button click
                >
                    &times;
                </button>

                {/* Modal Content */}
                <div className="text-center">
                    {isSubmitted ? (
                        
                            !isError ? <h2 className="text-xl font-semibold text-green-600">تمت بنجاح ✅</h2> : (
                                <a href="/login" className="text-xl" style={{textDecoration:"underline"}}>{errorMessage}    </a>
                            )
                        
                      
                    ) : (
                        <>


                            <ol className="text-start list-decimal pl-6 mr-4 mt-2">
                                <li className="text-lg mb-4">مكونات الوجبه : الكارب (من 0 الى {carps} جرام) والبروتين ({proteins} جرام) السلطه والصوصات مجانا</li>
                                <li className="text-lg mb-4">عدد الوجبات {meals} وجبة ويجب الا تتجاوز {expdate} يوم من بدأ الاشتراك</li>
                                <li className="text-lg mb-4">لا يجوز الغاء الاشتراك بعد 3 أيام من تاريخ بدأ الاشتراك </li>
                                <li className="text-lg mb-4">يجوز استبدال الوجبة بسناك واحد فقط لا غير</li>
                            </ol>

                            <p className="text-gray-700">يرجى الموافقة على الشروط والأحكام للاستمرار</p>

                            {/* Checkbox */}
                            <div className="mt-4 flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="mr-2 w-5 h-5"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                <label htmlFor="terms" className="text-gray-700 cursor-pointer">
                                    موافق على الشروط والاحكام
                                </label>
                            </div>

                            {/* Confirm Button */}
                            <button
                                className={`mt-4 px-6 py-2 rounded-md text-white font-semibold ${isChecked
                                    ? "bg-green-700 hover:bg-green-800 cursor-pointer"
                                    : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                onClick={addSub}
                                disabled={!isChecked}
                            >
                                موافق
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;