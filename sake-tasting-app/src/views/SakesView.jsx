// --- SakesView.jsx ---

import React from 'react';
import { List } from 'lucide-react';
import { Card } from '../components/Utility';
import SakeCard from '../components/SakeCard';
import OmakaseCard from '../components/OmakaseCard';
import { SAKE_DATA, OMAKASE_SAKE, OMAKASE_WHISKY } from '../config/constants';

// 💡 Logo imported here
import stampLogo from '../custom_image/hello_kitty.png'; 

const omakaseData = [...OMAKASE_SAKE, ...OMAKASE_WHISKY];

const SakesView = ({ sakeData, rankings, updateRanking }) => {
    return (
        <div className="p-4 space-y-4">
            <Card className="bg-yellow-100 border-yellow-100">
                <h2 className="text-2xl font-extrabold text-sky-400 mb-2 text-center">
                    乾杯<br />
                    KANPAI!
                </h2>
                <p className="text-blue-900 text-center">"Cheers" in Japanese</p>
            </Card>
            <div className="space-y-4">
                {sakeData.map((sake) => (
                    <SakeCard
                        key={sake.id}
                        sake={sake}
                        ranking={rankings[sake.id]}
                        updateRanking={updateRanking}
                        //stampLogo={stampLogo} //  Logo passed as prop
                    />
                ))}
            </div>

            {/* OMAKASE/FOR-SALE SECTION HEADER */}
            <div className="pt-6">
                <Card className="bg-red-700 text-white border-red-800 shadow-xl">
                    <h2 className="text-2xl font-black flex items-center justify-center mb-1">
                        <Diamond className="w-6 h-6 mr-2 text-yellow-300 fill-yellow-300" />
                        OMAKASE (For Sale)
                    </h2>
                    <p className="text-md font-semibold text-center opacity-90">
                        Ask staff for pricing and bottle availability. Not for passport stamping.
                    </p>
                </Card>
            </div>
            
            {/* Omakase Items (Display Only) */}
            <div className="space-y-4">
                {omakaseData.map((item) => (
                    // USE THE DEDICATED OmakaseCard
                    <OmakaseCard
                        key={item.id}
                        item={item} // Renamed prop to 'item' for simplicity in OmakaseCard
                    />
                ))}
            </div>

        </div>
    );
};

export default SakesView;