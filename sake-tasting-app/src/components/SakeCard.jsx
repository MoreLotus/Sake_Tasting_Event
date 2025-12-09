import React, { useState, useEffect } from 'react';
import { CheckCircle, Wine, Package, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, StarRating } from './Utility';

// --- RENDER OPTIMIZATION: React.memo prevents unnecessary re-renders of list items ---
const SakeCard = React.memo(({ sake, ranking, updateRanking }) => {
    const currentRating = ranking?.rating || 0;
    const currentNotes = ranking?.notes || '';
    const isTasted = ranking?.tasted || false;
    const [showNotes, setShowNotes] = useState(false);
    const [localNotes, setLocalNotes] = useState(currentNotes);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Sync local state with remote state when it changes
        setLocalNotes(currentNotes);
    }, [currentNotes]);

    const handleRating = (newRating) => {
        // If the user rates, they must have tasted it
        updateRanking(sake.id, { rating: newRating, tasted: true });
    };

    const handleStamp = () => {
        // Toggle the tasted status
        updateRanking(sake.id, { tasted: !isTasted });
    };

    const saveNotes = async (e) => {
        if (e.key === 'Enter' || e.type === 'blur') {
            setIsSaving(true);
            await updateRanking(sake.id, { notes: localNotes, tasted: true });
            setIsSaving(false);
            e.target.blur(); // Hide keyboard after saving
        }
    };

    return (
        <Card className="flex flex-col justify-between items-start space-y-3">
            {/* Sake Header */}
            <div className="flex-grow space-y-1 w-full">
                <h3 className="text-xl font-extrabold text-gray-900">{sake.name}</h3>
                <p className="text-sm text-gray-600 font-medium">{sake.brewery} ({sake.abv})</p>
                <div className="flex flex-wrap items-center space-x-2 text-sm text-blue-600">
                    <Wine className="w-4 h-4" />
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
                    <div className='p-3 bg-gray-50 rounded-lg text-sm text-gray-700'>
                        <p className='font-bold mb-1 text-blue-600'>Description:</p>
                        <p className='italic'>{sake.description}</p>
                    </div>
                    <div className='p-4 bg-gray-50 rounded-lg text-sm text-gray-700'>
                        <p className='font-bold mb-1 text-blue-600'>Official Flavor Profile:</p>
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

                {/* Stamp Button */}
                <button
                    onClick={handleStamp}
                    className={`w-36 py-2 px-3 text-sm rounded-full font-bold transition-all duration-200
                        ${isTasted
                            ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                            : 'bg-gray-400 text-white shadow-md hover:bg-gray-500'
                        }`}
                >
                    <div className="flex items-center justify-center">
                        {isTasted ? (
                            <CheckCircle className="w-5 h-5 mr-2" />
                        ) : (
                            <Package className="w-5 h-5 mr-2" />
                        )}
                        {isTasted ? 'Stamped!' : 'Stamp Here'}
                    </div>
                </button>
            </div>
        </Card>
    );
});

export default SakeCard;