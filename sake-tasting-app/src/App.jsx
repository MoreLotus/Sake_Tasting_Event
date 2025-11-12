import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Map, List, CheckCircle, Star, Wine,
  Loader2, Check, Package, UserCircle, QrCode,
  AlertTriangle, Edit2, ChevronDown, ChevronUp
} from 'lucide-react';
import QrReader from 'react-qr-scanner';


// --- Firebase Imports ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore, doc, setDoc, onSnapshot, collection,
} from 'firebase/firestore';

// --- CONFIGURATION AND CONSTANTS ---

// Global variables provided by the environment
const appId = 'sake-8a8e4';

const firebaseConfig = {
  apiKey: "AIzaSyB8bJcU2vVs3nZ-XqMM3aXbHThXCFldIAc",
  authDomain: "sake-8a8e4.firebaseapp.com",
  projectId: "sake-8a8e4",
  storageBucket: "sake-8a8e4.firebasestorage.app",
  messagingSenderId: "697705849107",
  appId: "1:697705849107:web:809786a5244264650afae6",
  measurementId: "G-56622PCEYN"
};

const initialAuthToken = null;
const SAKE_DATA = [
  { id: 'sake-1', name: 'Dassai 45', brewery: 'Asahi Shuzo', region: 'Yamaguchi', style: 'Junmai Daiginjo', location: 'Booth A1', flavor: 'Fruity, elegant, clean finish.' },
  { id: 'sake-2', name: 'Kubota Senju', brewery: 'Asahi Shuzo', region: 'Niigata', style: 'Ginjo', location: 'Booth A2', flavor: 'Light, crisp, and dry with a hint of sweetness.' },
  { id: 'sake-3', name: 'Hakkaisan', brewery: 'Hakkaisan Brewery', region: 'Niigata', style: 'Junmai Ginjo', location: 'Booth B1', flavor: 'Clean, smooth, subtle aroma. Excellent food pairing.' },
  { id: 'sake-4', name: 'Wakatake Onikoroshi', brewery: 'Ohmuraya Shuzo', region: 'Shizuoka', style: 'Junmai', location: 'Booth B2', flavor: 'Bold and dry, strong flavor profile, masculine sake.' },
  { id: 'sake-5', name: 'Tamagawa Ice Breaker', brewery: 'Tamagawa', region: 'Kyoto', style: 'Junmai Namazake', location: 'Booth C1', flavor: 'Unpasteurized and vibrant. Best served chilled or on the rocks.' },
  { id: 'sake-6', name: 'Tatenokawa 50', brewery: 'Tatenokawa Shuzo', region: 'Yamagata', style: 'Junmai Daiginjo', location: 'Booth C2', flavor: 'Soft, well-rounded, notes of pear and melon.' },
];

const VIEWS = {
  MAP: 'Map',
  SAKES: 'Sakes',
  SCAN: 'Scan',
  PASSPORT: 'Passport',
};

// --- UTILITY COMPONENTS ---

