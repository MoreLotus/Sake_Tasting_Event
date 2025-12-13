import React from 'react';
import { Star, Loader2, AlertTriangle } from 'lucide-react';

export const StarRating = ({ rating, size = 20, onRate }) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        const isFilled = i <= fullStars;
        stars.push(
            <Star
                key={i}
                size={size}
                className={`cursor-pointer transition-colors duration-200 ${
                    isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => onRate(i)}
            />
        );
    }
    return <div className="flex space-x-1">{stars}</div>;
};

export const Card = ({ children, className = '' }) => (
    <div className={` p-4 shadow-xl rounded-xl border ${className}`}>
        {children}
    </div>
);

export const Loader = ({ message = "Loading..." }) => (
    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="mt-4 text-lg">{message}</p>
    </div>
);

export const ErrorMessage = ({ message }) => (
    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-blue-700 rounded-md flex items-center">
        <AlertTriangle className="w-5 h-5 mr-3" />
        <p className="font-medium">{message}</p>
    </div>
);