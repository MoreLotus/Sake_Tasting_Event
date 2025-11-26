import React, { useState, Suspense } from "react";
import { Wine, UserCircle, List, Map, QrCode } from "lucide-react";

import useFirebase from "./hooks/useFirebase";
import useSakeRankings from "./hooks/useSakeRankings";

import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

// --- Lazy-loaded view components ---
const MapView = React.lazy(() => import("./views/MapView"));
const SakesView = React.lazy(() => import("./views/SakesView"));
const ScanView = React.lazy(() => import("./views/ScanView"));
const MyPassportView = React.lazy(() => import("./views/MyPassportView"));

// --- Constants ---
const SAKE_DATA = [
  { id: "sake-1", name: "Dassai 45", brewery: "Asahi Shuzo", region: "Yamaguchi", style: "Junmai Daiginjo", location: "Booth A1", flavor: "Fruity, elegant, clean finish." },
  { id: "sake-2", name: "Kubota Senju", brewery: "Asahi Shuzo", region: "Niigata", style: "Ginjo", location: "Booth A2", flavor: "Light, crisp, and dry with a hint of sweetness." },
  { id: "sake-3", name: "Hakkaisan", brewery: "Hakkaisan Brewery", region: "Niigata", style: "Junmai Ginjo", location: "Booth B1", flavor: "Clean, smooth, subtle aroma." },
  { id: "sake-4", name: "Wakatake Onikoroshi", brewery: "Ohmuraya Shuzo", region: "Shizuoka", style: "Junmai", location: "Booth B2", flavor: "Bold, dry, strong profile." },
  { id: "sake-5", name: "Tamagawa Ice Breaker", brewery: "Tamagawa", region: "Kyoto", style: "Junmai Namazake", location: "Booth C1", flavor: "Unpasteurized & vibrant." },
  { id: "sake-6", name: "Tatenokawa 50", brewery: "Tatenokawa Shuzo", region: "Yamagata", style: "Junmai Daiginjo", location: "Booth C2", flavor: "Soft, round, pear + melon." }
];

const VIEWS = {
  SAKES: "Sakes",
  MAP: "Map",
  SCAN: "Scan",
  PASSPORT: "Passport",
};

// Navigation icon mapping
const NAV_ICONS = {
  [VIEWS.SAKES]: List,
  [VIEWS.MAP]: Map,
  [VIEWS.SCAN]: QrCode,
  [VIEWS.PASSPORT]: QrCode
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState(VIEWS.SAKES);

  // Firebase + Firestore
  const { db, userId, isAuthReady } = useFirebase();
  const { rankings, loading, error, updateRanking } = useSakeRankings(db, userId, isAuthReady);

  // Which view to render
  const renderView = () => {
    if (!isAuthReady) return <Loader message="Connecting to Sake Passport..." />;
    if (error) return <ErrorMessage message={error} />;
    if (loading) return <Loader message="Loading tasting data..." />;

    switch (currentView) {
      case VIEWS.MAP:
        return <MapView sakeData={SAKE_DATA} rankings={rankings} />;

      case VIEWS.SAKES:
        return (
          <SakesView
            sakeData={SAKE_DATA}
            rankings={rankings}
            updateRanking={updateRanking}
          />
        );

      case VIEWS.SCAN:
        return (
          <ScanView
            sakeData={SAKE_DATA}
            passport={rankings}
            updateRanking={updateRanking}
          />
        );

      case VIEWS.PASSPORT:
        return (
          <MyPassportView
            sakeData={SAKE_DATA}
            rankings={rankings}
            userId={userId}
          />
        );

      default:
        return <SakesView sakeData={SAKE_DATA} rankings={rankings} updateRanking={updateRanking} />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 font-sans flex flex-col overflow-hidden max-w-xl mx-auto w-full">

      {/* HEADER */}
      <header className="bg-white flex-shrink-0 shadow-md z-10">
        <div className="p-4 flex justify-between items-center border-b border-red-100">
          <h1 className="text-2xl font-black text-red-700 flex items-center">
            <Wine className="w-6 h-6 mr-2" />
            Sake Passport
          </h1>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {userId && <UserCircle className="w-5 h-5" />}
            <span className="truncate max-w-[80px] text-xs">
              ID: {userId ? userId.substring(0, 5) : "Guest"}...
            </span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-grow overflow-y-auto">
        <Suspense fallback={<Loader message="Loading view..." />}>
          {renderView()}
        </Suspense>
      </main>

      {/* NAVIGATION */}
      <nav className="flex-shrink-0 bg-white border-t border-gray-200 shadow-2xl z-20">
        <div className="flex justify-around">
          {Object.values(VIEWS).map(view => {
            const Icon = NAV_ICONS[view] || List;
            const isActive = currentView === view;

            return (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`flex flex-col items-center justify-center p-3 w-1/4 transition-colors
                  ${isActive ? "text-red-700 bg-red-50" : "text-gray-500 hover:text-red-500"}`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-semibold">
                  {view.replace("Passport", "My Passport")}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default App;
