import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import bg from '../../src/assets/images/homeBG.jpg'
import profile from '../../src/assets/images/profilePic.jpg'
import phone from '../../src/assets/images/phone.png'
import location from '../../src/assets/images/location.png'
import food from '../../src/assets/images/food.jpg'
import calender from '../../src/assets/images/calendar.png'
import ellipse from '../../src/assets/images/Ellipse.png'
import ewallet from '../../src/assets/images/Ewallet.png'
import visa from '../../src/assets/images/Visa.png'
import arrow from '../assets/images/arrow.png'
import heart from '../assets/images/heart.png'
import bag from '../assets/images/bag.png'
import Footer from '../components/Footer'
import { offersData } from './data'
import axios from 'axios'
import AuthContext from '../auth/auth-context'
import PreLoader from '../components/Preloader'
import ProfileModal from '../components/ProfileModal'
import TransactionModal from '../components/TransactionModal'
import QrCodeModal from '../components/QrCodeModal'
import SubModal from '../components/SubModal'
export default function Profile() {
    const [userProfile, setProfile] = useState([])
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const [subId,setSubId]=useState("")
    const [transactionId, setTransactionId] = useState("")
    const [sub, setSub] = useState([])
    const [carps,setCarps]=("")
    const [meals,setMeals]=("")
    const [proteins,setProteins]=("")
    const [expDate,setExpdate]=("")
    const [info, setInfo] = useState([]);
    
    const authCtx = useContext(AuthContext)
    const logged = authCtx.isLoggedIn;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const handleOpenModal = () => {

        setIsModalOpen(true);
    };
    const handleQrModal = (id) => {
        setSubId(id)
        setIsQrModalOpen(true);
    };
    const handleSubModal = (id,carps,proteins,meals,expDate) => {
        setSubId(id)
        setCarps(carps)
        setMeals(meals)
        setProteins(proteins)
        setExpdate(expDate)
        setIsSubModalOpen(true);
    };
    const handleTransactionOpenModal = (id) => {
        setTransactionId(id)
        setIsTransactionModalOpen(true);
    };
    const getInfo = () => {
        axios.get('/api/restaurant')

            .then((res) => {
                const response = res.data.data;
                console.log(response)
                console.log(response.name)
                setInfo(response)

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getuser = () => {
        setLoading(true)
        axios.get('/api/profile', {
            headers: {
                'Authorization': `Bearer ${authCtx.token}`
            }
        }).then((res) => {
            const response = res.data.data;
            console.log(response)
            setProfile(response)
            setLoading(false)
        }).catch(err => console.log(err))
    }
    const getTransactions = () => {
        setLoading(true)
        axios.get('/api/transaction', {
            headers: {
                'Authorization': `Bearer ${authCtx.token}`
            }
        }).then((res) => {
            const response = res.data.data;
            console.log(response)
            setTransactions(response)
            setLoading(false)
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        getuser()
        getInfo()
    }, [])
    const getSubscribtion = () => {
        setLoading(true)
        axios.get('/api/subscription', {
            headers: {
                'Authorization': `Bearer ${authCtx.token}`
            }
        }).then((res) => {
            const response = res.data.data;
            console.log(response)
            setSub(response)
            setLoading(false)
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        getSubscribtion();
        getTransactions();
    }, [])
    return (
        <div className="font-tajawal min-h-screen relative">
            <div
                className="absolute inset-0 bg-no-repeat bg-center bg-cover"
                style={{
                    backgroundImage: `url(${info.image ? info.image : food})`,
                    opacity: 0.5,
                    zIndex: -1, // Pushes it behind the content
                }}
            ></div>
            <Navbar />
            <section>
                <div className="container-fluid relative">
                    <div className="profile-banner relative text-transparent">

                        <div className="relative shrink-0">
                            <img src={bg} className="h-80 w-full object-cover" id="profile-banner" alt="" />
                            <div className="absolute inset-0 bg-white/10"></div>
                            <label className="absolute inset-0 cursor-pointer" htmlFor="pro-banner"></label>
                        </div>
                    </div>
                </div>
                <div className="container relative md:mt-24 mt-16">
                    <div className="md:flex">
                        <div className="lg:w-1/4 md:w-1/3 md:px-3">
                            <div className="relative md:-mt-48 -mt-32">
                                <div className="p-6 rounded-md  ">
                                    <div className="profile-pic text-center mb-5">
                                        {/* <input id="pro-img" name="profile-image" type="file" className="hidden" /> */}
                                        <div>
                                            {
                                                !logged ? "" : (

                                                    <>
                                                        {loading ? <PreLoader></PreLoader> : <>

                                                            {/* <div className="relative size-28 mx-auto">
                                                            <img src={profile} className=" shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-green-800 w-[200px] h-[120px]" id="profile-image" alt="" style={{ borderRadius: "50%" }} />
                                                            <label className="absolute inset-0 cursor-pointer" htmlFor="pro-img"></label>
                                                        </div> */}

                                                            <div className="mt-[80px]">
                                                                <div>
                                                                    <h5 className="text-lg font-semibold">{userProfile.fullName} </h5>
                                                                    <div className='flex gap-3 mt-5 mr-8'>
                                                                        <span className='flex items-center justify-center rounded-full size-9 bg-orange-700'>
                                                                            <img src={phone} className="size-6" />
                                                                        </span>
                                                                        <p className="text-black mt-1">{userProfile.phone}</p>
                                                                    </div>
                                                                    <div className='flex  mt-5 mr-8'>

                                                                        {
                                                                            userProfile.location == '' ? "" : <span className='flex items-center justify-center rounded-full size-9 bg-orange-700'><img src={location} className="size-6" /></span>
                                                                        }


                                                                        <p className="text-black mt-1 mr-6">{userProfile.location}</p>
                                                                    </div>
                                                                    <div className='flex  mt-5 mr-8'>

                                                                        <p className="text-black mt-1">{userProfile.email}</p>
                                                                    </div>
                                                                    <div className='flex  mt-5 mr-8'>

                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleOpenModal();
                                                                        }} className="text-black mt-1 p-2 rounded-lg bg-white font-semibold hover:text-indigo-600">تعديل الملف الشخصي</button>
                                                                    </div>
                                                                </div>


                                                            </div>
                                                        </>}
                                                    </>

                                                )
                                            }
                                            <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
                                                <p className="text-gray-700">يرجى إدخال بياناتك للاشتراك</p>
                                                <button
                                                    className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
                                                    onClick={() => setIsModalOpen(false)}
                                                >
                                                    إغلاق
                                                </button>
                                            </ProfileModal>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-[30px] md:mt-0 ">
                            <div
                                className=" left-0 p-4 -mt-10 bg-white/50 backdrop-blur-3xl h-[220px] lg:w-[500px] shadow-md rounded-lg"
                                style={{ marginRight: "auto" }}
                            >
                                <h2 className='text-center font-bold text-xl'>النقاط</h2>
                                <hr className='mt-4' />
                                <div className="mt-4 flex items-center justify-center w-3/4">

                                    <div className="relative w-full h-2 bg-gray-300 rounded-lg">
                                        <div
                                            className="absolute top-0 right-0 h-2 bg-green-800 rounded-lg"
                                            style={{ width: "70%" }}
                                        ></div>
                                    </div>
                                    <span className="mr-4 text-gray-700 font-medium">70%</span>
                                </div>
                                <hr className='mt-4' />

                                <div className='flex justify-between mt-3'>
                                    <div className='flex gap-1'>
                                        <span className='bg-green-800 roun  ded size-4 mt-1'></span>
                                        <p className='font-semibold mr-2'>متبقي</p>
                                    </div>
                                    <div className='text-orange-400'>
                                        15 طلب
                                    </div>
                                </div>
                                <hr className='mt-4' />
                                <div className='flex justify-between mt-3'>
                                    <div className='flex gap-1'>
                                        <span className='bg-gray-300 rounded size-4 mt-1'></span>
                                        <p className='font-semibold mr-2'>مستهلك</p>
                                    </div>
                                    <div className='text-orange-400'>
                                        3 طلب
                                    </div>
                                </div>

                            </div>
                        </div> */}

                    </div>
                </div>

                {/* <div className="absolute left-10 -mt-52 p-4 backdrop-blur-3xl h-[220px] w-[500px] shadow-md rounded-lg">
                    <h2 className='text-center font-bold text-xl'>النقاط</h2>
                    <hr className='mt-4' />
                    <div className="mt-4 flex items-center justify-center w-3/4">

                        <div className="relative w-full h-2 bg-gray-300 rounded-lg">
                            <div
                                className="absolute top-0 right-0 h-2 bg-green-800 rounded-lg"
                                style={{ width: "70%" }}
                            ></div>
                        </div>
                        <span className="mr-4 text-gray-700 font-medium">70%</span>
                    </div>
                    <hr className='mt-4' />

                    <div className='flex justify-between mt-3'>
                        <div className='flex gap-1'>
                            <span className='bg-green-800 rounded size-4 mt-1'></span>
                            <p className='font-semibold mr-2'>متبقي</p>
                        </div>
                        <div className='text-orange-400'>
                            15 طلب
                        </div>
                    </div>
                    <hr className='mt-4' />
                    <div className='flex justify-between mt-3'>
                        <div className='flex gap-1'>
                            <span className='bg-gray-300 rounded size-4 mt-1'></span>
                            <p className='font-semibold mr-2'>مستهلك</p>
                        </div>
                        <div className='text-orange-400'>
                            3 طلب
                        </div>
                    </div>

                </div> */}
                {/* <section className="relative mt-10 backdrop-blur-3xl w-full flex justify-center">
                    <div className="container relative ">
                        <div className="grid grid-cols-2 pb-2 text-center mt-6">
                            <h3 className="mb-4 md:text-xl md:leading-normal text-2xl leading-normal font-semibold cursor-pointer hover:text-indigo-500" onClick={(e) => {
                                e.preventDefault();
                                handleOpenModal();
                            }}>تعديل</h3>
                            <h3 className="mb-4 md:text-xl md:leading-normal text-2xl leading-normal font-semibold">رمز QR Code</h3>

                        </div>
                    </div>
                </section> */}
                <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
                    <p className="text-gray-700">يرجى إدخال بياناتك للاشتراك</p>
                    <button
                        className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
                        onClick={() => setIsModalOpen(false)}
                    >
                        إغلاق
                    </button>
                </ProfileModal>
                {loading ? <PreLoader></PreLoader> :


                    <section className="relative mt-10 bg-white/50  flex justify-center">
                        <div className="container relative ">
                            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-[40px] pb-2 text-center mt-6 lg:mr-20 " >
                                {
                                    sub.map((item) => {
                                        return (
                                            <div
                                                className="  p-4  backdrop-blur-3xl  shadow-md rounded-lg"
                                                key={item.id}
                                            >
                                                <div className='flex gap-3 mr-8'>
                                                    <span className='flex items-center justify-center rounded-full size-6 mt-1 bg-orange-700'>

                                                    </span>
                                                    <p className="text-black mt-1 font-bold">معلومات الاشتراك</p>
                                                </div>
                                                <hr className='mt-4' />
                                                <div className="mt-4 flex items-center font-semibold justify-around w-3/4">

                                                    نوع الباقة : <span className='text-orange-400'>{item.mealPlan.name}</span>
                                                </div>
                                                <hr className='mt-4' />
                                                <div className="mt-4 flex items-center font-semibold justify-around w-3/4">

                                                    وصف : <span className='text-orange-400'>{item.mealPlan.description}</span>
                                                </div>
                                                <hr className='mt-4' />
                                                <div className="mt-4 flex items-center font-semibold justify-around w-3/4">

                                                    السعر : <span className='text-orange-400'>{item.mealPlan.price}</span>
                                                </div>
                                                <hr className='mt-4' />
                                                <div className="mt-4 flex items-center font-semibold justify-around w-3/4">

                                                    الوجبات المتبقية : <span className='text-orange-400'>{item.remainingMeals}</span>
                                                </div>

                                                <hr className='mt-4' />
                                                <div className='flex justify-around mt-3'>
                                                    <div className='flex gap-1'>
                                                        <span className='size-4 mt-1'> <img src={calender} alt="" /></span>
                                                        <p className='font-semibold mr-2 flex items-center justify-around'>تاريخ الإنتهاء : <span className='text-orange-400'>{item.endDate ? item.endDate.split('T')[0] : 'N/A'}  </span></p>
                                                    </div>
                                                    <div></div>

                                                </div>
                                                <hr className='mt-4' />
                                                <div className='flex justify-center items-center mt-3'>
                                                    <div className='flex gap-1'>
                                                        <span className='bg-gray-300 rounded size-4 mt-1'></span>
                                                        {
                                                            item.status === 'ACTIVE' && (

                                                                <button className='font-semibold mr-2 bg-green-700 rounded-lg p-2 text-white' onClick={(e) => {
                                                                e.preventDefault();
                                                                handleQrModal(item.id);
                                                            }}>Generate Qr Code</button>
                                                            )
                                                        }
                                                        {
                                                             item.status === 'INACTIVE' && (
                                                                <div className='flex flex-col justify-center items-center'>
                                                                    <p className='font-semibold text-red-500'>غير فعال </p>
                                                                    <button onClick={(e) => {
                                                                e.preventDefault();
                                                                handleSubModal(item.id, item.mealPlan.maxCarbs , item.mealPlan.proteinGrams , item.mealPlan.mealsCount, item.mealPlan.expAfter);
                                                            }} className='font-semibold mr-2 bg-green-700 rounded-lg p-2 text-white'> Reactive</button>
                                                                </div>
                                                             )
                                                        }
                                                        {
                                                             item.status === 'EXPIRED' && (
                                                                <div className='flex flex-col justify-center items-center'>
                                                                    <p className='font-semibold text-red-500'> تم انتهاء تاريخ الاشتراك </p>
                                                                    <button onClick={(e) => {
                                                                e.preventDefault();
                                                                handleSubModal(item.id, item.mealPlan.maxCarbs , item.mealPlan.proteinGrams , item.mealPlan.mealsCount,  item.mealPlan.expAfter);
                                                            }} className='font-semibold mr-2 bg-green-700 rounded-lg p-2 text-white'> Reactive</button>
                                                                </div>
                                                             )
                                                        }
                                                        {
                                                             item.status === 'SUSPENDED' && (
                                                                <div className='flex flex-col justify-center items-center'>
                                                                    <p className='font-semibold text-red-500'> تم ارسال الطلب بنجاح و يتم المراجعه من المطعم  </p>
                                                                    
                                                                </div>
                                                             )
                                                        }

                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    })
                                }
                                <QrCodeModal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} id={subId} >
                    <p className="text-gray-700">يرجى إدخال بياناتك للاشتراك</p>
                    <button
                        className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
                        onClick={() => setIsQrModalOpen(false)}
                    >
                        إغلاق
                    </button>
                </QrCodeModal>
                                <SubModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} id={subId} carps={carps} proteins={proteins} meals={meals} expdate={expDate}  >
                    <p className="text-gray-700">يرجى إدخال بياناتك للاشتراك</p>
                    <button
                        className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
                        onClick={() => setIsSubModalOpen(false)}
                    >
                        إغلاق
                    </button>
                </SubModal>

                                <div
                                    className="  p-4  backdrop-blur-3xl   shadow-md rounded-lg"

                                >
                                    <div className='flex gap-3 mr-8'>
                                        <span className='flex items-center justify-center rounded-full size-6 mt-1 bg-orange-700'>

                                        </span>
                                        <p className="text-black mt-1 font-bold"> معلومات الدفع (المحفوظه)</p>
                                    </div>
                                    <hr className='mt-4 border-white' />
                                    {
                                        transactions.map((item) => {
                                            return (<>

                                                <div className="mt-4 grid items-center font-semibold justify-between gap-5" key={item.id}>
                                                    <div className='flex justify-around gap-10 mr-5'>

                                                        <h2 className='font-bold'> المدفوع :</h2>
                                                        <span>{item.amount} ريال </span>
                                                    </div>

                                                    <div className='flex justify-around gap-10 mr-5 cursor-pointer hover:text-indigo-500' onClick={(e) => {
                                                        e.preventDefault();
                                                        handleTransactionOpenModal(item.id);
                                                    }}>
                                                        <h2 className='font-bold'> تاريخ العملية :</h2>
                                                        <span>{item.transactionDate}  </span>
                                                    </div>

                                                    <div className='flex justify-around gap-10 mr-5 cursor-pointer hover:text-indigo-500' onClick={(e) => {
                                                        e.preventDefault();
                                                        handleTransactionOpenModal(item.id);
                                                    }}>
                                                        <h2 className='font-bold'> رقم العملية :</h2>
                                                        <span>{item.transactionId}  </span>
                                                    </div>

                                                    <div className='flex justify-around gap-10 mr-5'>
                                                        <div className='flex gap-3 mr-8'>

                                                            <span className='flex items-center justify-center  size-4 mt-2'>
                                                                <img src={ellipse} />
                                                            </span>
                                                            <p className="text-black mt-1 font-bold">وسيلة الدفع  </p>
                                                        </div>
                                                        <div>
                                                            {item.paymentMethod === 'Card' ? <img src={visa} /> : <span className='font-bold text-xl'>{item.paymentMethod}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className='mt-4 border-white' />
                                            </>
                                            )
                                        })
                                    }


                                    {/* <div className="mt-4 flex items-center font-semibold justify-between w-3/4">
                                    <div className='flex gap-3 mr-8'>
                                        <span className='flex items-center justify-center  size-4 mt-2'>
                                            <img src={ellipse} />
                                        </span>
                                        <p className="text-black mt-1 font-bold">بطاقة ائتمناية</p>
                                    </div>
                                    <div>
                                        <img src={visa} className='size-9' />
                                    </div>
                                </div> */}
                                    {/* <hr className='mt-4' />
                                <div className='flex justify-between mt-3'>
                                    <div className='flex gap-1'>
                                        <span className='bg-gray-300 rounded size-4 mt-1'></span>
                                        <p className='font-semibold mr-2'>مستهلك</p>
                                    </div>
                                    <div className='text-orange-400'>
                                        3 طلب
                                    </div>
                                </div> */}

                                </div>

                            </div>
                        </div>
                    </section>
                }
                <TransactionModal isOpen={isTransactionModalOpen} onClose={() => setIsTransactionModalOpen(false)} id={transactionId}>
                    <p className="text-gray-700">يرجى إدخال بياناتك للاشتراك</p>
                    <button
                        className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
                        onClick={() => setIsTransactionModalOpen(false)}
                    >
                        إغلاق
                    </button>
                </TransactionModal>
                {/* <section className='container relative'>
                    <h2 className='font-bold text-2xl text-start p-4 mt-10 mb-10 mr-5'>الطلبات الحالية ( 4 طلبات ) </h2>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
                        {offersData.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="group relative rounded-2xl  dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-800 duration-500 ease-in-out m-2 mb-5 backdrop-blur-3xl  "
                                >

                                    <div className="py-1"></div>
                                    <div className="p-6 pt-0 -mt-10 text-center">

                                        <img
                                            src={item.image}
                                            className="size-20 rounded-full shadow-lg dark:shadow-gray-800 mx-auto"
                                            alt=""
                                        />

                                        <div className='flex justify-between -mt-8'>
                                            <span className='bg-white rounded-[50px] size-10'><img src={heart} /></span>

                                            <span><img src={arrow} /></span>
                                        </div>
                                        <div className="mt-4 text-start">
                                            <a
                                                href="#"
                                                className="font-medium text-xl hover:text-indigo-600 duration-500 ease-in-out block  mb-2"
                                            >
                                                {item.name}
                                            </a>

                                        </div>
                                        <div className='flex justify-between mt-5'>
                                            <a href="#" className="py-2 px-5 inline-flex items-center font-semibold tracking-wide align-middle duration-500 text-base text-center text-orange-400 rounded-md">وقت الإستلام  </a>

                                            <span className='flex items-center justify-center text-orange-400'>5:30 pm</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <section className='container relative'>
                    <h2 className='font-bold text-2xl text-start p-4 mt-10 mb-10 mr-5'> الطلبات السابقة </h2>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
                        {offersData.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="group relative rounded-2xl dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-800 duration-500 ease-in-out m-2 mb-5 backdrop-blur-3xl  "
                                >

                                    <div className="py-1"></div>
                                    <div className="p-6 pt-0 -mt-10 text-center">

                                        <img
                                            src={item.image}
                                            className="size-20 rounded-full shadow-lg dark:shadow-gray-800 mx-auto"
                                            alt=""
                                        />

                                        <div className='flex justify-between -mt-8'>
                                            <span className='bg-white rounded-[50px] size-10'><img src={heart} /></span>

                                            <span><img src={arrow} /></span>
                                        </div>
                                        <div className="mt-4 text-start">
                                            <a
                                                href="#"
                                                className="font-medium text-xl hover:text-indigo-600 duration-500 ease-in-out block  mb-2"
                                            >
                                                {item.name}
                                            </a>

                                        </div>
                                        <div className='flex justify-between mt-5'>
                                            <a href="#" className="py-2 px-5 inline-flex items-center font-semibold tracking-wide align-middle duration-500 text-base text-center text-green-500 rounded-md">تاريخ الإستلام  </a>

                                            <span className='flex items-center justify-center text-green-500'>17/10</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section> */}
            </section>
            <Footer />
        </div>
    )
}