const StarRating = ({ rating, size = 20, onRate }) => {
  const fullStars = Math.floor(rating);
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= fullStars;
    stars.push(
      <Star
        key={i}
        size={size}
        className={`cursor-pointer transition-colors duration-200 ${
          isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
        onClick={() => onRate(i)}
      />
    );
  }
  return <div className="flex space-x-1">{stars}</div>;
};



const Card = ({ children, className = '' }) => (
  <div className={`bg-white p-4 shadow-xl rounded-xl border border-gray-100 ${className}`}>
    {children}
  </div>
);

const Loader = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center p-8 text-gray-500">
    <Loader2 className="w-8 h-8 animate-spin text-red-500" />
    <p className="mt-4 text-lg">{message}</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md flex items-center">
    <AlertTriangle className="w-5 h-5 mr-3" />
    <p className="font-medium">{message}</p>
  </div>
);


// --- FIREBASE HOOK ---

const useFirebase = () => {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    try {
      if (Object.keys(firebaseConfig).length === 0) {
        throw new Error("Firebase config not available.");
      }
      const app = initializeApp(firebaseConfig);
      const authInstance = getAuth(app);
      const dbInstance = getFirestore(app);

      setDb(dbInstance);
      setAuth(authInstance);

      const authenticate = async () => {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(authInstance, initialAuthToken);
          } else {
            await signInAnonymously(authInstance);
          }
        } catch (error) {
          console.error("Firebase Auth failed, attempting anonymous sign-in:", error);
          try {
            await signInAnonymously(authInstance);
          } catch (anonError) {
            console.error("Anonymous sign-in failed:", anonError);
          }
        }
      };

      authenticate();

      const unsubscribe = onAuthStateChanged(authInstance, (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          setUserId(crypto.randomUUID());
        }
        setIsAuthReady(true);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase Initialization Error:", error);
      setUserId(crypto.randomUUID());
      setIsAuthReady(true);
    }
  }, []);

  return { db, auth, userId, isAuthReady };
};


// --- FIREBASE DATA HOOK ---

const useSakeRankings = (db, userId, isAuthReady) => {
  const [rankings, setRankings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db || !userId || !isAuthReady) {
      if (isAuthReady) setLoading(false);
      return;
    }

    const collectionPath = `/artifacts/${appId}/users/${userId}/sakeRankings`;
    const q = collection(db, collectionPath);

    setLoading(true);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const newRankings = {};
        snapshot.forEach((doc) => {
          newRankings[doc.id] = doc.data();
        });
        setRankings(newRankings);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching rankings:", e);
        setError("Failed to load your tasting passport data.");
        setLoading(false);
      }
    }, (e) => {
      console.error("Firestore onSnapshot error:", e);
      setError("Real-time connection failed. Check your network.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, userId, isAuthReady]);

  // Function to handle ranking and notes update
  const updateRanking = useCallback(async (sakeId, updates) => {
    if (!db || !userId) {
      console.warn("Database not ready or User not logged in.");
      return;
    }

    const docRef = doc(db, `/artifacts/${appId}/users/${userId}/sakeRankings`, sakeId);

    const currentData = rankings[sakeId] || {
      rating: 0,
      tasted: false,
      notes: '',
      timestamp: Date.now()
    };

    const updatePayload = {
      sakeId: sakeId,
      timestamp: Date.now(),
      // Merge new updates with current data, falling back to current if undefined
      rating: updates.rating !== undefined ? updates.rating : currentData.rating,
      tasted: updates.tasted !== undefined ? updates.tasted : currentData.tasted,
      notes: updates.notes !== undefined ? updates.notes : currentData.notes,
    };

    try {
      await setDoc(docRef, updatePayload, { merge: true });
    } catch (e) {
      console.error("Error updating ranking:", e);
      setError("Could not save your ranking. Please try again.");
    }
  }, [db, userId, rankings]);

  return { rankings, loading, error, updateRanking };
};

// --- VIEW COMPONENTS ---

const MapView = ({ sakeData, rankings }) => {
  const totalSakes = sakeData.length;
  const tastedCount = Object.values(rankings).filter(r => r.tasted).length;
  const progressPercent = totalSakes > 0 ? (tastedCount / totalSakes) * 100 : 0;

  return (
    <div className="p-4 space-y-6">
      <Card className="bg-red-50">
        <h2 className="text-2xl font-extrabold text-red-800 mb-2 flex items-center">
          <Map className="w-6 h-6 mr-2" />
          Tasting Hall Map
        </h2>
        <p className="text-red-700">Find your way and collect those stamps! Progress: {Math.round(progressPercent)}%</p>
        <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm font-semibold mt-1 text-red-600">
          {tastedCount} of {totalSakes} Sakes Stamped
        </p>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Venue Map (Conceptual)</h3>
        {/* Simplified conceptual map for visual feedback */}
        <div
          className="relative w-full h-96 bg-gray-100 border-4 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center text-center font-mono text-gray-600"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f3f4f6, #f3f4f6 10px, #e5e7eb 10px, #e5e7eb 20px)' }}
        >
          {sakeData.map((sake, index) => {
            const hasTasted = rankings[sake.id]?.tasted;
            // Place markers based on their location index
            const xPos = (index % 3) * 30 + 15;
            const yPos = Math.floor(index / 3) * 35 + 15;
            const colorClass = hasTasted ? 'bg-green-600 ring-green-300' : 'bg-red-500 ring-red-300';

            return (
              <div
                key={sake.id}
                className={`absolute p-2 rounded-full ring-4 transition-all duration-300 ${colorClass} text-white font-bold text-xs shadow-md`}
                style={{ top: `${yPos}%`, left: `${xPos}%`, transform: 'translate(-50%, -50%)' }}
              >
                {sake.location.replace('Booth ', '')}
                {hasTasted && <Check className="w-3 h-3 absolute -top-1 -right-1 bg-white text-green-600 rounded-full" />}
              </div>
            );
          })}
          <div className="absolute top-4 left-4 text-sm font-semibold text-gray-800 bg-white p-1 rounded-lg shadow-sm">Entrance</div>
          <div className="absolute bottom-4 right-4 text-sm font-semibold text-gray-800 bg-white p-1 rounded-lg shadow-sm">Food Zone</div>
        </div>
      </Card>
    </div>
  );
};

const SakeCard = ({ sake, ranking, updateRanking }) => {
  const currentRating = ranking?.rating || 0;
  const currentNotes = ranking?.notes || '';
  const isTasted = ranking?.tasted || false;
  const [showNotes, setShowNotes] = useState(false);
  const [localNotes, setLocalNotes] = useState(currentNotes);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Sync local state with remote state when it changes
    setLocalNotes(currentNotes);
  }, [currentNotes]);

  const handleRating = (newRating) => {
    // If the user rates, they must have tasted it
    updateRanking(sake.id, { rating: newRating, tasted: true });
  };

  const handleStamp = () => {
    // Toggle the tasted status
    updateRanking(sake.id, { tasted: !isTasted });
  };

  const saveNotes = async (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setIsSaving(true);
      await updateRanking(sake.id, { notes: localNotes, tasted: true });
      setIsSaving(false);
      e.target.blur(); // Hide keyboard after saving
    }
  };

  return (
    <Card className="flex flex-col justify-between items-start space-y-3">
      {/* Sake Header */}
      <div className="flex-grow space-y-1 w-full">
        <h3 className="text-xl font-extrabold text-gray-900">{sake.name}</h3>
        <p className="text-sm text-gray-600 font-medium">{sake.brewery} ({sake.region})</p>
        <div className="flex flex-wrap items-center space-x-2 text-sm text-red-600">
          <Wine className="w-4 h-4" />
          <span className="font-semibold">{sake.style}</span>
          <span className="font-light text-gray-400 hidden sm:inline">|</span>
          <span className="text-sm font-light text-gray-500 mt-1 sm:mt-0">
            {sake.location}
          </span>
        </div>
      </div>
      
      {/* Flavor Profile Toggle */}
      <button
        onClick={() => setShowNotes(!showNotes)}
        className="w-full text-left text-sm text-blue-600 font-medium py-1 flex items-center justify-between transition-colors duration-200 hover:text-blue-800"
      >
        <span className='font-bold'>Sake Profile & Notes</span>
        {showNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>


      {/* Expanded Details and Interaction */}
      {showNotes && (
        <div className="w-full space-y-4 pt-2 border-t border-gray-100">
          <div className='p-3 bg-gray-50 rounded-lg text-sm text-gray-700'>
            <p className='font-bold mb-1 text-red-600'>Official Flavor Profile:</p>
            <p className='italic'>{sake.flavor}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor={`notes-${sake.id}`} className="text-xs font-semibold text-gray-500 flex items-center">
              <Edit2 className="w-4 h-4 mr-1"/> My Tasting Notes ({isSaving ? 'Saving...' : 'Saved'})
            </label>
            <input
              id={`notes-${sake.id}`}
              type="text"
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              onBlur={saveNotes}
              onKeyDown={saveNotes}
              placeholder="e.g., 'Sweet melon, great acidity.'"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-shadow"
              disabled={!isTasted && currentRating === 0}
            />
          </div>
        </div>
      )}

      {/* Rating and Stamp Buttons */}
      <div className="w-full flex justify-between items-center pt-2 border-t border-gray-100 mt-3">
        {/* Rating Section */}
        <div className="flex flex-col items-start space-y-1">
          <div className="text-xs font-semibold text-gray-500">My Rating:</div>
          <StarRating rating={currentRating} size={24} onRate={handleRating} />
        </div>

        {/* Stamp Button */}
        <button
          onClick={handleStamp}
          className={`w-36 py-2 px-3 text-sm rounded-full font-bold transition-all duration-200
            ${isTasted
              ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
              : 'bg-gray-400 text-white shadow-md hover:bg-gray-500'
            }`}
        >
          <div className="flex items-center justify-center">
            {isTasted ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <Package className="w-5 h-5 mr-2" />
            )}
            {isTasted ? 'Stamped!' : 'Stamp Here'}
          </div>
        </button>
      </div>
    </Card>
  );
};

const SakesView = ({ sakeData, rankings, updateRanking }) => {
  return (
    <div className="p-4 space-y-4">
      <Card className="bg-red-50 border-red-200">
        <h2 className="text-2xl font-extrabold text-red-800 mb-2 flex items-center">
          <List className="w-6 h-6 mr-2" />
          Tasting List & Stamp Collection
        </h2>
        <p className="text-red-700">Rate sakes with stars, collect a stamp, and add your tasting notes!</p>
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

// --- NEW SCAN VIEW COMPONENT ---

const ScanView = ({ sakeData, passport, updateRanking }) => {
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [scanning, setScanning] = useState(true);

    const handleScan = useCallback((result) => {
        // Only proceed if a result is present AND we are actively scanning
        if (!scanning || !result || !result.text) {
            return;
        }

        const scannedCode = result.text.toLowerCase().trim();
        setScanning(false); // Stop scanning immediately after detecting the code

        const sake = sakeData.find(s => s.id === scannedCode);
        const isAlreadyStamped = passport[scannedCode]?.tasted;

        if (!sake) {
            setMessage(`Error: Code "${scannedCode}" not recognized.`);
            setIsSuccess(false);
        } else if (isAlreadyStamped) {
            setMessage(`Success! You already stamped ${sake.name}.`);
            setIsSuccess(true);
        } else {
            // --- CORE STAMP LOGIC: Update Firestore ---
            const update = { tasted: true };
            if (!passport[scannedCode]?.rating) {
                update.rating = 3;
            }
            updateRanking(sake.id, update);
            setMessage(`STAMPED! You collected the stamp for ${sake.name}!`);
            setIsSuccess(true);
        }
        
        // After showing the message, reset state to allow another scan after a delay
        setTimeout(() => {
            setMessage('');
            setScanning(true);
        }, 3000); // 3-second delay before allowing the next scan
    }, [passport, updateRanking, scanning, sakeData]);

    const handleError = (err) => {
        setMessage('Error accessing camera. Please ensure camera permissions are granted.');
        setIsSuccess(false);
        console.error(err);
    };

    // --- MOCK COMPONENT FOR FALLBACK ---
    const MockQrReader = ({ onResult, onError }) => {
        const [mockInput, setMockInput] = useState('');
        
        // Check if QrReader is available in the global scope (a common way libraries make themselves available)
        // If not available, we use the Mock UI for manual input
        if (typeof QrReader !== 'undefined') {
            // If the import succeeded, return the real component (although React components shouldn't be called like this)
            // This structure is purely defensive against module resolution failure.
            return <div>Error loading scanner component. Check console.</div>; 
        }

        return (
            <div className="flex flex-col items-center justify-center h-full space-y-4 bg-gray-100 p-4">
                <p className="text-sm text-gray-600 font-semibold">Scanner Unavailable: Enter ID manually:</p>
                <input
                    type="text"
                    placeholder="Enter sake-ID (e.g., sake-1)"
                    value={mockInput}
                    onChange={(e) => setMockInput(e.target.value)}
                    className="px-3 py-2 border rounded-lg w-full text-center"
                />
                <button
                    onClick={() => {
                        if (mockInput) { onResult({ text: mockInput }); setMockInput(''); }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
                >
                    Simulate Stamp
                </button>
            </div>
        );
    };
    
    // We use the imported QrReader if available, otherwise we use the Mock.
    const ScannerComponent = typeof QrReader !== 'undefined' ? QrReader : MockQrReader;

    return (
        <div className="p-4 flex flex-col items-center justify-start min-h-[80vh]">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4 border-b pb-2 w-full flex items-center">
                <Scan className="w-6 h-6 mr-2 text-red-500" />
                Stamp Collection (Live Scan)
            </h2>
            
            <Card className="w-full max-w-sm text-center overflow-hidden">
                <div className="relative w-full aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-inner">
                    {scanning ? (
                        <ScannerComponent
                            delay={300} 
                            onError={handleError}
                            onResult={handleScan}
                            constraints={{ facingMode: 'environment' }} 
                            style={{ width: '100%', height: '100%' }}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-indigo-500 bg-gray-50">
                            <CheckCircle className="w-10 h-10 mb-2 animate-pulse" />
                            <p className="font-semibold text-sm">Processing Scan...</p>
                        </div>
                    )}
                    <div className="absolute inset-0 border-8 border-dashed border-indigo-400 opacity-70 rounded-xl pointer-events-none"></div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                    {scanning ? 'Point camera at the booth QR code.' : 'Stamp Collected!'}
                </div>
            </Card>

            {/* Status Message */}
            {message && (
                <div className={`mt-4 w-full max-w-sm p-3 rounded-lg font-semibold shadow-md ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

const MyRankingsView = ({ sakeData, rankings, userId }) => {
  const tastedSakes = useMemo(() => {
    return sakeData
      .map(sake => ({
        ...sake,
        ranking: rankings[sake.id] || { rating: 0, tasted: false, notes: '' }
      }))
      .filter(sake => sake.ranking.tasted)
      .sort((a, b) => b.ranking.rating - a.ranking.rating); // Sort by highest rating first
  }, [sakeData, rankings]);

  const totalSakes = sakeData.length;
  const ratedCount = tastedSakes.filter(sake => sake.ranking.rating > 0).length;
  const averageRating = ratedCount > 0
    ? (tastedSakes.reduce((sum, sake) => sum + sake.ranking.rating, 0) / ratedCount).toFixed(1)
    : 'N/A';

  return (
    <div className="p-4 space-y-6">
      <Card className="bg-red-50 border-red-200">
        <h2 className="text-2xl font-extrabold text-red-800 mb-2 flex items-center">
          <QrCode className="w-6 h-6 mr-2" />
          My Tasting Passport
        </h2>
        <p className="text-red-700 font-mono text-xs overflow-hidden truncate">
          User ID: {userId || 'Authenticating...'}
        </p>
      </Card>

      <Card className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-4xl font-extrabold text-red-600">{tastedSakes.length}</p>
          <p className="text-sm font-medium text-gray-500">Sakes Stamped</p>
          <p className="text-xs text-gray-400">/ {totalSakes} Total</p>
        </div>
        <div>
          <p className="text-4xl font-extrabold text-red-600 flex items-center justify-center">
            {averageRating} <Star className="w-5 h-5 ml-2 fill-yellow-400 text-yellow-400" />
          </p>
          <p className="text-sm font-medium text-gray-500">Average Rating</p>
          <p className="text-xs text-gray-400">{ratedCount} Rated</p>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Detailed History</h3>
        {tastedSakes.length === 0 ? (
          <div className="text-gray-500 italic p-4 text-center border-2 border-dashed rounded-lg">
            Start tasting sakes to fill your passport!
          </div>
        ) : (
          <ul className="space-y-4">
            {tastedSakes.map((sake) => (
              <li key={sake.id} className="border-b pb-3 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-900">{sake.name}</p>
                    <p className="text-xs text-gray-500">{sake.brewery}</p>
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <span className="font-bold text-lg text-red-600 mr-1">{sake.ranking.rating.toFixed(0)}</span>
                    <StarRating rating={sake.ranking.rating} size={16} onRate={() => {}} />
                  </div>
                </div>
                {sake.ranking.notes && (
                  <p className='mt-2 text-sm italic text-gray-700'>
                    Notes: "{sake.ranking.notes}"
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

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

    if (loading) {
      return <Loader message="Loading your tasting history..." />;
    }

    // Wrap content in a div that is scrollable, allowing the header/footer to be fixed
    return (
      <div className="overflow-y-auto h-full">
        {(() => {
            switch (currentView) {
                case VIEWS.MAP:
                    return <MapView sakeData={SAKE_DATA} rankings={rankings} />;
                case VIEWS.SAKES:
                    return <SakesView sakeData={SAKE_DATA} rankings={rankings} updateRanking={updateRanking} />;
                case VIEWS.SCAN: // <-- NEW: THIS DISPLAYS THE SCANNER VIEW
                    return <ScanView sakeData={SAKE_DATA} passport={rankings} updateRanking={updateRanking} />;
                case VIEWS.MY_PASSPORT:
                    return <MyRankingsView sakeData={SAKE_DATA} rankings={rankings} userId={userId} />;
                default:
                    return <SakesView sakeData={SAKE_DATA} rankings={rankings} updateRanking={updateRanking} />;
            }
        })()}
        <div className="h-4"></div> {/* Small buffer for scroll clearance */}
      </div>
    );
  };

  return (
    // Set root container to full screen and column flex
    <div className="h-screen bg-gray-50 font-sans flex flex-col overflow-hidden max-w-xl mx-auto w-full">
      <style jsx global>{`
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
        /* Prevent elastic scrolling/bounce effect, common in native apps */
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
    [VIEWS.PASSPORT]: QrCode, // Represents the digital stamp card/passport
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