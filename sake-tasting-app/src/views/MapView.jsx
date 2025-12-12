import React, { useMemo } from 'react';
import { QrCode, Star } from 'lucide-react';
import { Card, StarRating } from '../components/Utility';
import stamp from '../custom_image/hello_kitty.png';
import map from '../custom_image/map.png';
import logo1 from '../custom_image/HK_HSM.png';
import logo2 from '../custom_image/HSM_Red_Emblem.png';
import logo3 from '../custom_image/arizona_sake.jpg';
import key from '../custom_image/key.png';

const MapView = () => {
    return (
        <div className="p-4 space-y-6">
            {/* 🚀 NEW: Custom Image Banner */}
            <Card className="bg-yellow-100 border-yellow-100">
                <h4 className="text-3xl font-extrabold text-blue-900 text-center">
                    MAP
                </h4>
                <p className="text-md text-blue-800 text-center">
                    Zoom in to locate stations throughout the park.
                    Don't forget to check out the Limited Omaksae Flights and Full Bar!
                </p>
            </Card>

            <div className="w-full rounded-xl overflow-hidden shadow-lg border-2 border-sky-600">
                <img 
                    src={map} 
                    alt="Map" 
                    className="w-full h-70 object-cover object-center" 
                    // h-48 sets the height, object-cover ensures it fills the space without stretching
                />
            </div>

            <div className="w-full rounded-xl overflow-hidden shadow-lg border-2 border-sky-600">
                <img 
                    src={key} 
                    alt="Key" 
                    className="w-full h-50 object-cover object-center" 
                    // h-48 sets the height, object-cover ensures it fills the space without stretching
                />
            </div>

            {/* Cultural Graphics / Illustrations Section - Fixed Sizing and Flex */}
            <div className="flex justify-around items-center w-full max-w-md bg-blue-300">
                {/* Logo 1 Container */}
                <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center">
                    <img src={logo1} alt="logo1" className="w-full h-full object-contain"/>
                </div>
                {/* Logo 2 Container */}
                <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center">
                    <img src={logo2} alt="logo2" className="w-full h-full object-contain"/>
                </div>
                {/* Logo 3 Container */}
                <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center">
                    <img src={logo3} alt="logo3" className="w-full h-full object-contain"/>
                </div>
            </div>
        </div>
    );
};

export default MapView;