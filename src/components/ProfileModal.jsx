import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/auth-context";

const ProfileModal = ({ isOpen, onClose }) => {
    const [isChecked, setIsChecked] = useState(false); // Checkbox state
    const [isSubmitted, setIsSubmitted] = useState(false); // Success message state

    const [user, setUser] = useState({ fullName: '', gender: "", phone: "", email: "", location: "", image: "" });
    const [profile, setProfile] = useState({});
    const authCtx = useContext(AuthContext);

    const handleClose = () => {
        setIsSubmitted(false); // Reset success state
        setIsChecked(false); // Reset checkbox state
        onClose(); // Close modal
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getuser = () => {
        axios.get('/api/profile', {
            headers: {
                'Authorization': `Bearer ${authCtx.token}`
            }
        }).then((res) => {
            const response = res.data.data;
            console.log(response);
            setProfile(response);
            setUser(response); // Initialize the user state with profile data
        }).catch(err => console.log(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/api/profile', user, {
            headers: {
                "Authorization": `Bearer ${authCtx.token}`
            }
        }).then((res) => {
            const response = res.data.data;
            console.log(response);
            setUser(response);
            getuser();
            window.location.reload();
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getuser();
    }, []);

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
                <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                    {/* الاسم */}
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="الاسم"
                            className="px-4 py-2 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleInput}
                            value={user.fullName || ""} 
                        />
                    </div>

                    {/* الايميل */}
                    <div className="flex flex-col">
                        <input
                            type="email"
                            name="email"
                            placeholder="الايميل"
                            className="px-4 py-2 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleInput}
                            value={user.email || ""} 
                        />
                    </div>

                    {/* العنوان */}
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="location"
                            placeholder="العنوان"
                            className="px-4 py-2 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleInput}
                            value={user.location || ""}
                        />
                    </div>

                    {/* الهاتف */}
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="phone"
                            placeholder="الهاتف"
                            className="px-4 py-2 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleInput}
                            value={user.phone || ""}
                        />
                    </div>

                    {/* الجنس */}
                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-[24px]">
                        <div className="relative w-full">
                            <label htmlFor="gender" className="font-semibold text-orange-500">الجنس</label>
                            <div className="flex gap-4 items-center mt-3">
                                {/* ذكر */}
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="Male"
                                        className="hidden peer"
                                        onChange={handleInput}
                                        checked={user.gender === "Male"}
                                    />
                                    <label
                                        htmlFor="male"
                                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-[20px] cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white"
                                    >
                                        ذكر
                                    </label>
                                </div>

                                {/* أنثى */}
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="Female"
                                        className="hidden peer"
                                        onChange={handleInput}
                                        checked={user.gender === "Female"}
                                    />
                                    <label
                                        htmlFor="female"
                                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-[20px] cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white"
                                    >
                                        أنثى
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* زر التعديل */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-[20px] hover:bg-blue-600 transition duration-300"
                        >
                            تعديل
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;