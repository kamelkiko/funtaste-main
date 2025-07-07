import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import food from '../assets/images/food.jpg';
import plates from '../assets/images/plates.png';
import Footer from '../components/Footer';
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
            <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-right">
                            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                                <span className="text-orange-400">متعة</span> الطعام
                                <br />
                                خيارك الأمثل
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                                استمتع بأفضل الأطباق العالمية مع باقات مميزة تناسب جميع الأذواق
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a 
                                    href="/plans" 
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    استكشف الباقات
                                </a>
                                <a 
                                    href="/menu" 
                                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                                >
                                    تصفح القائمة
                                </a>
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                                <img 
                                    src={plates} 
                                    className="relative h-80 lg:h-96 w-auto rounded-full shadow-2xl" 
                                    alt="أطباق المطعم"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Meals Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            الوجبات الأكثر طلباً
                        </h2>
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
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={item.image || food}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                            alt={item.name}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-orange-600">
                                                {item.price} ريال
                                            </span>
                                            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
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
            <section className="py-16 lg:py-24 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            الباقات الأكثر طلباً
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            اختر الباقة التي تناسب احتياجاتك واستمتع بوجبات متنوعة
                        </p>
                    </div>

                    {loading ? (
                        <PreLoader />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {bestPlans?.slice(0, 3).map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                                >
                                    <div className="relative">
                                        <img
                                            src={item.image || food}
                                            className="w-full h-48 object-cover"
                                            alt={item.name}
                                        />
                                        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {item.mealsCount} وجبة
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {item.description}
                                        </p>
                                        <div className="space-y-2 mb-6">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">مدة الاستهلاك:</span>
                                                <span className="font-medium">{item.expAfter} يوم</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">البروتين:</span>
                                                <span className="font-medium">{item.proteinGrams} جرام</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-orange-600">
                                                {item.price} ريال
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleOpenModal(item.maxCarbs, item.proteinGrams, item.mealsCount, item.expAfter, item.id);
                                                }}
                                                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
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