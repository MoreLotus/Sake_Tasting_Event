import React from 'react';
import { List } from 'lucide-react';
import { Card } from '../components/Utility';
import SakeCard from '../components/SakeCard';

const SakesView = ({ sakeData, rankings, updateRanking }) => {
    return (
        <div className="p-4 space-y-4">
            <Card className="bg-yellow-100 border-yellow-100">
                <h2 className="text-2xl justify-center font-extrabold text-blue-800 mb-2 flex items-center">
                    乾杯<br />
                    Tasting List & Stamp Collection
                </h2>
                <p className="text-blue-700">Rate sakes with stars, collect a stamp, and add your tasting notes!</p>
            </Card>
            <div className="space-y-4">
                {sakeData.map((sake) => (
                    <SakeCard
                        key={sake.id}
                        sake={sake}
                        ranking={rankings[sake.id]}
                        updateRanking={updateRanking}
                    />
                ))}
            </div>
        </div>
    );
};

export default SakesView;