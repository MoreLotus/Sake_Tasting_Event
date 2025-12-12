import React, { useState, Suspense } from 'react';
import { Wine, List, Map, Book, UserCircle, Sparkles, Cherry, ShoppingBag, Instagram} from 'lucide-react';

// Import local modularized files
import { SAKE_DATA, VIEWS, VENDOR_DATA } from './config/constants';
import useFirebase from './hooks/useFirebase';
import useSakeRankings from './hooks/useSakeRankings';
import { Loader, ErrorMessage } from './components/Utility';
import logo from './custom_image/HSM_Yellow_Emblem.png';

// Import Views
import WelcomeView from './views/WelcomeView';
//import MapView from './views/MapView';
import SakesView from './views/SakesView';
import VendorsView from './views/VendorsView';
import MyRankingsView from './views/MyRankingsView';


const App = () => {
    const [currentView, setCurrentView] = useState(VIEWS.WELCOME);
    
    // 🚀 FIX 1: Include 'analytics' in destructuring from useFirebase
    const { db, userId, isAuthReady, analytics } = useFirebase();
    
    // The useSakeRankings hook is now correctly receiving all 4 arguments
    const { rankings, loading, error, updateRanking } = useSakeRankings(db, userId, isAuthReady, analytics);

    const renderContent = () => {
        if (!isAuthReady) {
            return <Loader message="Connecting to Sake Passport System..." />;
        }

        if (error) {
            return <div className="p-4"><ErrorMessage message={error} /></div>;
        }

        // Wrap the entire view rendering in Suspense
        return (
            <Suspense fallback={<Loader message="Loading View..." />}>
                <div className="overflow-y-auto h-full">
                    {(() => {
                        // ❌ FIX 2: REMOVED THE GLOBAL LOADING BLOCK
                        // We now rely on the individual views to show Skeletons 
                        // by passing the 'loading' prop down.
                        
                        switch (currentView) {
                            //case VIEWS.MAP:
                                // Passing 'loading' down to the view
                            //    return <MapView sakeData={SAKE_DATA} rankings={rankings} loading={loading} />;
                            case VIEWS.SAKES:
                                // Passing 'loading' down to the view
                                return <SakesView sakeData={SAKE_DATA} rankings={rankings} updateRanking={updateRanking} loading={loading} />;
                            case VIEWS.PASSPORT:
                                // Passing 'loading' down to the view
                                return <MyRankingsView sakeData={SAKE_DATA} rankings={rankings} userId={userId} loading={loading} />;
                            case VIEWS.VENDORS:
                                return <VendorsView vendorData={VENDOR_DATA} />;
                            case VIEWS.WELCOME:
                                return <WelcomeView/>;
                                default:
                                return <SakesView sakeData={SAKE_DATA} rankings={rankings} updateRanking={updateRanking} loading={loading} />;
                        }
                    })()}
                    <div className="h-4"></div> {/* Small buffer for scroll clearance */}
                </div>
            </Suspense>
        );
    };

    return (
        // Set root container to full screen and column flex
        <div className="h-screen bg-sky-800 font-sans flex flex-col overflow-hidden max-w-xl mx-auto w-full">
            <style jsx global>{`
                body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
                .h-screen { height: 100vh; }
            `}</style>
            
            {/* Header (Fixed Top) */}
            <header className="bg-red-700 flex-shrink-0 shadow-md z-10">
                <div className="p-4 flex justify-center items-center border-b border-red-700">
                    <h1 className="text-4xl font-black text-white flex items-center">
                        <img src={logo} alt="Izakaya logo" className="w-8 h-8 mr-2 object-contain"/>
                        HELLO IZAKAYA
                    </h1>
                    {/*<div className="flex items-center space-x-2 text-sm text-gray-500">
                        {{userId && <UserCircle className="w-5 h-5" />}}
                        {<span className="truncate max-w-[80px] text-xs">ID: {userId ? userId.substring(0, 5) : 'Guest'}...</span>}
                    </div>*/}
                </div>
            </header>

            {/* Main Content Area (Scrollable) */}
            <main className="flex-grow w-full overflow-hidden">
                {renderContent()}
            </main>

            {/* Mobile Navigation (Fixed Bottom) */}
            <nav className="flex-shrink-0 bg-white border-t border-gray-200 shadow-2xl z-20">
                <div className="flex justify-around">
                    {Object.values(VIEWS).map((view) => (
                        <NavItem
                            key={view}
                            view={view}
                            currentView={currentView}
                            setCurrentView={setCurrentView}
                        />
                    ))}
                </div>
            </nav>
        </div>
    );
};

const NavItem = ({ view, currentView, setCurrentView }) => {
    const isActive = view === currentView;
    const icon = {
        [VIEWS.SAKES]: List,
        //[VIEWS.MAP]: Map,
        [VIEWS.WELCOME]: Sparkles,
        [VIEWS.VENDORS]: ShoppingBag,
        [VIEWS.PASSPORT]: Book, 
    }[view];
    const IconComponent = icon || List;

    return (
        <button
            onClick={() => setCurrentView(view)}
            className={`flex flex-col items-center justify-center p-3 sm:p-4 w-1/3 transition-colors duration-200 ${
                isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-500 hover:text-blue-500'
            }`}
        >
            <IconComponent className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">{view.replace('Passport', 'My Passport')}</span>
        </button>
    );
};

export default App;