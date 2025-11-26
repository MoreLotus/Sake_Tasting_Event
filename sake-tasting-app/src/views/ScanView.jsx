import React, { useState, useCallback, Suspense } from "react";
import { CheckCircle } from "lucide-react";
import Card from "../components/Card";

const LazyQrScanner = React.lazy(() => import("react-qr-scanner"));

const ScanView = ({ sakeData, passport, updateRanking }) => {
  const [scanning, setScanning] = useState(true);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleScan = useCallback(
    result => {
      if (!scanning || !result?.text) return;

      const scanned = result.text.trim().toLowerCase();
      const sake = sakeData.find(s => s.id === scanned);

      setScanning(false);

      if (!sake) {
        setMessage(`Code "${scanned}" not recognized.`);
        setIsSuccess(false);
      } else {
        updateRanking(sake.id, { tasted: true, rating: 3 });
        setMessage(`STAMPED: ${sake.name}`);
        setIsSuccess(true);
      }

      setTimeout(() => {
        setScanning(true);
        setMessage("");
      }, 2000);
    },
    [scanning, sakeData, passport]
  );

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-3">Stamp Scanner</h2>

      <Card className="w-full max-w-sm">
        <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
          <Suspense fallback={<div className="p-3 text-center">Loading Scanner…</div>}>
            {scanning ? (
              <LazyQrScanner
                delay={300}
                style={{ width: "100%", height: "100%" }}
                onScan={handleScan}
              />
            ) : (
              <div className="flex flex-col h-full justify-center items-center text-green-600">
                <CheckCircle className="w-12 h-12 mb-2" />
                Processing…
              </div>
            )}
          </Suspense>
        </div>
      </Card>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-center w-full max-w-sm ${
            isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ScanView;
