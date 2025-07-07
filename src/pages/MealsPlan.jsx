import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import food from '../../src/assets/images/food.jpg';
import axios from 'axios';
import AuthContext from '../auth/auth-context';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';
import PreLoader from '../components/Preloader';

export default function MealsPlan() {
    const [plans, setPlans] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [maxCarps, setMaxCarps] = useState("");
    const [proteins, setProteins] = useState("");
    const [meals, setMeals] = useState("");
    const [expDate, setexpDate] = useState("");
    const [planId, setPlanId] = useState("");

    const handleOpenModal = (carps, proteins, meals, expdate, planId) => {
        setMaxCarps(carps);
        setProteins(proteins);
        setMeals(meals);
        setexpDate(expdate);
        setPlanId(planId);
        setIsModalOpen(true);
    };

    const Ctx = useContext(AuthContext);

    const getPlans = () => {
        setLoading(true);
        axios.get('/api/meal-plan')
            .then((res) => {
                const response = res.data.data;
                setPlans(response);
                Ctx.setMeals(response);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getPlans();
    }, []);

    return (
        <div className='font-tajawal min-h-screen bg-gray-50'>
            <Navbar />
            
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">الباقات والعروض</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        اختر الباقة المناسبة لك واستمتع بوجبات متنوعة ولذيذة
                    </p>
                </div>
            </section>

            {/* Plans Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <PreLoader />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {plans.map((item) => (
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
                                        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {item.mealsCount} وجبة
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <Link 
                                            to={`/plans/${item.planCode}`}
                                            className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors mb-3 block"
                                        >
                                            {item.name}
                                        </Link>
                                        
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {item.description}
                                        </p>
                                        
                                        <div className="space-y-3 mb-6">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">مدة الاستهلاك:</span>
                                                <span className="font-medium text-gray-900">{item.expAfter} يوم</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">البروتين:</span>
                                                <span className="font-medium text-gray-900">{item.proteinGrams} جرام</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">الكربوهيدرات:</span>
                                                <span className="font-medium text-gray-900">حتى {item.maxCarbs} جرام</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-orange-600">
                                                    {item.price}
                                                </span>
                                                <span className="text-gray-600 text-sm mr-1">ريال</span>
                                            </div>
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
                meals={meals} 
                expdate={expDate} 
                planId={planId}
            />

            <Footer />
        </div>
    );
}