import React from 'react'
import food from '../assets/images/food.jpg';
import bg from '../assets/images/homeBG.jpg';
import arrow from '../assets/images/arrow.png'
import heart from '../assets/images/heart.png'
import bag from '../assets/images/bag.png'
import chief from '../assets/images/chief.png'
import Navbar from '../components/Navbar';
import { offersData } from './data';
import Footer from '../components/Footer';
export default function Offers() {
    return (
        <div className="font-tajawal min-h-screen relative">
            <div
                className="absolute inset-0 bg-no-repeat bg-center bg-cover"
                style={{
                    backgroundImage: `url(${food})`,
                    opacity: 0.5,
                    zIndex: -1, // Pushes it behind the content
                }}
            ></div>
            <Navbar />
            <div className="container-fluid relative">
                <div className="profile-banner relative text-transparent">

                    <div className="relative shrink-0">
                        <img src={bg} className="h-80 w-full object-cover" id="profile-banner" alt="" />
                        <div className="absolute inset-0 bg-white/10"></div>
                        <label className="absolute inset-0 cursor-pointer" htmlFor="pro-banner"></label>
                    </div>
                </div>
            </div>
            <section className='container relative'>
                <h2 className='font-bold text-2xl text-start p-4 mt-10 mb-10 mr-5'>الطلبات الحالية ( 4 طلبات ) </h2>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
                    {offersData.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="group relative rounded-2xl  dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-800 duration-500 ease-in-out m-2 mb-5 backdrop-blur-3xl h-[270px] lg:mr-10"
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
                                            className="font-medium text-xl hover:text-indigo-600 duration-500 ease-in-out block mt-10 mb-2"
                                        >
                                            {item.name}
                                        </a>
                                        <h2>{item.title}</h2>
                                        <h2 className='mt-2 font-bold'>السعر : <span className='text-orange-600 font-semibold'>270 ريال</span></h2>
                                    </div>
                                    <div className='flex justify-between mt-5'>
                                        <a href="#" className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-green-800 hover:bg-green-900 border-green-800 hover:border-green-900 text-white rounded-md">اشترك </a>

                                        <span className='bg-white rounded-[50px] size-10 flex items-center justify-center'><img src={bag} className='size-6' /></span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className='mt-10 mb-10 pb-6' style={{ backgroundColor: "#FFE3D4" }}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mr-10'>
                    <div>
                        <img src={chief} alt="" />
                    </div>
                    <div>
                        <h2 className='font-bold text-3xl' style={{ color: "#FC3B13" }}>متعة <span style={{ color: "#557C56" }}>الطعام</span></h2>
                        <p className='mt-8 font-semibold'>يقدم لك الإشتراك ميزة تحضير وجبتك قبل الوصول  </p>
                        <input type='text' placeholder='رقم الجوال +' className='w-[200px] p-2 mt-14 bg-white rounded-lg' />
                        <a href="#" className="py-1 mt-3  mr-10 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center  hover:bg-green-900   text-white rounded-xl" style={{ backgroundColor: "#557C56" }}>اشتراك </a>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
