import React from 'react';
import { Card } from '../components/Utility';
// 💡 Added Utensils and Instagram
import { Utensils, Instagram } from 'lucide-react'; 

const VendorsView = ({ vendorData }) => {
  return (
    <div className="p-4 space-y-4">
      <Card className="bg-blue-50 border-blue-200 shadow-sm w-full">
        <h2 className="text-xl font-bold text-blue-800 flex items-center">
          <Utensils className="w-6 h-6 mr-2" /> Food Vendors
        </h2>
        <p className="text-sm text-blue-700">Find the perfect food pairing for your sake!</p>
      </Card>

      <div className="space-y-3">
        {vendorData.map((vendor) => (
          <Card key={vendor.id} className="flex justify-between items-center p-3">
            <div>
              <h3 className="font-bold text-gray-800">{vendor.name}</h3>
              <p className="text-xs text-gray-500">{vendor.specialty}</p>
            </div>
            
            {/* 🚀 Instagram Link and Handle */}
            {vendor.instagram && (
              <div className="text-right">
                <a 
                  href={`https://www.instagram.com/${vendor.instagram}/`}
                  target="_blank" // Opens in a new tab
                  rel="noopener noreferrer" // Security best practice
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Instagram className="w-6 h-6 mr-1 fill-blue-500" />
                  <span className="text-sm font-medium">@{vendor.instagram}</span>
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