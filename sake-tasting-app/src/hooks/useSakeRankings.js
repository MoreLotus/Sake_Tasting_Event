import { useState, useEffect, useCallback } from 'react';
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics'; // 💡 NEW: Import logEvent
import { appId, SAKE_DATA } from '../config/constants'; // 💡 NEW: Import SAKE_DATA

// 💡 Accept the analytics instance as an argument
const useSakeRankings = (db, userId, isAuthReady, analytics) => { 
    const [rankings, setRankings] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ... (existing useEffect to fetch rankings remains unchanged)

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


    // 💡 Logging logic added to updateRanking
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