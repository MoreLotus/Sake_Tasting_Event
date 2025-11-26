import React, { useMemo } from "react";
import { QrCode, Star } from "lucide-react";
import Card from "../components/Card";
import StarRating from "../components/StarRating";

const MyPassportView = ({ sakeData, rankings, userId }) => {
  const tasted = useMemo(
    () =>
      sakeData
        .map(s => ({
          ...s,
          ranking: rankings[s.id] || { rating: 0, tasted: false }
        }))
        .filter(s => s.ranking.tasted)
        .sort((a, b) => b.ranking.rating - a.ranking.rating),
    [sakeData, rankings]
  );

  const avgRating =
    tasted.length > 0
      ? (tasted.reduce((sum, s) => sum + s.ranking.rating, 0) / tasted.length).toFixed(1)
      : "N/A";

  return (
    <div className="p-4 space-y-6">
      <Card className="bg-red-50">
        <h2 className="text-2xl font-extrabold text-red-800 mb-2 flex items-center">
          <QrCode className="w-6 h-6 mr-2" />
          My Tasting Passport
        </h2>
        <p className="text-sm text-gray-600">User: {userId}</p>
      </Card>

      <Card className="grid grid-cols-2 gap-3 text-center">
        <div>
          <p className="text-4xl font-bold text-red-600">{tasted.length}</p>
          <p className="text-gray-500 text-sm">Sakes Stamped</p>
        </div>

        <div>
          <p className="text-4xl font-bold text-red-600 flex items-center justify-center">
            {avgRating} <Star className="w-5 h-5 ml-2 text-yellow-400 fill-yellow-400" />
          </p>
          <p className="text-gray-500 text-sm">Avg Rating</p>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4">History</h3>

        {tasted.length === 0 && (
          <p className="text-center italic text-gray-500">Start tasting!</p>
        )}

        <ul className="space-y-4">
          {tasted.map(sake => (
            <li key={sake.id} className="border-b pb-3 last:border-none">
              <div className="flex justify-between">
                <p className="font-semibold">{sake.name}</p>
                <StarRating rating={sake.ranking.rating} size={16} onRate={() => {}} />
              </div>

              {sake.ranking.notes && (
                <p className="text-sm italic mt-2">{sake.ranking.notes}</p>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default MyPassportView;
