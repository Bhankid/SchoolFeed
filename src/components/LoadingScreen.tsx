import React, { useEffect, useState } from "react";

function LoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate a loading process with a progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5; // Increment progress by 5 every 100ms
      });
    }, 100);

    // Once loading is complete, trigger the callback to transition to the main app
    setTimeout(() => {
      onLoaded(); // Call the parent function to hide the loader
    }, 5000); // Simulate a 5-second loading time

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="text-center">
        {/* Progress Bar */}
        <div className="relative w-48 h-4 bg-gray-700 rounded-full overflow-hidden mb-4">
          <div
            className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-[5s] ease-in-out"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>

        {/* Loading Text with Pulse Animation */}
        <p
          className="text-white text-lg font-semibold animate-pulse"
          style={{ animationDuration: "1.5s" }}
        >
          Loading...
        </p>

        {/* Progress Percentage */}
        <p className="text-green-600 text-sm mt-2">{loadingProgress}%</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
