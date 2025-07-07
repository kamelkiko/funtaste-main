import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../auth/auth-context";
import { QRCodeCanvas } from "qrcode.react";

const QrCodeModal = ({ isOpen, onClose, id }) => {
    const [isChecked, setIsChecked] = useState(false); // Checkbox state
    const [isSubmitted, setIsSubmitted] = useState(false); // Success message state
    const [qrValue, setQrValue] = useState("");
    const [mealsCount,setMealsCount]=useState(0)
    const [isError,setIsError]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const qrRef = useRef(null);
    console.log(id)
    
    const authCtx = useContext(AuthContext);

    const handleClose = () => {
        setIsSubmitted(false); // Reset success state
        setIsChecked(false)
        onClose(); // Close modal
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setMealsCount(Number(value));
        console.log(mealsCount)
    };

    const generateQr = (e) => {
        e.preventDefault();
        axios.post('/api/generateQr', {subscriptionId:id,mealsCount:mealsCount,isCustomMeal:false},{
            headers: {
                'Authorization': `Bearer ${authCtx.token}`
            }
        }).then((res) => {
            const response = res.data.data;
            console.log(response);
            setQrValue(response);
            setIsChecked(true)
            setIsError(false)
        }).catch((err) =>{ console.log(err)
            setIsError(true)
            setErrorMessage(err.response.data.status.messageError)
        })
    };
    const downloadQR = () => {
        const canvas = qrRef.current.querySelector("canvas");
        const url = canvas.toDataURL("image/png");
        const filename = `qr_code_${Date.now()}.png`;
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
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

                <form onSubmit={generateQr} className="flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-center font-bold text-xl text-gray-800 mb-4">
        ادخل عدد الوجبات
    </h2>

    <input
        type="number"
        name="mealsCount"
        placeholder="عدد الوجبات"
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
        min="1"
        onChange={handleInput}
        required
    />

    <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
    >
        ادخال
    </button>
</form>
{isError && <p className="font-semibold text-red-600">{errorMessage}</p>}
                {
                    isChecked && (
                        <>
                        <div ref={qrRef} className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-4">امسح رمز الـ QR</h2>
                    <QRCodeCanvas value={qrValue} size={200} />
                </div>

                {/* Download Button */}
                <div className="mt-4 flex justify-center">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                        onClick={downloadQR}
                    >
                        تحميل QR كصورة
                    </button>
                </div>
                </>
                    )
                }
            </div>
        </div>
    );
};

export default QrCodeModal;