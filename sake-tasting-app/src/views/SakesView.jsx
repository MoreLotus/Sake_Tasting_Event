import React from 'react';
import { List } from 'lucide-react';
import { Card } from '../components/Utility';
import SakeCard from '../components/SakeCard';

const SakesView = ({ sakeData, rankings, updateRanking }) => {
    return (
        <div className="p-4 space-y-4">
            <Card className="bg-yellow-100 border-yellow-100">
                <h2 className="text-2xl justify-center font-extrabold text-sky-400 mb-2 flex items-center">
                    乾杯<br justify-center/>
                    KANPAI!
                </h2>
                <p className="text-blue-950">"Cheers" in Japanese</p>
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