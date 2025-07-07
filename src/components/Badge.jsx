import React from 'react';

const Badge = ({ 
    count, 
    color = 'red', 
    size = 'sm', 
    position = 'top-right',
    className = '',
    children 
}) => {
    if (!count || count === 0) return children;

    const sizeClasses = {
        xs: 'h-4 w-4 text-xs',
        sm: 'h-5 w-5 text-xs',
        md: 'h-6 w-6 text-sm',
        lg: 'h-7 w-7 text-sm'
    };

    const colorClasses = {
        red: 'bg-red-500 text-white',
        green: 'bg-green-500 text-white',
        blue: 'bg-blue-500 text-white',
        yellow: 'bg-yellow-500 text-black',
        purple: 'bg-purple-500 text-white',
        orange: 'bg-orange-500 text-white'
    };

    const positionClasses = {
        'top-right': '-top-2 -right-2',
        'top-left': '-top-2 -left-2',
        'bottom-right': '-bottom-2 -right-2',
        'bottom-left': '-bottom-2 -left-2'
    };

    const displayCount = count > 99 ? '99+' : count.toString();

    return (
        <div className="relative inline-block">
            {children}
            <span
                className={`
                    absolute ${positionClasses[position]} 
                    ${sizeClasses[size]} 
                    ${colorClasses[color]}
                    ${className}
                    flex items-center justify-center
                    rounded-full font-bold
                    shadow-lg border-2 border-white dark:border-gray-800
                    animate-pulse
                    transform transition-all duration-300 hover:scale-110
                `}
            >
                {displayCount}
            </span>
        </div>
    );
};

export default Badge;