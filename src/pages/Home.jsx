import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import homeBG from '../assets/images/homeBG.jpg'
import food from '../assets/images/food.jpg'
import plates from '../assets/images/plates.png'
import character from '../assets/images/character.png'
import wallet from '../assets/images/wallet.png'
import arrow from '../assets/images/arrow.png'
import heart from '../assets/images/heart.png'
import bag from '../assets/images/bag.png'
import stars from '../assets/images/stars.png'
import person from '../assets/images/person.jpg'
import { aboutData, creatorsData, offersData } from './data'
import Footer from '../components/Footer'
import Navbartwo from '../components/Navbartwo'
import axios from 'axios'
import AuthContext from '../auth/auth-context'
import Modal from '../components/Modal'
import PreLoader from '../components/Preloader'
export default function Home() {
    const [meals, setMeals] = useState([]);
    const [bestPlans, setBestPlans]=useState([])
    const [loading,setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
        const [maxCarps, setMaxCarps] = useState(""); // Store selected carps
        const [proteins, setProteins] = useState(""); // Store selected proteins
        const [newMeals, setNewMeal] = useState(""); // Store selected proteins
        const [expDate, setexpDate] = useState(""); // Store selected proteins
        const [info, setInfo] = useState([]);
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
    
        const handleOpenModal = (carps,proteins,meals,expdate) => {
            setMaxCarps(carps); // Set before opening modal
            setProteins(proteins); // Set before opening modal
            setNewMeal(meals); // Set before opening modal
            setexpDate(expdate); // Set before opening modal
            setIsModalOpen(true);
        };
    const Ctx = useContext(AuthContext);
    const plans = Ctx.meals;
    useEffect(()=>{
            console.log(Ctx.meals)
            
        },[Ctx.meals])
    
    const getMeals = () => {
        setLoading(true)
        console.log(loading)
        axios.get('/api/item')

            .then((res) => {
                const response = res.data.data;
                console.log(res.data)
                setMeals(response)
                console.log(response)
                console.log(loading)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
            // .finally(()=>setLoading(false))
    }
    const getPlans = () => {
        setLoading(true)
        axios.get('/api/meal-plan')

            .then((res) => {
                const response = res.data.data;
                console.log(response)
                setBestPlans(response)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
            // .finally(()=>setLoading(false))
    }

    useEffect(() => {
        getMeals()
        getPlans()
        getInfo()
    }, [])
    
    return (
        <div className='font-tajawal relative'>
            <div
                className="absolute inset-0 bg-no-repeat bg-center bg-cover"
                style={{
                    backgroundImage: `url(${info.image ? info.image : food})`,
                    opacity: 0.5,
                    zIndex: -1, // Pushes it behind the content
                }}
            ></div>
            <Navbar />
            <section className="relative md:py-28 py-36 bg-right bg-no-repeat bg-cover" style={{ backgroundImage: `url(${homeBG})` }}>
                <div className="absolute inset-0 bg-slate-900/70"></div>
                <div className="container relative">
                    <div className="flex flex-col lg:flex-row md:flex-row   items-center justify-between space-y-8 lg:space-y-0">
                        <div className="text-right mr-[20px] mb-20 flex-1">
                            <h4 className="font-bold  text-[48px]  text-white mb-[20px]">
                                <span className='text-orange-600'>متعة</span> الطعام خيارك الأمثل<br />في كل الأوقات
                            </h4>
                            <span className="text-white/80 font-semibold mb-4 text-[24px] ">
                                أجعل اوقاتك المميزة دائما مع عروضنا التي لا تنتهي وإشترك<br /> في باقات الطعام مع مختلف الاطباق العالمية
                            </span>

                            <div className="mt-8 flex gap-4 justify-center lg:justify-start md:justify-start sm:justify-start  flex-wrap">
                                <a href="#" className="py-2 px-5 inline-flex items-center  font-semibold tracking-wide border align-middle duration-500 text-base text-center hover:bg-green-900 border-green-800 hover:border-green-900 text-white rounded-xl " style={{ backgroundColor: "#557C56" }}>
                                    اشترك معنا
                                </a>
                                <a href="#" className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center hover:bg-orange-500 border-orange-400 hover:border-orange-500 text-white rounded-xl " style={{ backgroundColor: "#FF885B" }}>
                                    اتصل بنا
                                </a>
                            </div>
                        </div>

                        <div className="flex justify-center lg:justify-end md:justify-end flex-1 ">
                            <img src={plates} className='h-[450px] lg:h-[450px] w-auto rounded-full' />
                        </div>
                    </div>

                </div>
            </section>
            {/* <section className="relative md:py-24 py-16 -mt-48 flex  justify-center">
                <div className="container relative ">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
                        {creatorsData.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="group relative rounded-2xl dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-800 duration-500 ease-in-out m-2 mb-5 backdrop-blur-[45px] bg-white/50 h-[160px]"
                                >

                                    <div className="py-1"></div>
                                    <div className="p-6 pt-0 -mt-10 text-center">
                                        <img
                                            src={item.image}
                                            className="size-20 rounded-full shadow-lg dark:shadow-gray-800 mx-auto"
                                            alt=""
                                        />
                                        <div className="mt-4">
                                            <a
                                                href="#"
                                                className="text-lg font-semibold hover:text-indigo-600 duration-500 ease-in-out block mt-10"
                                            >
                                                {item.name}
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section> */}
            <section className="relative md:py-24 py-16 flex justify-center">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">الوجبات الأكثر طلبا</h3>


                    </div>

                        {loading ? <PreLoader></PreLoader> : 
                            
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
                        {meals?.slice(0,6).map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="group relative rounded-2xl dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-800 duration-500 ease-in-out m-2 mb-5 backdrop-blur-3xl  "
                                >

                                    <div className="py-1"></div>
                                    <div className="p-6 pt-0 -mt-10 text-center">

                                        <img
                                            src={item.image ? item.image : food}
                                            className="size-20 rounded-full shadow-lg dark:shadow-gray-800 mx-auto"
                                            alt=""
                                        />

                                        <div className='flex justify-between -mt-8'>
                                            {/* <span className='bg-white rounded-[50px] size-10'><img src={heart} /></span>

                                            <span><img src={arrow} /></span> */}
                                        </div>
                                        <div className="mt-4 text-start">
                                            <a
                                                href="#"
                                                className="font-medium text-xl hover:text-indigo-600 duration-500 ease-in-out block mt-10 mb-2"
                                            >
                                                {item.name}
                                            </a>
                                            <h2>{item.description}</h2>
                                            <h2 className='mt-2 font-bold'>السعر : <span className='text-orange-600 font-semibold'>{item.price} ريال</span></h2>
                                        </div>
                                        <div className='flex justify-between mt-5'>
                                            <a href="#" className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-green-800 hover:bg-green-900 border-green-800 hover:border-green-900 text-white rounded-md">اشتري </a>

                                            {/* <span className='bg-white rounded-[50px] size-10 flex items-center justify-center'><img src={bag} className='size-6' /></span> */}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                        }
                </div>
            </section>
            <section className="relative md:py-24 py-16 flex justify-center">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">الباقات الأكثر طلبا</h3>


                    </div>
                    {loading ?  <PreLoader></PreLoader> : 

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
                        {bestPlans?.slice(0,3).map((item, index) => {
                            return (
                                <div
                                    key={item.id}
                                    className="group relative rounded-2xl  dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-800 duration-500 ease-in-out m-2 mb-5 backdrop-blur-3xl lg:mr-10"
                                >
    
                                    <div className="py-1"></div>
                                    <div className="p-6 pt-0  text-center">
                                        <img src={item.image ? item.image : food} className='h-52 w-full rounded-lg' />
                                        {/* <img
                                            src={item.image}
                                            className="size-20 rounded-full shadow-lg dark:shadow-gray-800 mx-auto"
                                            alt=""
                                        />
    
                                        <div className='flex justify-between -mt-8'>
                                            <span className='bg-white rounded-[50px] size-10'><img src={heart} /></span>
    
                                            <span><img src={arrow} /></span>
                                        </div> */}
                                        <div className="mt-4 text-start">
                                            <a
                                                href="#"
                                                className="font-medium text-xl hover:text-indigo-600 duration-500 ease-in-out block mt-10 mb-2"
                                            >
                                                {item.name}
                                            </a>
                                            <h2>{item.description}</h2>
                                            <h2 className='font-bold'>عدد الوجبات : <span className='font-semibold'>{item.mealsCount} وجبه</span></h2>
                                        <h2 className='font-bold'>أقصى وقت لاستهلاك الوجبات  : <span className='font-semibold'>{item.expAfter} يوم </span></h2>
                                        </div>
                                        <div className='flex justify-between mt-5'>
                                            <h2 className='mt-2 font-bold'>السعر : <span className='text-orange-600 font-semibold'>{item.price} ريال</span></h2>
                                            <a href="#" onClick={(e) => {
                                            e.preventDefault();
                                            handleOpenModal(item.maxCarbs,item.proteinGrams,item.mealsCount,item.expAfter);
                                        }} className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-green-800 hover:bg-green-900 border-green-800 hover:border-green-900 text-white rounded-md">اشترك </a>
    
    
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    }
                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} carps={maxCarps} proteins={proteins} meals={newMeals} expdate={expDate}>
                        <p className="text-gray-700">يرجى إدخال بياناتك للاشتراك</p>
                        <button
                            className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
                            onClick={() => setIsModalOpen(false)}
                        >
                            إغلاق
                        </button>
                    </Modal>
                </div>
            </section>
            <section className="relative ml-16 bg-slate-400/50 w-full flex justify-center">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-start mr-10">
                        <h3 className=" mt-14 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">عن مطعمنا</h3>


                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
                        {aboutData.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="group relative rounded-2xl   m-2 mb-5 "
                                >

                                    <img src={item.image} className='h-[245px]  w-full rounded-lg' />
                                    <div className='mt-5 font-base'>{item.title}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="relative ml-16 bg-slate-400/50 w-full mt-14 flex justify-center">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <div className="flex flex-col items-center justify-center mt-14">
                            <img src={character} className="mb-4" />
                            <h3 className=" md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
                                الأسئلة الشائعة ..؟
                            </h3>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
                        {aboutData.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="group relative rounded-2xl  m-2 mb-5 h-[245px]" style={{ backgroundColor: "#80A881" }}
                                >

                                    <div className="py-1"></div>
                                    <div className="p-6 text-center">
                                        <div className="size-24 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: "#FE6339" }}>
                                            <img src={wallet} className="object-contain" />
                                        </div>

                                        <div className="mt-4">
                                            <a
                                                href="#"
                                                className="text-2xl font-base text-white hover:text-indigo-600 duration-500 ease-in-out block mt-10"
                                            >
                                                1- طرق الدفع المقبولة
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="relative ml-16 bg-slate-400/50 w-full mt-10 flex justify-center">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-start mr-10">
                        <h3 className=" mt-14 md:text-3xl md:leading-normal text-2xl leading-normal font-base">أراء عملائنا</h3>


                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
                        {aboutData.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="group relative rounded-2xl  m-2 mb-5 bg-gray-300 shadow-lg backdrop-blur-none"
                                >

                                    <div className="py-1"></div>
                                    <div className="p-6 text-center">
                                        <div className='flex justify-between'>
                                            <div className=" flex flex-col" >
                                                <img src={person} className="size-16 rounded-full " />
                                                <div className='font-semibold'>ندى صالح</div>
                                            </div>
                                            <div className='flex flex-col'>
                                                <div><img src={stars} className='' /></div>
                                                <div className='mt-4 w-10 rounded-lg px-2' style={{ backgroundColor: "#FFE3D4" }}>4.5</div>
                                            </div>
                                        </div>

                                        <div className="mt-4 text-start">
                                            <a
                                                href="#"
                                                className="text-lg font-base text-black hover:text-indigo-600 duration-500 ease-in-out block mt-10"
                                            >
                                                أجواء منسابة وهادئة لتناول وجبتك المفضلة مع
                                                العائلة , استمتع بأفضل الاجواء المناسبة
                                                لذوقك الشخصي .
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-1 pb-8 items-center">
                            <a
                                href="#"
                                className="py-2 px-5 items-center font-semibold tracking-wide align-middle duration-500 text-base text-center  hover:bg-green-900 hover:border-green-900 text-white rounded-2xl w-36" style={{ backgroundColor: "#557C56" }}>
                                اكتب تقييمك
                            </a>
                        </div>
                    </div>

                </div>

            </section>
            <Footer />
        </div>
    )
}