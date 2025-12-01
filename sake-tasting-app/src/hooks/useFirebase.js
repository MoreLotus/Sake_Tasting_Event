import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'; // 💡 FIX 1: Added enableIndexedDbPersistence
import { getAnalytics } from 'firebase/analytics'; 
import { firebaseConfig, initialAuthToken } from '../config/constants';

const useFirebase = () => {
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        try {
            if (Object.keys(firebaseConfig).length === 0) {
                throw new Error("Firebase config not available.");
            }
            const app = initializeApp(firebaseConfig);
            const authInstance = getAuth(app);
            const dbInstance = getFirestore(app);
            const analyticsInstance = getAnalytics(app);

            // 💡 FIX 2: Implementation of Persistence Logic
            const enablePersistence = async () => {
                try {
                    // This function attempts to set up local data storage (IndexedDB).
                    // This is key for instant loading and persistent data on repeat visits.
                    await enableIndexedDbPersistence(dbInstance);
                    console.log("Firestore persistence enabled.");
                } catch (err) {
                    if (err.code === 'failed-precondition') {
                        // This happens if the user has multiple tabs open accessing Firestore.
                        console.warn("Firestore persistence failed: Multiple tabs open or already enabled.");
                    } else if (err.code === 'unimplemented') {
                        // Browser does not support IndexedDB (very rare).
                        console.warn("Firestore persistence failed: Browser not supported.");
                    }
                }
            }
            
            enablePersistence(); // Run the async function immediately

            setDb(dbInstance);
            setAuth(authInstance);
            setAnalytics(analyticsInstance);

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

    // 💡 Return the analytics instance
    return { db, auth, userId, isAuthReady, analytics }; 
};

export default useFirebase;