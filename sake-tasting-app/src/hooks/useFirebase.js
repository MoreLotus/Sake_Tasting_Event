// src/hooks/useFirebase.js
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc
} from "firebase/firestore";

import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} from "firebase/auth";

// (You can move these to .env later)
const firebaseConfig = {
  apiKey: "AIzaSyD1gSjTObkN-A19DyHKCAbo9Lkbh_i3o6w",
  authDomain: "saketastingapp.firebaseapp.com",
  projectId: "saketastingapp",
  storageBucket: "saketastingapp.firebasestorage.app",
  messagingSenderId: "767903443393",
  appId: "1:767903443393:web:a48ef204b03d1da9684c96"
};

let firebaseApp = null;
let firestoreDb = null;
let firebaseAuth = null;

const useFirebase = () => {
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
    firestoreDb = getFirestore(firebaseApp);
    firebaseAuth = getAuth(firebaseApp);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setIsAuthReady(true);
        return;
      }

      // If not signed in, create anonymous account
      try {
        const cred = await signInAnonymously(firebaseAuth);
        const newUserId = cred.user.uid;
        setUserId(newUserId);

        // Ensure user exists in DB
        const userDocRef = doc(firestoreDb, "users", newUserId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, { created: Date.now() });
        }

        setIsAuthReady(true);
      } catch (e) {
        console.error("Auth error:", e);
        setIsAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    db: firestoreDb,
    userId,
    isAuthReady
  };
};

export default useFirebase;
