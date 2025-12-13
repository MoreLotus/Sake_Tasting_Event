// --- src/components/SakeCard.jsx ---

import React, { useState, useEffect } from 'react';
import { CheckCircle, Wine, Package, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, StarRating } from './Utility';

// 💡 ACCEPT the new prop: stampLogo
const SakeCard = React.memo(({ sake, ranking, updateRanking, stampLogo }) => {
    const currentRating = ranking?.rating || 0;
    const currentNotes = ranking?.notes || '';
    const isTasted = ranking?.tasted || false;
    const [showNotes, setShowNotes] = useState(false);
    const [localNotes, setLocalNotes] = useState(currentNotes);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setLocalNotes(currentNotes);
    }, [currentNotes]);

    const handleRating = (newRating) => {
        updateRanking(sake.id, { rating: newRating, tasted: true });
    };

    const handleStamp = () => {
        // Toggle the tasted status, preserving the current rating
        updateRanking(sake.id, { tasted: !isTasted, rating: currentRating }); 
    };

    const saveNotes = async (e) => {
        if (e.key === 'Enter' || e.type === 'blur') {
            setIsSaving(true);
            // Ensure stamping when saving notes
            await updateRanking(sake.id, { notes: localNotes, tasted: true }); 
            setIsSaving(false);
            e.target.blur(); 
        }
    };

    const activeStampLogo = sake.stampImage;

    return (
        <Card className="bg-yellow-50 flex flex-col justify-between items-start space-y-3">
            {/* Sake Header */}
            <div className="flex-grow space-y-1 w-full">
                <h3 className="text-xl font-extrabold text-blue-950">{sake.name}</h3>
                <p className="text-sm text-gray-600 font-medium">{sake.brewery} ({sake.abv})</p>
                <div className="flex flex-wrap items-center space-x-2 text-sm text-blue-500">
                    <span className="font-semibold">{sake.type}</span>
                    <span className="font-light text-gray-400 hidden sm:inline">|</span>
                    <span className="text-sm font-light text-gray-500 mt-1 sm:mt-0">
                        Pairs with {sake.pairs}
                    </span>
                </div>
            </div>
            
            {/* Flavor Profile Toggle */}
            <button
                onClick={() => setShowNotes(!showNotes)}
                className="w-full text-left text-sm text-blue-600 font-medium py-1 flex items-center justify-between transition-colors duration-200 hover:text-blue-800"
            >
                <span className='font-bold'>Sake Profile & Notes</span>
                {showNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>


            {/* Expanded Details and Interaction */}
            {showNotes && (
                <div className="w-full space-y-4 pt-2 border-t border-gray-100">
                    <div className='p-3 bg-yellow-50 rounded-lg text-sm text-gray-700'>
                        <p className='font-bold mb-1 text-blue-950'>Description:</p>
                        <p className='italic'>{sake.description}</p>
                    </div>
                    <div className='p-4 bg-yellow-50 rounded-lg text-sm text-gray-700'>
                        <p className='font-bold mb-1 text-blue-950'>Official Flavor Profile:</p>
                        <p className='italic'>{sake.flavor}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor={`notes-${sake.id}`} className="text-xs font-semibold text-gray-500 flex items-center">
                            <Edit2 className="w-4 h-4 mr-1"/> My Tasting Notes ({isSaving ? 'Saving...' : 'Saved'})
                        </label>
                        <input
                            id={`notes-${sake.id}`}
                            type="text"
                            value={localNotes}
                            onChange={(e) => setLocalNotes(e.target.value)}
                            onBlur={saveNotes}
                            onKeyDown={saveNotes}
                            placeholder="e.g., 'Sweet melon, great acidity.'"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-yellow-500 transition-shadow"
                            // Notes are disabled until stamped or rated
                            disabled={!isTasted && currentRating === 0} 
                        />
                    </div>
                </div>
            )}

            {/* Rating and Stamp Buttons */}
            <div className="w-full flex justify-between items-center pt-2 border-t border-gray-100 mt-3">
                {/* Rating Section */}
                <div className="flex flex-col items-start space-y-1">
                    <div className="text-xs font-semibold text-gray-500">My Rating:</div>
                    <StarRating rating={currentRating} size={24} onRate={handleRating} />
                </div>

                {/* STAMP BUTTON OVERHAUL */}
                <div className="flex flex-col items-end">
                    <button
                        onClick={handleStamp}
                        className={`w-28 h-28 p-2 rounded-full transition-all duration-300 flex items-center justify-center 
                            ${isTasted 
                                ? 'bg-white border-4 border-blue-600 shadow-xl' // Stamped: Solid circle with border
                                : 'bg-gray-100 border-2 border-dashed border-gray-400 hover:border-blue-500' // Unstamped: Dashed circle
                            }`}
                        style={{ minWidth: '7rem', minHeight: '7rem' }} 
                    >
                        {isTasted ? (
                            // 🚀 STATE 1: STAMPED (Display Custom Logo)
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <img 
                                    src={activeStampLogo} 
                                    alt="Stamped" 
                                    className="w-full h-full object-contain p-2" 
                                />
                            </div>
                        ) : (
                            // 🚀 STATE 2: NOT STAMPED (Display Empty Circle and Label)
                            <div className="flex flex-col items-center text-center text-gray-500 hover:text-blue-600 transition-colors">
                                {/* Empty Circle Visual */}
                                <div className="w-12 h-12 border-2 border-gray-400 rounded-full flex items-center justify-center mb-1">
                                    <Wine className="w-6 h-6 opacity-50" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider">
                                    Stamp Here
                                </span>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </Card>
    );
});

export default SakeCard;