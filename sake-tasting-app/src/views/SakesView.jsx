import React from 'react';
import { List, Diamond, Ticket} from 'lucide-react';
import { Card } from '../components/Utility';
import SakeCard from '../components/SakeCard';
import OmakaseCard from '../components/OmakaseCard';
import { SAKE_DATA, OMAKASE_SAKE, OMAKASE_WHISKY } from '../config/constants';

// Logo imported here
import stampLogo from '../custom_image/hello_kitty.png'; 
import ad1 from '../custom_image/AD_1.png'

const SakesView = ({ sakeData, rankings, updateRanking }) => {

    const omakaseSakeData = [...OMAKASE_SAKE];
    const omakaseWhiskyData = [...OMAKASE_WHISKY];

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
                <Card className="bg-sky-300 text-red-700 border-red-800 shadow-xl">
                    <h2 className="text-2xl font-black flex flex-col text-center items-center justify-center mb-1">
                        <div className="flex items-center"> {/* Wraps OMAKASE and Diamonds on one line */}
                            <Diamond className="w-6 h-6 mr-2 text-yellow-300 fill-yellow-300" />
                            OMAKASE
                            <Diamond className="w-6 h-6 ml-2 text-yellow-300 fill-yellow-300" />
                        </div>
                        <span className="text-base font-normal mt-1"> {/* Subtitle on new line */}
                            (Purchase separately at B2)
                        </span>
                    </h2>
                    <h3 className="text-md font-black flex text-center justify-center">
                        Bar is cashless. Go to info booth for tickets
                    </h3>
                </Card>
            </div>

            {/* OMAKASE Sake Flights Header */}
            <div className="pt-6">
                <Card className="bg-pink-300 text-pink-700 border-pink-400 shadow-xl">
                    <h2 className="text-2xl font-black flex flex-col text-center items-center justify-center mb-1">
                        OMAKASE Sake Flights 
                        <div className="flex items-center text-xl mt-1"> {/* Wraps ticket info */}
                            4 tickets <Ticket className="w-5 h-5 ml-2" />
                        </div>
                    </h2>
                </Card>
            </div>
            
            {/* Omakase Sake Items (Now using the safe list) */}
            <div className="space-y-4">
                {omakaseSakeData.map((item) => (
                    <OmakaseCard key={item.id} item={item} />
                ))}
            </div>

            {/* OMAKASE Whiskey Flights Header */}
            <div className="pt-6">
                <Card className="bg-orange-100 text-orange-800 border-orange-400 shadow-xl">
                    <h2 className="text-2xl font-black flex flex-col text-center items-center justify-center mb-1">
                        OMAKASE Whiskey Flights 
                        <div className="flex items-center text-xl mt-1"> {/* Wraps ticket info */}
                            4 tickets <Ticket className="w-5 h-5 ml-2" />
                        </div>
                    </h2>
                </Card>
            </div>
            
            {/* Omakase Whiskey Items (Now using the safe list) */}
            <div className="space-y-4">
                {omakaseWhiskyData.map((item) => (
                    <OmakaseCard key={item.id} item={item} />
                ))}
            </div>

        </div>
    );
};

export default SakesView;