// --- src/views/WelcomeView.jsx ---

import React from 'react';
import { Card } from '../components/Utility';
// 💡 Added User and UserRound icons for the input field
import { Sparkles, Cherry, Wine, User, UserRound } from 'lucide-react'; 
import logo1 from '../custom_image/HK_HSM.png';
import logo2 from '../custom_image/HSM_Red_Emblem.png';
import logo3 from '../custom_image/arizona_sake.jpg';
import useLocalStorage from '../hooks/useLocalStorage';



const WelcomeView = () => {

  // The key 'passportName' is used in local storage
  const [userName, setUserName] = useLocalStorage('passportName', ''); 

  // Handler for input changes
  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };
  
  // Determine if the user has entered a name (uses a placeholder if empty)
  const displayUserName = userName || 'Izakaya Guest';

  return (
    <div className="p-4 space-y-6 flex flex-col items-center text-center">
      
      {/* Event Header Card (Yellow/Blue Theme) */}
      <Card className="bg-yellow-100 border-yellow-100 shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-black text-blue-800 flex items-center justify-center mb-2">
          <Sparkles className="w-8 h-8 mr-2 text-blue-900" /> Welcome to IZAKAYA!
        </h1>
        <p className="text-lg text-blue-950 font-semibold">
          An Evening of Sake & Culinary Delights
        </p>
      </Card>

      {/* 🚀 NEW: NAME INPUT & PERSONALIZED GREETING CARD */}
      <Card className="bg-yellow-50 border-blue-300 shadow-md w-full max-w-md p-4">
        <h2 className="text-xl font-bold text-blue-950 flex items-center justify-center mb-3">
          <UserRound className="w-6 h-6 mr-2 text-blue-600" /> 
          Hello, this passport belongs to:
        </h2>
        
        {/* Display the Name (large and visible) */}
        <p className="text-3xl font-bold text-blue-800 truncate mb-4 px-2">
          {displayUserName}
        </p>

        {/* Input Field */}
        <div className="w-full relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Enter your name here"
            value={userName}
            onChange={handleNameChange}
            className="w-full pl-10 pr-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-800 font-medium"
          />
        </div>
      </Card>

      {/* App Explanation Card */}
      <Card className="bg-yellow-50 border-gray-200 shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-950 flex items-center justify-center mb-3">
          {displayUserName}'s Digital Sake Passport
        </h2>
        <p className="text-md text-blue-950 mb-4">
          Explore, taste and track using this app as you make your way through the sake, whisky and spirit samples.           
          Make sure to swing by and explore all the awesome food and merch vendors!
        </p>
        <p className="text-md text-blue-950">
          Keep notes on your favorites and collect a stamp after trying each one!
        </p>
        <p className="text-sm text-blue-950 mt-4 italic">
          Let's embark on a delicious journey through the world of sake!
        </p>
      </Card>
    </div>
  );
};
export default WelcomeView;