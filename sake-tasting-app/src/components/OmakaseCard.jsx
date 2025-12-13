// --- src/components/OmakaseCard.jsx (FIXED) ---

import React from 'react';
import { DollarSign } from 'lucide-react'; 
import { Card } from './Utility';

// This component is purely for display and purchase information
const OmakaseCard = ({ item }) => {

    const getCardColors = (itemId) => {
        const prefix = itemId[0].toLowerCase(); 

        if (prefix === 's') {
            // Pink theme for Sake (IDs starting with 's')
            return {
                bg: 'bg-pink-100',          
                border: 'border-pink-400',  
                headerText: 'text-pink-800' // Corrected text color to match pink theme
            };
        } else if (prefix === 'w') {
            // Orange theme for Whisky (IDs starting with 'w')
            return {
                bg: 'bg-orange-100',        
                border: 'border-orange-400',
                headerText: 'text-orange-800' // Corrected text color to match orange theme
            };
        } else {
            // Default colors for unknown IDs
            return {
                bg: 'bg-gray-100',
                border: 'border-gray-400',
                headerText: 'text-gray-800'
            };
        }
    };

    const colors = getCardColors(item.id);

    return (
        // The main Card wrapper is already correct using backticks:
        <Card className={`flex flex-col justify-between items-start space-y-3 ${colors.bg} ${colors.border}`}>
            
            {/* Header Content */}
            <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                    {/* 🚀 FIX 1: Change single quotes to BACKTICKS (`) */}
                    <h3 className={`text-lg font-bold ${colors.headerText}`}>
                        {item.name}
                    </h3>
                    <p className="text-sm font-semibold text-gray-700">{item.type}</p>
                </div>
                <p className="text-sm text-gray-600">{item.brewery} | ABV: {item.abv}</p>
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-700">{item.description}</p>
            
            {/* Flavor Profile & Pairing */}
            <div className="w-full flex justify-between text-xs text-gray-500 border-t border-gray-100 pt-2">
                <p className="font-medium">Flavor: <span className="italic font-normal">{item.flavor}</span></p>
                <p className="font-medium">Pairs: <span className="italic font-normal">{item.pairs}</span></p>
            </div>


            {/* For Sale Call to Action */}
            <div className="w-full flex justify-center items-center pt-2 border-t border-blue-100 mt-3">
                {/* 🚀 FIX 2: Change single quotes to BACKTICKS (`) */}
                <DollarSign className={`w-5 h-5 mr-2 ${colors.headerText}`}/>
                {/* 🚀 FIX 3: Change single quotes to BACKTICKS (`) */}
                <span className={`text-lg font-bold ${colors.headerText}`}>Available for Purchase</span>
            </div>
        </Card>
    );
};

export default OmakaseCard;