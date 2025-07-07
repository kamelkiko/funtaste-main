import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import plates from '../assets/images/plates.png';
import Footer from '../components/Footer';
import BackgroundImage from '../components/BackgroundImage';
import axios from 'axios';
import AuthContext from '../auth/auth-context';
import Modal from '../components/Modal';
import PreLoader from '../components/Preloader';

export default function Home() {
    const [meals, setMeals] = useState([]);
    const [bestPlans, setBestPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [maxCarps, setMaxCarps] = useState("");
    const [proteins, setProteins] = useState("");
    const [newMeals, setNewMeal] = useState("");
    const [expDate, setexpDate] = useState("");
    const [planId, setPlanId] = useState("");
    const [info, setInfo] = useState([]);

    const Ctx = useContext(AuthContext);

    const handleOpenModal = (carps, proteins, meals, expdate, planId) => {
        setMaxCarps(carps);
        setProteins(proteins);
        setNewMeal(meals);
        setexpDate(expdate);
        setPlanId(planId);
        setIsModalOpen(true);
    };

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

    const getMeals = () => {
        setLoading(true);
        axios.get('/api/item')
            .then((res) => {
                const response = res.data.data;
                setMeals(response);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getPlans = () => {
        setLoading(true);
        axios.get('/api/meal-plan')
            .then((res) => {
                const response = res.data.data;
                setBestPlans(response);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getMeals();
        getPlans();
        getInfo();
    }, []);

    return (
        <div className='font-tajawal bg-gray-50 min-h-screen'>
            <Navbar />
            
            {/* Hero Section */}
            <BackgroundImage variant="hero" className="relative overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-right space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                                    <span className="text-secondary-400 animate-glow">متعة</span> الطعام
                                    <br />
                                    <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                                        خيارك الأمثل
                                    </span>
                                </h1>
                                <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                                    استمتع بأفضل الأطباق العالمية مع باقات مميزة تناسب جميع الأذواق
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a 
                                    href="/plans" 
                                    className="group bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-glow-green"
                                >
                                    <span className="flex items-center justify-center">
                                        استكشف الباقات
                                        <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </a>
                                <a 
                                    href="/menu" 
                                    className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300"
                                >
                                    <span className="flex items-center justify-center">
                                        تصفح القائمة
                                        <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                        
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl animate-pulse"></div>
                                <img 
                                    src={plates} 
                                    className="relative h-80 lg:h-96 w-auto rounded-full shadow-2xl animate-float" 
                                    alt="أطباق المطعم"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </BackgroundImage>

            {/* Popular Meals Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            الوجبات الأكثر طلباً
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            اكتشف أشهى الأطباق المفضلة لدى عملائنا
                        </p>
                    </div>

                    {loading ? (
                        <PreLoader />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {meals?.slice(0, 6).map((item) => (
                                <div
                                    key={item.id}
                                    className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={item.image || '/api/placeholder/400/300'}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                            alt={item.name}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                                            جديد
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold bg-gradient-to-r from-secondary-600 to-secondary-700 bg-clip-text text-transparent">
                                                {item.price} ريال
                                            </span>
                                            <button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-glow-green">
                                                اطلب الآن
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Popular Plans Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            الباقات الأكثر طلباً
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            اختر الباقة التي تناسب احتياجاتك واستمتع بوجبات متنوعة
                        </p>
                    </div>

                    {loading ? (
                        <PreLoader />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {bestPlans?.slice(0, 3).map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 transform hover:-translate-y-3 overflow-hidden ${
                                        index === 1 ? 'ring-2 ring-primary-500 scale-105' : ''
                                    }`}
                                >
                                    {index === 1 && (
                                        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-center py-2 font-medium">
                                            الأكثر شعبية
                                        </div>
                                    )}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={item.image || '/api/placeholder/400/300'}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                            alt={item.name}
                                        />
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                                            {item.mealsCount} وجبة
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {item.description}
                                        </p>
                                        <div className="space-y-3 mb-6">
                                            <div className="flex justify-between items-center text-sm bg-gray-50 rounded-lg p-2">
                                                <span className="text-gray-600">مدة الاستهلاك:</span>
                                                <span className="font-medium text-primary-600">{item.expAfter} يوم</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm bg-gray-50 rounded-lg p-2">
                                                <span className="text-gray-600">البروتين:</span>
                                                <span className="font-medium text-primary-600">{item.proteinGrams} جرام</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-right">
                                                <span className="text-2xl font-bold bg-gradient-to-r from-secondary-600 to-secondary-700 bg-clip-text text-transparent">
                                                    {item.price}
                                                </span>
                                                <span className="text-gray-600 text-sm mr-1">ريال</span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleOpenModal(item.maxCarbs, item.proteinGrams, item.mealsCount, item.expAfter, item.id);
                                                }}
                                                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-glow-green"
                                            >
                                                اشترك الآن
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                carps={maxCarps} 
                proteins={proteins} 
                meals={newMeals} 
                expdate={expDate}
                planId={planId}
            />

            <Footer />
        </div>
    );
}