// --- src/components/Modal.jsx ---

import React from 'react';
import { X } from 'lucide-react';
import { Card } from './Utility'; // Reusing your Card component for styling

const Modal = ({ children, onClose }) => {
  return (
    // Backdrop/Overlay (Full Screen)
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose} // Allows clicking outside to close
    >
      {/* Modal Content Container */}
      <div 
        className="relative bg-white rounded-xl shadow-2xl overflow-y-auto max-h-full w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 bg-white rounded-full text-gray-600 hover:text-blue-800 transition-colors z-10"
          aria-label="Close Welcome"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content (The Welcome View) */}
        <div className="p-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;