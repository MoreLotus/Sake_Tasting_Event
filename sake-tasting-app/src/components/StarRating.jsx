import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating, onRate, size = 20 }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          onClick={() => onRate && onRate(star)}
          className={`cursor-pointer transition ${
            rating >= star
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
};

export default StarRating;
