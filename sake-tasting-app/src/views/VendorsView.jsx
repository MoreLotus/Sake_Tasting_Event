
import React from 'react';
import { Card } from '../components/Utility';
import { Utensils, Instagram } from 'lucide-react'; 
// NOTE: VENDOR_DATA is imported by App.jsx and passed down as a prop.

const VendorsView = ({ vendorData }) => {
  return (
    <div className="p-4 space-y-4">
      
      {/* Informational Header Card */}
      <Card className="bg-blue-50 border-blue-200 shadow-sm w-full">
        <h2 className="text-xl font-bold text-blue-800 flex items-center">
          <Utensils className="w-6 h-6 mr-2" /> Food Vendors
        </h2>
        <p className="text-sm text-blue-700">Find the perfect food pairing for your sake! Check their Instagram for daily specials.</p>
      </Card>

      {/* List of Vendors */}
      <div className="space-y-3">
        {vendorData.map((vendor) => (
          <Card key={vendor.id} className="flex justify-between items-center p-3">
            
            {/* Vendor Details */}
            <div className="flex-grow">
              <h3 className="font-bold text-gray-800">{vendor.name}</h3>
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
    </div>
  );
};

export default VendorsView;