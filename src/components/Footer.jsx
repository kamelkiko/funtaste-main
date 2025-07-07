import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';
import axios from 'axios';

export default function Footer() {
    const [info, setInfo] = useState([]);

    const getInfo = () => {
        axios.get('/api/restaurant')
            .then((res) => {
                const response = res.data.data;
                setInfo(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Restaurant Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center mb-6">
                            <img src={logo} className="h-12 w-auto ml-3" alt="Restaurant Logo" />
                            {info.map((infoItem, index) => (
                                <h3 key={index} className="text-2xl font-bold">
                                    <span className="text-orange-400">{infoItem.name}</span>
                                </h3>
                            ))}
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            نقدم لكم أفضل تجربة طعام مع مجموعة متنوعة من الأطباق العالمية والباقات المميزة التي تناسب جميع الأذواق.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">تواصل معنا</h4>
                        {info.map((infoItem, index) => (
                            <div key={index} className="space-y-4">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-orange-400 ml-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span className="text-gray-300">{infoItem.email}</span>
                                </div>
                                {infoItem.phones?.map((phone, phoneIndex) => (
                                    <div key={phoneIndex} className="flex items-center">
                                        <svg className="w-5 h-5 text-orange-400 ml-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        <span className="text-gray-300">{phone}</span>
                                    </div>
                                ))}
                                {infoItem.addresses?.map((address, addressIndex) => (
                                    <div key={addressIndex} className="flex items-start">
                                        <svg className="w-5 h-5 text-orange-400 ml-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-300">{address}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">روابط سريعة</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    الرئيسية
                                </a>
                            </li>
                            <li>
                                <a href="/menu" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    القائمة
                                </a>
                            </li>
                            <li>
                                <a href="/plans" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    الباقات
                                </a>
                            </li>
                            <li>
                                <a href="/profile" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    حسابي
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Media */}
                <div className="border-t border-gray-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex space-x-6 mb-4 md:mb-0">
                            {info.map((infoItem, index) => (
                                <div key={index} className="flex space-x-4">
                                    {infoItem.socialMedia?.map((item, socialIndex) => (
                                        <a
                                            key={`${item.name}-${socialIndex}`}
                                            href={item.value}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-orange-400 transition-colors"
                                        >
                                            <span className="sr-only">{item.name}</span>
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                {item.name === 'Facebook' && (
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                )}
                                                {item.name === 'Instagram' && (
                                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z" />
                                                )}
                                                {item.name === 'X' && (
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                )}
                                                {item.name === 'LinkenIn' && (
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                )}
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-400 text-sm">
                            © 2024 جميع الحقوق محفوظة
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}