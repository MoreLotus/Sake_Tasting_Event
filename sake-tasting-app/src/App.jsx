import React, { useState, Suspense } from 'react';
import { Wine, List, Map, QrCode, UserCircle } from 'lucide-react';

// Import local modularized files
import { SAKE_DATA, VIEWS } from './config/constants';
import useFirebase from './hooks/useFirebase';
import useSakeRankings from './hooks/useSakeRankings';
import { Loader, ErrorMessage } from './components/Utility';

// Import Views
import MapView from './views/MapView';
import SakesView from './views/SakesView';
import MyRankingsView from './views/MyRankingsView';


const App = () => {
  const [currentView, setCurrentView] = useState(VIEWS.SAKES);
  const { db, userId, isAuthReady } = useFirebase();
  const { rankings, loading, error, updateRanking } = useSakeRankings(db, userId, isAuthReady);

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
            if (loading) {
              return <Loader message="Loading your tasting history..." />;
            }
            
            switch (currentView) {
              case VIEWS.MAP:
                return <MapView sakeData={SAKE_DATA} rankings={rankings} />;
              case VIEWS.SAKES:
                return <SakesView sakeData={SAKE_DATA} rankings={rankings} updateRanking={updateRanking} />;
              case VIEWS.PASSPORT:
                return <MyRankingsView sakeData={SAKE_DATA} rankings={rankings} userId={userId} />;
              default:
                return <SakesView sakeData={SAKE_DATA} rankings={rankings} updateRanking={updateRanking} />;
            }
          })()}
          <div className="h-4"></div> {/* Small buffer for scroll clearance */}
        </div>
      </Suspense>
    );
  };

  return (
    // Set root container to full screen and column flex
    <div className="h-screen bg-gray-50 font-sans flex flex-col overflow-hidden max-w-xl mx-auto w-full">
      <style jsx global>{`
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
        .h-screen { height: 100vh; }
      `}</style>
      
      {/* Header (Fixed Top) */}
      <header className="bg-white flex-shrink-0 shadow-md z-10">
        <div className="p-4 flex justify-between items-center border-b border-red-100">
          <h1 className="text-2xl font-black text-red-700 flex items-center">
            <Wine className="w-6 h-6 mr-2 fill-red-700" />
            Sake Passport
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {userId && <UserCircle className="w-5 h-5" />}
            <span className="truncate max-w-[80px] text-xs">ID: {userId ? userId.substring(0, 5) : 'Guest'}...</span>
          </div>
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
    [VIEWS.MAP]: Map,
    [VIEWS.PASSPORT]: QrCode, 
  }[view];
  const IconComponent = icon || List;

  return (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center justify-center p-3 sm:p-4 w-1/3 transition-colors duration-200 ${
        isActive ? 'text-red-700 bg-red-50' : 'text-gray-500 hover:text-red-500'
      }`}
    >
      <IconComponent className="w-6 h-6 mb-1" />
      <span className="text-xs font-semibold">{view.replace('Passport', 'My Passport')}</span>
    </button>
  );
};

export default App;