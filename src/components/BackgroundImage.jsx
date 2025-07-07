import React, { useEffect, useState } from 'react';
import food from '../assets/images/food.jpg';
import homeBG from '../assets/images/homeBG.jpg';
import resturantBG from '../assets/images/resturantBG.jpg';
import resturantBG2 from '../assets/images/resturantBG2.jpg';
import resturantBG3 from '../assets/images/resturantBG3.jpg';

const BackgroundImage = ({ variant = 'default', className = '', children }) => {
    const [currentBg, setCurrentBg] = useState(food);
    
    const backgrounds = {
        default: [food, homeBG, resturantBG],
        restaurant: [resturantBG, resturantBG2, resturantBG3],
        food: [food, homeBG],
        hero: [homeBG, resturantBG, resturantBG2]
    };

    useEffect(() => {
        const bgArray = backgrounds[variant] || backgrounds.default;
        const randomBg = bgArray[Math.floor(Math.random() * bgArray.length)];
        setCurrentBg(randomBg);
    }, [variant]);

    return (
        <div className={`relative ${className}`}>
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${currentBg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default BackgroundImage;