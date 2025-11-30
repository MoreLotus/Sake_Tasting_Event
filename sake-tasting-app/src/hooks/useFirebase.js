import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics'; // 💡 NEW: Import getAnalytics
import { firebaseConfig, initialAuthToken } from '../config/constants';

const useFirebase = () => {
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [analytics, setAnalytics] = useState(null); // 💡 NEW: Analytics state

    useEffect(() => {
        try {
            if (Object.keys(firebaseConfig).length === 0) {
                throw new Error("Firebase config not available.");
            }
            const app = initializeApp(firebaseConfig);
            const authInstance = getAuth(app);
            const dbInstance = getFirestore(app);
            const analyticsInstance = getAnalytics(app); // 💡 Initialize Analytics

            setDb(dbInstance);
            setAuth(authInstance);
            setAnalytics(analyticsInstance); // 💡 Set the Analytics instance

            const authenticate = async () => {
                // ... (rest of the existing authentication logic)
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