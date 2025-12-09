import React, { useMemo } from 'react';
import { QrCode, Star } from 'lucide-react';
import { Card, StarRating } from '../components/Utility';

const MyRankingsView = ({ sakeData, rankings, userId }) => {
    const tastedSakes = useMemo(() => {
        return sakeData
            .map(sake => ({
                ...sake,
                ranking: rankings[sake.id] || { rating: 0, tasted: false, notes: '' }
            }))
            .filter(sake => sake.ranking.tasted)
            .sort((a, b) => b.ranking.rating - a.ranking.rating); // Sort by highest rating first
    }, [sakeData, rankings]);

    const totalSakes = sakeData.length;
    const ratedCount = tastedSakes.filter(sake => sake.ranking.rating > 0).length;
    const averageRating = ratedCount > 0
        ? (tastedSakes.reduce((sum, sake) => sum + sake.ranking.rating, 0) / ratedCount).toFixed(1)
        : 'N/A';

    return (
        <div className="p-4 space-y-6">
            <Card className="bg-yellow-100 border-blue-200">
                <h2 className="text-2xl font-extrabold text-blue-800 mb-2 flex items-center">
                    <QrCode className="w-6 h-6 mr-2" />
                    My Tasting Passport
                </h2>
                {/*<p className="text-blue-700 font-mono text-xs overflow-hidden truncate">
                    User ID: {userId || 'Authenticating...'}
                </p>*/}
            </Card>

            <Card className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-4xl font-extrabold text-cyan-400">{tastedSakes.length}</p>
                    <p className="text-sm font-medium text-gray-500">Sakes Stamped</p>
                    <p className="text-xs text-gray-400">/ {totalSakes} Total</p>
                </div>
                <div>
                    <p className="text-4xl font-extrabold text-cyan-400 flex items-center justify-center">
                        {averageRating} <Star className="w-5 h-5 ml-2 fill-yellow-400 text-yellow-400" />
                    </p>
                    <p className="text-sm font-medium text-gray-500">Average Rating</p>
                    <p className="text-xs text-gray-400">{ratedCount} Rated</p>
                </div>
            </Card>

            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Your Detailed History</h3>
                {tastedSakes.length === 0 ? (
                    <div className="text-gray-500 italic p-4 text-center border-2 border-dashed rounded-lg">
                        Start tasting sakes to fill your passport!
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {tastedSakes.map((sake) => (
                            <li key={sake.id} className="border-b pb-3 last:border-b-0">
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <p className="font-semibold text-gray-900">{sake.name}</p>
                                        <p className="text-xs text-gray-500">{sake.brewery}</p>
                                    </div>
                                    <div className="flex items-center space-x-1 flex-shrink-0">
                                        <span className="font-bold text-lg text-cyan-400 mr-1">{sake.ranking.rating.toFixed(0)}</span>
                                        <StarRating rating={sake.ranking.rating} size={16} onRate={() => {}} />
                                    </div>
                                </div>
                                {sake.ranking.notes && (
                                    <p className='mt-2 text-sm italic text-gray-700'>
                                        Notes: "{sake.ranking.notes}"
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </div>
    );
};

export default MyRankingsView;