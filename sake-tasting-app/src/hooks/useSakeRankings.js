import { useState, useEffect, useCallback } from 'react';
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics'; 
import { appId, SAKE_DATA } from '../config/constants';

<<<<<<< HEAD
// 💡 Accept the analytics instance as an argument
const useSakeRankings = (db, userId, isAuthReady) => { 
    const [rankings, setRankings] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Don't run until auth is ready. But don't block the UI.
        if (!isAuthReady) return;

        // If no user is signed in, clear rankings but don't show loaders
=======
// 🚀 FIX 1: Added 'analytics' to the arguments list
const useSakeRankings = (db, userId, isAuthReady, analytics) => { 
    const [rankings, setRankings] = useState({});
    // 💡 Changed loading to false initially, per previous discussion (UI Shell pattern)
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        // Don't run until auth is ready.
        if (!isAuthReady) return;

        // If no user is signed in, clear rankings.
>>>>>>> 28630fe03d68641035602c8b735610cad055cf94
        if (!db || !userId) {
            setRankings({});
            return;
        }

        // Start loading in background
        setLoading(true);

<<<<<<< HEAD
=======
        // ✅ FIX 3: Using the correct template string method for the collection path
        // The path structure "collection/doc/collection/doc/collection" is inferred by the SDK
>>>>>>> 28630fe03d68641035602c8b735610cad055cf94
        const q = collection(db, "artifacts", appId, "users", userId, "sakeRankings");

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const newRankings = {};
                snapshot.forEach((doc) => {
                    newRankings[doc.id] = doc.data();
                });
                setRankings(newRankings);
                setLoading(false);
            },
            (e) => {
                console.error("Firestore onSnapshot error:", e);
                setError("Failed to load your tasting passport data.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
<<<<<<< HEAD

    }, [db, userId, isAuthReady]);

    // 💡 Logging logic added to updateRanking
=======

    }, [db, userId, isAuthReady]);

>>>>>>> 28630fe03d68641035602c8b735610cad055cf94
    const updateRanking = useCallback(async (sakeId, updates) => {
        if (!db || !userId) {
            console.warn("Database not ready or User not logged in.");
            return;
        }

        // ✅ FIX 2: Correct Firestore doc path syntax using comma-separated segments
        const docRef = doc(
            db, 
            "artifacts", appId, 
            "users", userId, 
            "sakeRankings", sakeId 
        );

        const currentData = rankings[sakeId] || {
            rating: 0,
            tasted: false,
            notes: '',
            timestamp: Date.now()
        };

        const updatePayload = {
            sakeId: sakeId,
            timestamp: Date.now(),
            rating: updates.rating !== undefined ? updates.rating : currentData.rating,
            tasted: updates.tasted !== undefined ? updates.tasted : currentData.tasted,
            notes: updates.notes !== undefined ? updates.notes : currentData.notes,
        };

        try {
            await setDoc(docRef, updatePayload, { merge: true });
            
            // 🚀 ANALYTICS TRACKING: Log event on successful update
            if (analytics && (updates.tasted || updates.rating)) {
                const sake = SAKE_DATA.find(s => s.id === sakeId);
                logEvent(analytics, 'sake_ranked_stamped', {
                    sake_id: sakeId,
                    sake_name: sake ? sake.name : 'Unknown',
                    new_rating: updatePayload.rating,
                    stamped: updatePayload.tasted ? 'yes' : 'no'
                });
            }

        } catch (e) {
            console.error("Error updating ranking:", e);
            setError("Could not save your ranking. Please try again.");
        }
    }, [db, userId, rankings, analytics]); // Dependency added

    return { rankings, loading, error, updateRanking };
};

export default useSakeRankings;