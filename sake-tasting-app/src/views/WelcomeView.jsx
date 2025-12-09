// --- Create src/views/WelcomeView.jsx ---

import React from 'react';
import { Card } from '../components/Utility';
import { Sparkles, Cherry, Wine } from 'lucide-react'; // Example icons for cultural flair

const WelcomeView = () => {
  return (
    <div className="p-4 space-y-6 flex flex-col items-center text-center">
      {/* Event Header Card */}
      <Card className="bg-red-50 border-red-200 shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-black text-red-800 flex items-center justify-center mb-2">
          <Sparkles className="w-8 h-8 mr-2 text-red-600" /> Welcome to IZAKAYA!
        </h1>
        <p className="text-lg text-red-700 font-semibold">
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
      <div className="flex justify-around items-center w-full max-w-md p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg shadow-inner">
        {/* Placeholder for Japanese Fan */}
        <div className="w-16 h-16 bg-red-300 rounded-full flex items-center justify-center text-white text-3xl font-bold opacity-75">
          扇
        </div>
        {/* Placeholder for Cherry Blossom */}
        <Cherry className="w-12 h-12 text-pink-500 animate-pulse" />
        {/* Placeholder for Torii Gate */}
        <div className="w-16 h-16 bg-orange-400 rounded flex items-center justify-center text-white text-2xl font-bold opacity-75">
          ⛩️
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