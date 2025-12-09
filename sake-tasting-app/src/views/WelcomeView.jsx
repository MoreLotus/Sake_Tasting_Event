// --- Create src/views/WelcomeView.jsx ---

import React from 'react';
import { Card } from '../components/Utility';
import { Sparkles, Cherry, Wine } from 'lucide-react'; // Example icons for cultural flair
import logo1 from '../custom_image/bluejppeko.png';
import logo2 from '../custom_image/MAINlogo.png';
import logo3 from '../custom_image/pinkjppeko.png';



const WelcomeView = () => {
  return (
    <div className="p-4 space-y-6 flex flex-col items-center text-center">
      {/* Event Header Card */}
      <Card className="bg-yellow-100 border-yellow-300 shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-black text-blue-800 flex items-center justify-center mb-2">
          <Sparkles className="w-8 h-8 mr-2 text-blue-600" /> Welcome to IZAKAYA!
        </h1>
        <p className="text-lg text-blue-700 font-semibold">
          An Evening of Sake & Culinary Delights
        </p>
      </Card>

      {/* App Explanation Card */}
      <Card className="bg-white border-gray-200 shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center mb-3">
          Your Digital Sake Passport <Wine className="w-6 h-6 ml-2" />
        </h2>
        <p className="text-md text-gray-700 mb-4">
          This app is your companion for the evening! It's designed to make your sake tasting adventure even more enjoyable.
        </p>
        <p className="text-md text-gray-700">
          **Explore, Taste, and Track!** Use this app to discover all the amazing sakes available, keep notes on your favorites, and mark off the ones you've tried.
        </p>
        <p className="text-sm text-gray-500 mt-4 italic">
          Let's embark on a delicious journey through the world of sake!
        </p>
      </Card>

      {/* Cultural Graphics / Illustrations Section - Placeholder */}
      <div className="flex justify-around items-center w-full max-w-md p-4 bg-blue-300">
        {/* Placeholder for Japanese Fan */}
        <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center text-white text-3xl font-bold opacity-75">
        <img src={logo1} alt="logo1" className="w-20 h-20 mr-2 object-contain"/>
        </div>
        {/* Placeholder for Cherry Blossom */}
        <img src={logo2} alt="logo2" className="w-20 h-20 mr-2 object-contain"/>
        {/* Placeholder for Torii Gate */}
        <div className="w-20 h-20 bg-blue-300 rounded flex items-center justify-center text-white text-2xl font-bold opacity-75">
        <img src={logo3} alt="logo3" className="w-20 h-20 mr-2 object-contain"/>
        </div>
      </div>

      {/* Call to Action or Footer */}
      <p className="text-sm text-gray-600 mt-4">
        Don't forget to visit our amazing Food Vendors!
      </p>
    </div>
  );
};
export default WelcomeView;