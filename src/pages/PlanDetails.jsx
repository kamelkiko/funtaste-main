import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import food from '../../src/assets/images/food.jpg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PreLoader from '../components/Preloader';
import Modal from '../components/Modal';

export default function PlanDetails() {
    const [price, setPrice] = useState(0);
    const [newPrice, setNewPrice] = useState(price);
    const [proteins, setProteins] = useState(150);
    const [isModalOpen, setIsModalOpen] = useState(false);
        const [loading,setLoading] = useState(false)
    
    const [newProteins, setNewProteins] = useState(proteins);
    const [proteinValue, setProteinValue] = useState(0);
    const [plans, setPLans] = useState([]);
    const [planDetails, setPLanDetails] = useState({});
    const [gramList, setGramList] = useState([]);
    const [selectedGrams, setSelectedGrams] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0); 
     const [maxCarps, setMaxCarps] = useState(""); // Store selected carps
        const [maxProteins, setmaxProteins] = useState(""); // Store selected proteins
        const [meals, setMeals] = useState(""); // Store selected proteins
        const [expDate, setexpDate] = useState(""); // Store selected proteins
        const [planId,setPlanId]=useState("")
    
        const handleOpenModal = (carps,proteins,meals,expdate,planId) => {
            setMaxCarps(carps); // Set before opening modal
            setmaxProteins(proteins); // Set before opening modal
            setMeals(meals); // Set before opening modal
            setexpDate(expdate); // Set before opening modal
            setPlanId(planId)
            setIsModalOpen(true);
        };

    const { id } = useParams();

    const getPlan = () => {
        setLoading(true)
        axios.get('/api/meal-plan')

            .then((res) => {
                const response = res.data.data;
                console.log(response);
                setPLans(response);
                const singlePlan = response.find(plan => plan.planCode == id);
                console.log(singlePlan);
                setPLanDetails(singlePlan);
                setLoading(false)
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getPlan();
    }, []);

    const handleInput = (e, index) => {
        const { value } = e.target;
        console.log(index)
        setProteinValue(Number(value));
        setSelectedIndex(index); // Update index
        console.log(proteinValue)
    };

    // Update newProteins when proteinValue or planDetails changes
    useEffect(() => {
        if (planDetails.proteinGrams) {
            setNewProteins(Number(planDetails.proteinGrams + proteinValue));
        }
    }, [proteinValue, planDetails]);

    // Generate gram list when planDetails changes
    useEffect(() => {
        if (planDetails.maxExtraGrams && planDetails.incrementStep) {
            const grams = [];
            for (let i = 0; i <= planDetails.maxExtraGrams; i += planDetails.incrementStep) {
                grams.push(i);
            }
            setGramList(grams);
        }
    }, [planDetails.maxExtraGrams, planDetails.incrementStep]);


    useEffect(() => {
        if (planDetails.price && planDetails.pricePerGram) {
           
            setNewPrice(Number(planDetails.price + (planDetails.pricePerGram * selectedIndex)));
        }
    }, [selectedIndex, planDetails]);

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
            <h2 className='font-bold text-2xl text-start p-4 mt-10 mb-10 mr-5'>تفاصيل الباقه</h2>
            {loading ? <PreLoader></PreLoader>:
              <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2 p-4 pr-5 items-center">
              <div className='flex flex-col bg-slate-200 p-10 gap-5' style={{ borderRadius: "20px" }}>
                  <h2 className='font-bold'>الاسم : <span className='font-semibold text-orange-500'>{planDetails.name} </span></h2>
                  <h2 className='font-bold'>الوصف : <span className='font-semibold text-orange-500'>{planDetails.description}</span></h2>
                  <h2 className='font-bold'>عدد الوجبات : <span className='font-semibold text-orange-500'>{planDetails.mealsCount} وجبة</span></h2>
                  <h2 className='font-bold'>البروتين : <span className='font-semibold text-orange-500'> {newProteins} جرام</span></h2>
                  <h2 className='font-bold'> الكاربوهيدرات المتاحه : <span className='font-semibold text-orange-500'> {planDetails.maxCarbs} جرام</span></h2>
                  <h2 className='font-bold'>يمكنك زيادة عدد جرامات البروتين بالمقدار التالي :</h2>

                  <form className="flex gap-2">
                      {gramList.map((value, index) => (
                          <label key={value} className="flex items-center gap-2 cursor-pointer">
                              <input
                                  type="radio"
                                  name="grams"
                                  value={value}
                                  checked={selectedGrams === value}
                                  onChange={(e) => {
                                      setSelectedGrams(value);
                                      handleInput(e, index); // Pass the index to handleInput
                                  }}
                                  className="hidden peer"
                              />
                              <span className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
                                  {value} جرام
                              </span>
                          </label>
                      ))}
                  </form>

                  <h2 className='font-bold'>  السعر : <span className='font-semibold text-orange-500'> {newPrice} ريال</span></h2>
                  <div className='flex justify-center'>
                      <a href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal(planDetails.maxCarbs,planDetails.proteinGrams,planDetails.mealsCount,planDetails.expAfter,planDetails.id);
                    }}
                      className="py-2 px-5 inline-flex w-24 justify-center items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-green-800 hover:bg-green-900 border-green-800 hover:border-green-900 text-white rounded-md">اشترك </a>
                  </div>
              </div>

              {planDetails.image ? <img src={planDetails.image} className='rounded-xl h-[500px] lg:mr-[200px]' /> : <img src={food} className='rounded-xl h-[500px] lg:mr-[200px]' />}
          </div>
            }
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} carps={maxCarps} proteins={maxProteins} meals={meals} expdate={expDate} planId={planId} proteinValue={proteinValue}>
                     <p className="text-gray-700">يرجى إدخال بياناتك للاشتراك</p>
                     <button
                         className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
                         onClick={() => setIsModalOpen(false)}
                     >
                         إغلاق
                         </button>
                         </Modal>
          
            <Footer />
        </div>
    );
}