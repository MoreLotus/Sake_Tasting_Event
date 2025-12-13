// --- SakesView.jsx ---

import React from 'react';
import { List, Diamond} from 'lucide-react';
import { Card } from '../components/Utility';
import SakeCard from '../components/SakeCard';
import OmakaseCard from '../components/OmakaseCard';
import { SAKE_DATA, OMAKASE_SAKE, OMAKASE_WHISKY } from '../config/constants';

// 💡 Logo imported here
import stampLogo from '../custom_image/hello_kitty.png'; 
import ad1 from '../custom_image/AD_1.png'

const SakesView = ({ sakeData, rankings, updateRanking }) => {

    const omakaseData = [...OMAKASE_SAKE, ...OMAKASE_WHISKY];

    return (
        <div className="p-4 space-y-4">
            <Card className="bg-yellow-100 border-yellow-100">
                <h2 className="text-2xl font-extrabold text-sky-400 mb-2 text-center">
                    乾杯<br />
                    KANPAI!
                </h2>
                <p className="text-blue-900 text-center">"Cheers" in Japanese</p>
            </Card>

            <div className="w-full rounded-xl overflow-hidden shadow-lg border-2">
                <img 
                    src={ad1} 
                    alt="AD1" 
                    className="w-full object-cover object-center" 
                />
            </div>

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
                <Card className="bg-blue-50 text-red-700 border-red-800 shadow-xl">
                    <h2 className="text-2xl font-black flex text-center items-center justify-center mb-1">
                        <Diamond className="w-6 h-6 mr-2 text-yellow-300 fill-yellow-300" />
                         OMAKASE<br/>
                        (Purchase separately at B2)
                        <Diamond className="w-6 h-6 mr-2 text-yellow-300 fill-yellow-300" />
                    </h2>
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