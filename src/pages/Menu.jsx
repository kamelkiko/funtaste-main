import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import food from '../../src/assets/images/food.jpg';
import Footer from '../components/Footer';
import PreLoader from '../components/Preloader';

export default function Menu() {
    const [meals, setMeals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [loading, setLoading] = useState(false);

    const getCategories = () => {
        setLoading(true);
        axios.get('/api/category')
            .then((res) => {
                const response = res.data.data;
                setCategories(response);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getSubCategories = () => {
        axios.get('/api/subCategory')
            .then((res) => {
                const response = res.data.data;
                setSubCategories(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getFilteredSubCategories = () => {
        if (!categoryId) return;
        setLoading(true);
        axios.get(`/api/subCategory/filter/${categoryId}`)
            .then((res) => {
                const response = res.data.data;
                setFilteredSubCategories(response);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getFilteredItems = () => {
        if (!subCategoryId) return;
        setLoading(true);
        axios.get(`/api/item/filter/${subCategoryId}`)
            .then((res) => {
                const response = res.data.data;
                setFilteredItems(response);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
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

    useEffect(() => {
        getCategories();
        getSubCategories();
        getMeals();
    }, []);

    useEffect(() => {
        if (categoryId) {
            getFilteredSubCategories();
        }
    }, [categoryId]);

    useEffect(() => {
        if (subCategoryId) {
            getFilteredItems();
        }
    }, [subCategoryId]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        const selectedCategory = categories.find(cat => cat.name === e.target.value);
        if (selectedCategory) {
            setCategoryId(selectedCategory.id);
        }
        setSelectedSubCategory("");
        setSubCategoryId("");
        setFilteredItems([]);
    };

    const handleSubCategoryChange = (e) => {
        setSelectedSubCategory(e.target.value);
        const selectedSubCategory = (filteredSubCategories.length > 0 ? filteredSubCategories : subCategories)
            .find(subCat => subCat.name === e.target.value);
        if (selectedSubCategory) {
            setSubCategoryId(selectedSubCategory.id);
        }
    };

    const displayItems = filteredItems.length > 0 ? filteredItems : meals;

    return (
        <div className='font-tajawal min-h-screen bg-gray-50'>
            <Navbar />
            
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">قائمة الطعام</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        اكتشف مجموعة متنوعة من الأطباق الشهية المحضرة بأجود المكونات
                    </p>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-8 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                اختر الفئة
                            </label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="">جميع الفئات</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="flex-1">
                            <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 mb-2">
                                اختر النوع
                            </label>
                            <select
                                id="subCategory"
                                value={selectedSubCategory}
                                onChange={handleSubCategoryChange}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="">جميع الأنواع</option>
                                {(filteredSubCategories.length > 0 ? filteredSubCategories : subCategories).map((subCategory) => (
                                    <option key={subCategory.id} value={subCategory.name}>
                                        {subCategory.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Items Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <PreLoader />
                    ) : displayItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {displayItems.map((item) => (
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
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            {item.name}
                                        </h3>
                                        {item.subCategory && (
                                            <p className="text-sm text-primary-600 font-medium mb-2">
                                                {item.subCategory.name}
                                            </p>
                                        )}
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold text-orange-600">
                                                {item.price} ريال
                                            </span>
                                            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                                اطلب الآن
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عناصر</h3>
                            <p className="text-gray-600">لم يتم العثور على أي عناصر تطابق المعايير المحددة</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}