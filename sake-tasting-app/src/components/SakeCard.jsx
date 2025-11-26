import React, { useState } from "react";
import Card from "./Card";
import StarRating from "./StarRating";
import { CheckCircle } from "lucide-react";

const SakeCard = ({ sake, ranking, updateRanking }) => {
  const [notes, setNotes] = useState(ranking?.notes || "");

  const handleRating = (value) => {
    updateRanking(sake.id, { ...ranking, rating: value, tasted: true });
  };

  const handleNotesChange = (e) => {
    const val = e.target.value;
    setNotes(val);
    updateRanking(sake.id, { ...ranking, notes: val, tasted: true });
  };

  const toggleTasted = () => {
    updateRanking(sake.id, { ...ranking, tasted: !ranking?.tasted });
  };

  return (
    <Card className="relative">
      {/* Tasted Mark */}
      {ranking?.tasted && (
        <CheckCircle className="text-green-600 w-6 h-6 absolute top-3 right-3" />
      )}

      <h3 className="text-xl font-bold text-gray-800">{sake.name}</h3>
      <p className="text-sm text-gray-500">
        {sake.brewery} — {sake.region}
      </p>

      <p className="text-xs text-red-600 font-semibold mt-1">
        {sake.style} • {sake.location}
      </p>

      <p className="text-sm mt-2 italic text-gray-600">{sake.flavor}</p>

      {/* Rating */}
      <div className="mt-3">
        <StarRating
          rating={ranking?.rating || 0}
          onRate={handleRating}
        />
      </div>

      {/* Notes */}
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Add tasting notes…"
        className="w-full mt-3 border rounded-md p-2 text-sm focus:ring-red-300 focus:border-red-400"
        rows={3}
      />

      {/* Tasted toggle */}
      <button
        onClick={toggleTasted}
        className={`mt-3 w-full py-2 rounded-md text-white font-semibold transition 
          ${ranking?.tasted ? "bg-green-600" : "bg-red-600"}`}
      >
        {ranking?.tasted ? "Stamped" : "Mark as Tasted"}
      </button>
    </Card>
  );
};

export default SakeCard;
