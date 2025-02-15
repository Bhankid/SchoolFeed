import React from "react";
import { DollarSign } from "lucide-react";

function LowBalanceAlert({ darkMode }: { darkMode: boolean }) {
  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition duration-300`}
    >
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center w-full sm:w-auto">
          <DollarSign
            className={`w-6 h-6 ${
              darkMode ? "text-orange-400" : "text-orange-500"
            } mr-3 sm:mr-4`}
          />
          <div>
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Low Advance Balance
            </h3>
            <p
              className={`text-sm sm:text-base ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Students with low advance payment balance:
            </p>
          </div>
        </div>
        <span
          className={`text-sm ${
            darkMode ? "text-gray-400" : "text-gray-500"
          } mt-2 sm:mt-0`}
        >
          Updated 5m ago
        </span>
      </div>
      <div className="mt-4 pl-8 sm:pl-12">
        <ul className="space-y-2">
          <li
            className={`flex items-center justify-between px-2 py-2 ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } transition duration-300`}
          >
            <div>
              <span
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Yaa Asantewaa
              </span>
              <span
                className={`block text-xs sm:text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } ml-2`}
              >
                Balance: ₵10.00 | Next Meal Due: Tomorrow
              </span>
            </div>
            <button
              className={`${
                darkMode
                  ? "text-purple-400 hover:text-purple-300"
                  : "text-purple-600 hover:text-purple-800"
              } transition duration-300 text-sm`}
            >
              Top Up
            </button>
          </li>
          {/* More alert items would go here */}
        </ul>
      </div>
    </div>
  );
}

export default LowBalanceAlert;
