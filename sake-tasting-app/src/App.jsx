// --- src/App.jsx ---

import React, { useState, Suspense } from 'react';
// 💡 Added Tent (ideal vendor icon) and X (for modal close)
import { Wine, List, Map, Book, UserCircle, Sparkles, Cherry, Tent, X } from 'lucide-react'; 

// Import local modularized files
import { SAKE_DATA, VIEWS, VENDOR_DATA } from './config/constants';
import useFirebase from './hooks/useFirebase';
import useSakeRankings from './hooks/useSakeRankings';
import useLocalStorage from './hooks/useLocalStorage'; // 💡 NEW: Import useLocalStorage
import { Loader, ErrorMessage } from './components/Utility';
import Modal from './components/Modal'; // 💡 NEW: Import Modal component
import logo from './custom_image/HSM_Yellow_Emblem.png';

// Import Views
import WelcomeView from './views/WelcomeView';
import MapView from './views/MapView'; // MapView is likely removed/unused
import SakesView from './views/SakesView';
import VendorsView from './views/VendorsView';
import MyRankingsView from './views/MyRankingsView';


const App = () => {
    // 💡 NEW: Set SAKES as default view, since Welcome will be a modal
    const [currentView, setCurrentView] = useState(VIEWS.SAKES); 
    
    // 🚀 MODAL STATE MANAGEMENT
    // 1. Tracks if the user has seen the welcome modal before
    const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage('hasSeenWelcome', false);
    // 2. Controls the visibility state of the modal
    const [showWelcomeModal, setShowWelcomeModal] = useState(!hasSeenWelcome);
    
    // Function to close the modal and mark it as seen
    const handleCloseWelcome = () => {
        setShowWelcomeModal(false);
        setHasSeenWelcome(true);
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
                            case VIEWS.SAKES:
                                return <SakesView sakeData={SAKE_DATA} rankings={rankings} updateRanking={updateRanking} loading={loading} />;
                            case VIEWS.PASSPORT:
                                return <MyRankingsView sakeData={SAKE_DATA} rankings={rankings} userId={userId} loading={loading} />;
                            case VIEWS.VENDORS:
                                return <VendorsView vendorData={VENDOR_DATA} />;
                            // 🚀 REMOVED: VIEWS.WELCOME case is now handled by the Modal
                            default:
                                return <SakesView sakeData={SAKE_DATA} rankings={rankings} updateRanking={updateRanking} loading={loading} />;
                        }
                    })()}
                    <div className="h-4"></div>
                </div>
            </Suspense>
        );
    };

    const NavItem = ({ view, currentView, setCurrentView }) => {
        // 💡 Function to potentially reopen modal if user clicks the welcome tab
        const handleClick = () => {
            if (view === VIEWS.WELCOME) {
                setShowWelcomeModal(true); // Re-open the modal
            }
            setCurrentView(view);
        };
        
        const isActive = view === currentView;
        const icon = {
            [VIEWS.SAKES]: List,
            [VIEWS.MAP]: Map,
            [VIEWS.VENDORS]: Tent, // 💡 Updated to Tent icon
            [VIEWS.PASSPORT]: Book, 
        }[view];
        const IconComponent = icon || List;

        return (
            <button
                onClick={handleClick} // Use new handleClick function
                className={`flex flex-col items-center justify-center p-3 sm:p-4 flex-1 transition-colors duration-200 ${ // 💡 Changed w-1/3 to flex-1
                    isActive ? 'text-sky-800 bg-blue-50' : 'text-gray-500 hover:text-sky-500'
                }`}
            >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs font-semibold">{view.replace('Passport', 'My Passport')}</span>
            </button>
        );
    };

    return (
        <div className="h-dynamic bg-sky-700 font-sans flex flex-col overflow-hidden max-w-xl mx-auto w-full">
            {/* Global CSS for h-dynamic fix */}
            <style jsx global>{`
                body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
                .h-dynamic { height: 100vh; }
                @supports (height: 100dvh) { .h-dynamic { height: 100dvh; }}
            `}</style>
            
            {/* Header */}
            <header className="bg-red-700 flex-shrink-0 shadow-md z-10">
                <div className="p-4 flex justify-center items-center border-b border-red-700">
                    <h1 className="text-4xl font-black text-white flex items-center">
                        <img src={logo} alt="Izakaya logo" className="w-10 h-10 mr-2 object-contain"/>
                        HELLO IZAKAYA
                    </h1>
                </div>
            </header>

            {/* Main Content Area (Scrollable) */}
            <main className="flex-grow w-full overflow-hidden">
                {renderContent()}
            </main>

            {/* Mobile Navigation (Fixed Bottom) */}
            <nav className="flex-shrink-0 bg-white border-t border-gray-200 shadow-2xl z-20">
                <div className="flex justify-around pb-[env(safe-area-inset-bottom)]"> {/* 💡 Fixed typo: insert -> inset */}
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
            
            {/* 🚀 WELCOME MODAL */}
            {showWelcomeModal && (
                <Modal onClose={handleCloseWelcome}>
                    <WelcomeView />
                </Modal>
            )}

        </div>
    );
};

export default App;