import React from 'react';
import { DollarSign } from 'lucide-react'; 
import { Card } from './Utility';

// This component is purely for display and purchase information
const OmakaseCard = ({ item }) => {

    const getCardColors = (itemId) => {
        const prefix = itemId[0].toLowerCase(); // Get the first letter: 's' or 'w'

        if (prefix === 's') {
            // Pink theme for Sake (IDs starting with 's')
            return {
                bg: 'bg-pink-100',          // Light Pink background
                border: 'border-pink-400',  // Darker Pink border
                headerText: 'text-pink-800' // Text color for the card's name
            };
        } else if (prefix === 'w') {
            // Orange theme for Whisky (IDs starting with 'w')
            return {
                bg: 'bg-orange-100',        // Light Orange background
                border: 'border-orange-400',// Darker Orange border
                headerText: 'text-orange-800' // Text color for the card's name
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
    
    return (
        // Distinct styling for Omakase items
        <Card className={`flex flex-col justify-between items-start space-y-3 bg-blue-50 border-blue-400`}>
            
            {/* Header Content */}
            <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                    {/* Bold name, red color for distinction */}
                    <h3 className="text-lg font-bold text-red-700">
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
                <DollarSign className="w-5 h-5 mr-2 text-red-600"/>
                <span className="text-lg font-bold text-red-700">Available for Purchase</span>
            </div>
        </Card>
    );
};

export default OmakaseCard;