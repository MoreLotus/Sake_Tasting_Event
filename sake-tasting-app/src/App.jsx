// --- src/App.jsx ---

import React, { useState, Suspense, useEffect } from 'react';
// 💡 Included Map, List, Tent, Book for the four nav items
import { Wine, List, Map, Book, UserCircle, Sparkles, Cherry, Tent, X } from 'lucide-react'; 

// Import local modularized files
import { SAKE_DATA, VIEWS, VENDOR_DATA } from './config/constants';
import useFirebase from './hooks/useFirebase';
import useSakeRankings from './hooks/useSakeRankings';
import useLocalStorage from './hooks/useLocalStorage'; // ❌ REMOVED: No longer needed for modal state
import { Loader, ErrorMessage } from './components/Utility';
import Modal from './components/Modal';
import logo from './custom_image/HSM_Yellow_Emblem.png';

// Import Views
import WelcomeView from './views/WelcomeView';
import MapView from './views/MapView'; 
import SakesView from './views/SakesView';
import VendorsView from './views/VendorsView';
import MyRankingsView from './views/MyRankingsView';


const App = () => {
    
    const [currentView, setCurrentView] = useState(VIEWS.MAP); 
    
    // 🚀 RETRIEVE USER NAME: Get the name from local storage
    const [userName, setUserName] = useLocalStorage('passportName', '');
    const displayUserName = userName || 'My'; // Use 'My' as fallback if name is empty

    // 🚀 MODAL STATE MANAGEMENT FIX: 
    // Set to true by default, and remove all checks/saving logic.
    // 1. Removed hasSeenWelcome state
    // 2. showWelcomeModal is now controlled only by the user closing it
    const [showWelcomeModal, setShowWelcomeModal] = useState(true); 
    
    // ❌ REMOVED useEffect: No longer needed to check local storage.
    
    // Function to close the modal (but it will pop up on next reload)
    const handleCloseWelcome = () => {
        setShowWelcomeModal(false);
        // ❌ REMOVED: setHasSeenWelcome(true);
    };

    const { db, userId, isAuthReady, analytics } = useFirebase();
    const { rankings, loading, error, updateRanking } = useSakeRankings(db, userId, isAuthReady, analytics);

    const renderContent = () => {
        if (!isAuthReady) {
            return <Loader message="Connecting to Sake Passport System..." />;
        }

        if (error) {
            return <div className="p-4"><ErrorMessage message={error} /></div>;
        }

        return (
            <Suspense fallback={<Loader message="Loading View..." />}>
                <div className="overflow-y-auto h-full">
                    {(() => {
                        switch (currentView) {
                            case VIEWS.MAP:
                                return <MapView sakeData={SAKE_DATA} rankings={rankings} loading={loading} />;
                            case VIEWS.SAKES:
                                return <SakesView sakeData={SAKE_DATA} rankings={rankings} updateRanking={updateRanking} loading={loading} />;
                            case VIEWS.PASSPORT:
                                return <MyRankingsView sakeData={SAKE_DATA} rankings={rankings} userId={userId} loading={loading} />;
                            case VIEWS.VENDORS:
                                return <VendorsView vendorData={VENDOR_DATA} />;
                            default:
                                return <SakesView sakeData={SAKE_DATA} rankings={rankings} updateRanking={updateRanking} loading={loading} />;
                        }
                    })()}
                    <div className="h-4"></div>
                </div>
            </Suspense>
        );
    };

    const NavItem = ({ view, currentView, setCurrentView, displayUserName }) => {
        const isActive = view === currentView;
        
        const icon = {
            [VIEWS.MAP]: Map,
            [VIEWS.SAKES]: List,
            [VIEWS.VENDORS]: Tent,
            [VIEWS.PASSPORT]: Book, 
        }[view];
        const IconComponent = icon || List;

        // 🚀 CUSTOM LABEL LOGIC
        const label = view === VIEWS.PASSPORT 
            ? `${displayUserName}'s Passport` // Use the user's name
            : view;


        return (
            <button
                onClick={() => setCurrentView(view)}
                className={`flex flex-col items-center justify-center p-3 sm:p-4 flex-1 transition-colors duration-200 ${
                    isActive ? 'text-sky-800 bg-blue-50' : 'text-gray-500 hover:text-sky-500'
                }`}
            >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs font-semibold">{label}</span>
            </button>
        );
    };

    // Define the list of views that should appear in the navigation bar
    const navViews = Object.values(VIEWS).filter(view => 
        view !== VIEWS.WELCOME
    );

    return (
        <div className="h-dynamic bg-sky-700 font-sans flex flex-col overflow-hidden max-w-xl mx-auto w-full">
            <style jsx global>{`
                body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
                .h-dynamic { height: 100vh; }
                @supports (height: 100dvh) { .h-dynamic { height: 100dvh; }}
            `}</style>
            
            <header className="bg-red-700 flex-shrink-0 shadow-md z-10">
                <div className="p-4 flex justify-center items-center border-b border-red-700">
                    <h1 className="text-4xl font-black text-white flex items-center">
                        <img src={logo} alt="Izakaya logo" className="w-10 h-10 mr-2 object-contain"/>
                        HELLO IZAKAYA
                    </h1>
                </div>
            </header>

            <main className="flex-grow w-full overflow-hidden">
                {renderContent()}
            </main>

            <nav className="flex-shrink-0 bg-white border-t border-gray-200 shadow-2xl z-20">
                <div className="flex justify-around pb-[env(safe-area-inset-bottom)]">
                    {navViews.map((view) => (
                        <NavItem
                            key={view}
                            view={view}
                            currentView={currentView}
                            setCurrentView={setCurrentView}
                        />
                    ))}
                </div>
            </nav>
            
            {/* WELCOME MODAL (Will now show on every load) */}
            {showWelcomeModal && (
                <Modal onClose={handleCloseWelcome}>
                    <WelcomeView />
                </Modal>
            )}

        </div>
    );
};

export default App;