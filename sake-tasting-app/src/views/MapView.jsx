import React from "react";
import { Map, Check } from "lucide-react";
import Card from "../components/Card";

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

        <p className="text-red-700">
          Collect stamps! Progress: {Math.round(progressPercent)}%
        </p>

        <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-sm font-semibold mt-1 text-red-600">
          {tastedCount} of {totalSakes} Sakes Stamped
        </p>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Venue Map</h3>

        <div className="relative w-full h-96 bg-gray-100 border-4 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center text-center font-mono text-gray-600"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#f3f4f6,#f3f4f6 10px,#e5e7eb 10px,#e5e7eb 20px)"
          }}
        >
          {sakeData.map((sake, index) => {
            const hasTasted = rankings[sake.id]?.tasted;
            const xPos = (index % 3) * 30 + 15;
            const yPos = Math.floor(index / 3) * 35 + 15;

            return (
              <div
                key={sake.id}
                className={`absolute p-2 rounded-full ring-4 shadow-md text-white font-bold text-xs
                ${hasTasted ? "bg-green-600 ring-green-300" : "bg-red-500 ring-red-300"}`}
                style={{
                  top: `${yPos}%`,
                  left: `${xPos}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                {sake.location.replace("Booth ", "")}
                {hasTasted && (
                  <Check className="w-3 h-3 absolute -top-1 -right-1 bg-white text-green-600 rounded-full" />
                )}
              </div>
            );
          })}

          <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded shadow text-sm font-semibold">
            Entrance
          </div>
          <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded shadow text-sm font-semibold">
            Food Zone
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MapView;
