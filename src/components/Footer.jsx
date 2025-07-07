import React, { useEffect, useState } from 'react'
import logo from '../assets/images/logo.png'
import mail from '../assets/images/mail.png'
import phoneImage from '../assets/images/phone.png'
import addressImage from '../assets/images/address.png'
import facebook from '../assets/images/facebook.png'
import x from '../assets/images/x.png'
import linkendIn from '../assets/images/linedIn.png'
import instA from '../assets/images/insta.png'

import axios from 'axios'
export default function Footer() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
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
    useEffect(() => {
        getInfo()

    }, [])
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 753);
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className="bg-white font-tajawal text-black">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1" style={{
                gridTemplateColumns: isSmallScreen ? "1fr" : "repeat(2, 1fr)",
            }}>
                {/* Logo Section */}
                <div className='flex xl:gap-[200px] justify-around md:justify-center lg:justify-center lg:gap-[50px] md:gap-[90px] text-xl mb-6 lg:mb-0 order-3 lg:order-2 '>
                    <div className="text-white font-bold text-xl mb-6 lg:mb-0">
                        <img src={logo} className='size-24' alt="Restaurant Logo" />
                        {
                            info.map((infoItem, index) => {
                                return (

                                    <div key={index} style={{ color: "#557C56" }} className=''>
                                        <span style={{ color: "#FC3B13" }}>{infoItem.name}</span>
                                        {/* <span style={{ color: "#FC3B13" }}>متعة </span>الطعام */}
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* Links Section */}
                    <div className="text-black text-xl md:mr-[50px]  mb-6 lg:mb-0">
                        <ul className=''>
                            <li className="mb-2 font-bold">من نحن</li>
                            <li className="mb-2">السياسات</li>
                            <li className="mb-2">الخصوصية</li>
                            <li className="mb-2">العروض</li>
                            <li className="mb-2">الأخبار</li>
                        </ul>
                    </div>

                </div>



                {/* Contact Section */}
                <div className="text-black flex 2xl:gap-[250px] justify-around md:justify-center lg:justify-center xl:gap-[200px] lg:gap-[150px] md:gap-[5px] sm:gap-[70px] text-xl mb-6 lg:mb-0 order-3 lg:order-2">
                    {
                        info.map((infoItem, index) => {
                            return (
                                <ul key={index} className=''>
                                    <li className="mb-2 font-bold">تواصل معنا</li>
                                    <li className="mb-2 flex gap-2">
                                        <img src={mail} alt="Email icon" />
                                        <span>{infoItem.email}</span>
                                    </li>
                                    {
                                        infoItem.phones.map((phone, phoneIndex) => {
                                            return (
                                                <li className="mb-2 flex gap-2" key={phoneIndex}>
                                                    <img src={phoneImage} alt="Phone icon" />
                                                    <span>{phone}</span>
                                                </li>
                                            )
                                        })
                                    }
                                    {
                                        infoItem.addresses.map((address, addressIndex) => {
                                            return (
                                                <li className="mb-2 flex gap-2" key={addressIndex}>
                                                    <img src={addressImage} alt="Address icon" />
                                                    <span>{address}</span>
                                                </li>
                                            )
                                        })
                                    }


                                    {/* {
                                        infoItem.socialMedia.map((item, index) => {
                                            return (
                                                <li className="mb-2 flex gap-2 lg:hidden" key={index}>
                                                    <div className="text-black order-4 md:hidden lg:order-3 lg:size-44 mt-5 md:size-36 sm:size-32">
                                                        <h2 className="font-bold text-xl">تابعنا</h2>
                                                        <div className='mt-4'>
                                                            <a href={item.value}>{item.name === 'Facebook' && <img src={facebook} className='w-48' />}</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    } */}
                                </ul>

                            )
                        })
                    }


                    {/* Social Media Section */}
                    <div className="hidden lg:block md:block text-black order-4 lg:order-3 lg:size-44 md:size-36 sm:size-32">
                        <h2 className="font-bold text-xl">تابعنا</h2>
                        {
                            info.map((infoItem, index) => {
                                return (
                                    <div key={index} className='mt-4 flex gap-2'>
                                        {
                                            infoItem.socialMedia.map((item, socialIndex) => {
                                                return (
                                                    item.name === 'Facebook' && <a key={`facebook-${socialIndex}`} href={item.value} target='_blank' rel="noopener noreferrer"> <img src={facebook} alt="Facebook icon" /></a> 
                                                )
                                            })}
                                        {
                                            infoItem.socialMedia.map((item, socialIndex) => {
                                                return (
                                                    item.name === 'LinkenIn' && <a key={`linkedin-${socialIndex}`} href={item.value} target='_blank' rel="noopener noreferrer"> <img src={linkendIn} alt="LinkedIn icon" /></a> 
                                                )
                                            })}
                                        {
                                            infoItem.socialMedia.map((item, socialIndex) => {
                                                return (
                                                    item.name === 'X' && <a key={`x-${socialIndex}`} href={item.value} target='_blank' rel="noopener noreferrer"> <img src={x} alt="X (Twitter) icon" /></a> 
                                                )
                                            })}
                                        {
                                            infoItem.socialMedia.map((item, socialIndex) => {
                                                return (
                                                    item.name === 'Instagram' && <a key={`instagram-${socialIndex}`} href={item.value} target='_blank' rel="noopener noreferrer"> <img src={instA} alt="Instagram icon" /></a> 
                                                )
                                            })}
                                    </div>)
                            })}
                    </div>

                </div>


            </div>
        </div>

    )
}