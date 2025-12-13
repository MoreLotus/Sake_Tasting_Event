
import React from 'react';
import { Card } from '../components/Utility';
import { ShoppingBag, Instagram } from 'lucide-react'; 

import ad1 from '../custom_image/AD_1.png';
import ad2 from '../custom_image/AD_2.png';
// NOTE: VENDOR_DATA is imported by App.jsx and passed down as a prop.

const VendorsView = ({ vendorData }) => {
  return (
    <div className="p-4 space-y-4">
        
      {/* Informational Header Card */}
      <Card className="bg-yellow-50 border-yellow-50 shadow-sm w-full">
        <h2 className="text-xl font-bold text-blue-950 flex items-center">
          <ShoppingBag className="w-6 h-6 mr-2" /> Vendors
        </h2>
        <p className="text-sm text-blue-950">Below is a list of all the food trucks and vendors here. Make sure to give them a visit!</p>
      </Card>

      <div className="w-full rounded-xl overflow-hidden shadow-lg border-2">
        <img 
          src={ad1} 
          alt="AD1" 
          className="w-full object-cover object-center" 
          // h-48 sets the height, object-cover ensures it fills the space without stretching
        />
      </div>

      {/* List of Vendors */}
      <div className="space-y-3">
        {vendorData.map((vendor) => (
          <Card key={vendor.id} className="bg-yellow-50 flex justify-between items-center p-3">
            
            {/* Vendor Details */}
            <div className="flex-grow">
              <h3 className="font-bold text-blue-950">{vendor.name}</h3>
              <p className="text-xs text-gray-500 mb-1">{vendor.specialty}</p>
            </div>
            
            {/* Instagram Link */}
            {vendor.instagram && (
              <div className="text-right flex-shrink-0 ml-4">
                <a 
                  href={`https://www.instagram.com/${vendor.instagram}/`}
                  target="_blank" // Opens in a new tab
                  rel="noopener noreferrer" // Security best practice
                  className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Instagram className="w-7 h-7 fill-blue-500 text-white" />
                  <span className="text-xs font-medium mt-1">@{vendor.instagram}</span>
                </a>
              </div>
            )}
            
          </Card>
        ))}
      </div>
      
      <div className="w-full rounded-xl overflow-hidden shadow-lg border-2">
        <img 
          src={ad2} 
          alt="AD2" 
          className="w-full object-cover object-center" 
          // h-48 sets the height, object-cover ensures it fills the space without stretching
        />
      </div>
    </div>
  );
};

export default VendorsView;