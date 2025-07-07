import React, { useContext, useEffect, useState } from 'react'
import food from '../../src/assets/images/food.jpg'
import Navbar from '../components/Navbar'
import { offersData } from './data';
import arrow from '../assets/images/arrow.png'
import heart from '../assets/images/heart.png'
import bag from '../assets/images/bag.png'
import Footer from '../components/Footer';
import axios from 'axios';
import AuthContext from '../auth/auth-context';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';
import PreLoader from '../components/Preloader';
export default function MealsPlan() {
    const [plans, setPlans] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
        const [loading,setLoading] = useState(false)
    
    const [maxCarps, setMaxCarps] = useState(""); // Store selected carps
    const [proteins, setProteins] = useState(""); // Store selected proteins
    const [meals, setMeals] = useState(""); // Store selected proteins
    const [expDate, setexpDate] = useState(""); // Store selected proteins
    const [planId,setPlanId]=useState("")

    const handleOpenModal = (carps,proteins,meals,expdate,planId) => {
        setMaxCarps(carps); // Set before opening modal
        setProteins(proteins); // Set before opening modal
        setMeals(meals); // Set before opening modal
        setexpDate(expdate); // Set before opening modal
        setPlanId(planId)
        setIsModalOpen(true);
    };
    const Ctx = useContext(AuthContext)
    const getPlans = () => {
        setLoading(true)
        axios.get('/api/meal-plan')

            .then((res) => {
                const response = res.data.data;
                console.log(response)
                setPlans(response)
                Ctx.setMeals(response);
                setLoading(false)
                console.log(Ctx.meals)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(()=>{
        console.log(Ctx.meals)
        Ctx.setMeals(Ctx.meals)
    },[Ctx.meals])
    useEffect(() => {
        getPlans()

    }, [])
    return (
        <div className='font-tajawal min-h-screen relative'>
            <div
                className="absolute inset-0 bg-no-repeat bg-center bg-cover"
                style={{

                    backgroundImage: `url(${food})`,
                    opacity: 0.8,
                    zIndex: -1, // Pushes it behind the content
                }}
            ></div>
            <Navbar />
            {loading ? <PreLoader></PreLoader>:
             <section className='container relative w-[90%] '>
             <h2 className='font-bold text-2xl text-start p-4 mt-10 mb-10 mr-5'>العروض والباقات</h2>
             <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2 ">
                 {plans.map((item) => {
                     return (
                         <div
                             key={item.id}
                             className="group relative rounded-2xl  dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-800 duration-500 ease-in-out m-2 mb-5 backdrop-blur-3xl lg:mr-10"
                         >


                             <div className="py-1"></div>
                             <div className="p-6 pt-0  text-center">
                                 <img src={item.image ? item.image : food} className='h-56 w-full rounded-lg' />
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
                                     <Link  to={`/plans/${item.planCode}`}
                                         href="#"
                                         className="font-medium text-xl hover:text-indigo-600 duration-500 ease-in-out block mt-10 mb-2"
                                     >
                                         {item.name}
                                     </Link>
                                     <h2>{item.description}</h2>
                                     
                                     <h2 className='font-bold'>عدد الوجبات : <span className='font-semibold'>{item.mealsCount} وجبه</span></h2>
                                     <h2 className='font-bold'>أقصى وقت لاستهلاك الوجبات  : <span className='font-semibold'>{item.expAfter} يوم </span></h2>


                                 </div>
                                 <div className='flex justify-between mt-5'>
                                     <h2 className='mt-2 font-bold'>السعر : <span className='text-orange-600 font-semibold'>{item.price} ريال</span></h2>
                                     <a href="#" onClick={(e) => {
                                         e.preventDefault();
                                         handleOpenModal(item.maxCarbs,item.proteinGrams,item.mealsCount,item.expAfter,item.id);
                                     }} className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-green-800 hover:bg-green-900 border-green-800 hover:border-green-900 text-white rounded-md">اشترك </a>


                                 </div>
                             </div>
                         </div>
                     );
                 })}
                 <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} carps={maxCarps} proteins={proteins} meals={meals} expdate={expDate} planId={planId}>
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
            }
           
            <Footer />
        </div>
    )
}
