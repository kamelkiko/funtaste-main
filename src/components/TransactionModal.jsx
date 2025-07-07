import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/auth-context";

const TransactionModal = ({ isOpen, onClose, id }) => {
    const [isChecked, setIsChecked] = useState(false); // Checkbox state
    const [isSubmitted, setIsSubmitted] = useState(false); // Success message state
    const [transaction, setTransaction] = useState({});
    const authCtx = useContext(AuthContext);
    const logged = authCtx.isLoggedIn;

    const getTransaction = () => {
        axios.get(`/api/transaction/${id}`, {
            headers: {
                "Authorization": `Bearer ${authCtx.token}`
            }
        }).then((res) => {
            const response = res.data.data;
            setTransaction(response);
        }).catch((err) => console.log(err));
    };

    useEffect(() => {
        if (isOpen) {
            getTransaction();
        }
    }, [isOpen, id]);

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

                {/* TransactionModal Content */}
                <div className="flex flex-col justify-start p-5">
                    <div className="flex justify-around p-4">
                        <p className="font-bold">المدفوع</p>
                        <p>{transaction.amount}</p>
                    </div>
                    <hr className="w-full" />
                    <div className="flex justify-around p-4">
                        <p className="font-bold">وسيلة الدفع</p>
                        <p>{transaction.paymentMethod}</p>
                    </div>
                    <hr className="w-full" />
                    <div className="flex justify-around p-4">
                        <p className="font-bold">كود العملية</p>
                        <p>{transaction.transactionCode}</p>
                    </div>
                    <hr className="w-full" />
                    <div className="flex justify-around p-4">
                        <p className="font-bold">رقم العملية</p>
                        <p>{transaction.id}</p>
                    </div>
                    <hr className="w-full" />
                    <div className="flex justify-around p-4">
                        <p className="font-bold">تاريخ العملية</p>
                        <p>{transaction.transactionDate}</p>
                    </div>
                    <hr className="w-full" />
                    <div className="flex justify-around p-4">
                        <p className="font-bold">نوع الباقة</p>
                        <p>{transaction.mealPlan?.name}</p> {/* Use optional chaining */}
                    </div>
                    <hr className="w-full" />
                    <div className="flex justify-around p-4">
                        <p className="font-bold">تاريخ بدأ الباقة</p>
                        <p>{transaction.subscription?.startDate}</p> {/* Use optional chaining */}
                    </div>
                    <hr className="w-full" />
                    <div className="flex justify-around p-4">
                        <p className="font-bold">تاريخ انتهاء الباقة</p>
                        <p>{transaction.subscription?.endDate}</p> {/* Use optional chaining */}
                    </div>
                    <hr className="w-full" />
                    <div className="flex justify-around p-4">
                        <p className="font-bold">الوجبات المتبقية</p>
                        <p>{transaction.subscription?.remainingMeals}</p> {/* Use optional chaining */}
                    </div>
                    <hr className="w-full" />
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;