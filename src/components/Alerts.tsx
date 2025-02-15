import React, { useState } from "react";
import UnpaidFeesAlert from "./UnpaidFeesAlert";
import LowBalanceAlert from "./LowBalanceAlert";

function Alerts({ darkMode }: { darkMode: boolean }) {
  const [activeTab, setActiveTab] = useState<"unpaid" | "low-balance">(
    "unpaid"
  );

  return (
    <div
      className={`${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen px-4 sm:px-6 lg:px-8 py-4 transition-colors duration-300`}
    >
      {/* Header */}
      <h2
        className={`text-2xl font-bold mb-6 text-center sm:text-left ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Meal Fee Alerts
      </h2>

      {/* Tab Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("unpaid")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "unpaid"
                ? darkMode
                  ? "bg-purple-500 text-white"
                  : "bg-purple-600 text-white"
                : darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-gray-900 hover:bg-gray-200"
            } transition duration-300`}
          >
            Unpaid Fees
          </button>
          <button
            onClick={() => setActiveTab("low-balance")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "low-balance"
                ? darkMode
                  ? "bg-purple-500 text-white"
                  : "bg-purple-600 text-white"
                : darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-gray-900 hover:bg-gray-200"
            } transition duration-300`}
          >
            Low Balance
          </button>
        </div>
        <button
          className={`px-4 py-2 rounded-md ${
            darkMode
              ? "bg-purple-500 text-white hover:bg-purple-600"
              : "bg-purple-600 text-white hover:bg-purple-700"
          } transition duration-300`}
        >
          Notify All Parents
        </button>
      </div>

      {/* Conditional Rendering of Tabs */}
      {activeTab === "unpaid" && <UnpaidFeesAlert darkMode={darkMode} />}
      {activeTab === "low-balance" && <LowBalanceAlert darkMode={darkMode} />}
    </div>
  );
}

export default Alerts;
