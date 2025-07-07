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

    const getCategeries = () => {
        setLoading(true);
        axios.get('/api/category')
            .then((res) => {
                const response = res.data.data;
                setCategories(response);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getSubCategeries = () => {
        setLoading(true);
        axios.get('/api/subCategory')
            .then((res) => {
                const response = res.data.data;
                setSubCategories(response);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getCategeries();
        getSubCategeries();
    }, []);

    const filterSubCategories = (id) => {
        setCategoryId(id); // Schedule state update
    };

    // Log the updated categoryId
    useEffect(() => {
        console.log("Updated categoryId:", categoryId);
    }, [categoryId]);

    const getFilteredSubCategories = () => {
        setLoading(true);
        axios.get(`/api/subCategory/filter/${categoryId}`)
            .then((res) => {
                const response = res.data.data;
                setFilteredSubCategories(response);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (categoryId) {
            getFilteredSubCategories();
        }
    }, [categoryId]);

    const filterItems = (id) => {
        setSubCategoryId(id);
    };
    useEffect(() => {
        console.log("Updated subcat categoryId:", subCategoryId);
    }, [subCategoryId]);

    const getFilteredItems = () => {
        setLoading(true);
        axios.get(`/api/item/filter/${subCategoryId}`)
            .then((res) => {
                const response = res.data.data;
                setFilteredItems(response);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        if (subCategoryId) {
            getFilteredItems();
        }
    }, [subCategoryId]);
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
            });
    };

    useEffect(() => {
        getMeals();
    }, []);

    return (
        <div className='font-tajawal min-h-screen relative'>
            <div
                className="absolute inset-0 bg-no-repeat bg-center bg-cover"
                style={{
                    backgroundImage: `url(${food})`,
                    opacity: 0.8,
                    zIndex: -1,
                }}
            ></div>
            <Navbar />
            <section className="relative md:py-24 py-16 flex justify-center">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">قائمة الطعام</h3>
                    </div>
                    <div className='flex'>
                        <div className="p-4">
                            <label htmlFor="category" className="block text-lg font-semibold mb-2">
                                اختر الفئة
                            </label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    const selectedCategory = categories.find(cat => cat.name === e.target.value);
                                    if (selectedCategory) {
                                        filterSubCategories(selectedCategory.id);
                                    }
                                }}
                                className="p-2 border rounded-md bg-white text-gray-700 focus:outline-none"
                            >
                                <option value="" disabled>اختر الفئة</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label htmlFor="subCategory" className="block text-lg font-semibold mb-2">
                                اختر النوع
                            </label>
                            <select
                                id="subCategory"
                                value={selectedSubCategory}
                                onChange={(e) => {
                                    setSelectedSubCategory(e.target.value);
                                    const selectedSubCategory = subCategories.find(subCat => subCat.name === e.target.value);
                                    if (selectedSubCategory) {
                                        filterItems(selectedSubCategory.id);
                                    }
                                }}
                                className="p-2 border rounded-md bg-white text-gray-700 focus:outline-none"
                            >
                                <option value="" disabled>اختر النوع</option>
                                {filteredSubCategories.length > 0
    ? filteredSubCategories.map((subCategory) => (
        <option key={subCategory.id} value={subCategory.name}>
            {subCategory.name}
        </option>
    ))
    : subCategories.map((subCategory) => (
        <option key={subCategory.id} value={subCategory.name}>
            {subCategory.name}
        </option>
    ))
}
                            </select>
                        </div>
                    </div>
                    {loading ? <PreLoader /> : (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2 mt-[30px]">
                            { filteredItems.length > 0 ? filteredItems?.map((item) => (
                                <div key={item.id} className="group relative rounded-2xl dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-800 duration-500 ease-in-out m-2 mb-5 backdrop-blur-3xl">
                                    <div className="py-1"></div>
                                    <div className="p-6 pt-0 -mt-10 text-center">
                                        <img
                                            src={item.image ? item.image : food}
                                            className="size-20 rounded-full shadow-lg dark:shadow-gray-800 mx-auto"
                                            alt=""
                                        />
                                        <div className="mt-4 text-start">
                                            <a href="#" className="font-medium text-xl hover:text-indigo-600 duration-500 ease-in-out block mt-10 mb-2">
                                                {item.name}
                                            </a>
                                            <h2 className='font-semibold mb-2'>النوع : <span>{item.subCategory.name}</span></h2>
                                            <h2>{item.description}</h2>
                                            <h2 className='mt-2 font-bold'>السعر : <span className='text-orange-600 font-semibold'>{item.price} ريال</span></h2>
                                        </div>
                                        <div className='flex justify-between mt-5'>
                                            <a href="#" className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-green-800 hover:bg-green-900 border-green-800 hover:border-green-900 text-white rounded-md">اشتري </a>
                                        </div>
                                    </div>
                                </div>
                            ) ) : <p className='font-bold'>No data found</p>}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}