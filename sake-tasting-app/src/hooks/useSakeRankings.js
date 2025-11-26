// src/hooks/useSakeRankings.js
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot
} from "firebase/firestore";

const useSakeRankings = (db, userId, isAuthReady) => {
  const [rankings, setRankings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db || !userId || !isAuthReady) return;

    const rankingsRef = doc(db, "rankings", userId);

    const unsubscribe = onSnapshot(
      rankingsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setRankings(snapshot.data());
        } else {
          setRankings({});
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError("Could not load your tasting passport.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, userId, isAuthReady]);

  const updateRanking = async (sakeId, newData) => {
    if (!db || !userId) return;

    try {
      const rankingsRef = doc(db, "rankings", userId);
      const current = (await getDoc(rankingsRef)).data() || {};

      const updated = {
        ...current,
        [sakeId]: {
          ...current[sakeId],
          ...newData
        }
      };

      await setDoc(rankingsRef, updated);
    } catch (err) {
      console.error("Failed to update ranking:", err);
    }
  };

  return {
    rankings,
    loading,
    error,
    updateRanking
  };
};

export default useSakeRankings;
