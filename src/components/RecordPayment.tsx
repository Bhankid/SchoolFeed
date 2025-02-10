import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { Calendar, CircleDollarSign } from "lucide-react";

interface RecordPaymentProps {
  darkMode: boolean;
}

const RecordPayment: React.FC<RecordPaymentProps> = ({ darkMode }) => {
  const [isPresent, setIsPresent] = useState(false);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-md p-6`}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Record Payment
      </h3>
      <form className="space-y-4">
        {/* Student Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Student
          </label>
          <select
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              darkMode
                ? "focus:ring-indigo-500 bg-gray-700 text-gray-300"
                : "focus:ring-indigo-500 bg-white text-gray-700"
            }`}
          >
            <option value="">Select Student</option>
            <option value="student1">Kofi Owusu</option>
            <option value="student2">Akua Mensah</option>
            <option value="student3">Yaa Asantewaa</option>
          </select>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <div className="relative">
            <CircleDollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="number"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "focus:ring-indigo-500 bg-gray-700 text-gray-300"
                  : "focus:ring-indigo-500 bg-white text-gray-700"
              }`}
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <div className="relative">
            <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="date"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "focus:ring-indigo-500 bg-gray-700 text-gray-300"
                  : "focus:ring-indigo-500 bg-white text-gray-700"
              }`}
            />
          </div>
        </div>

        {/* Payment Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Payment Type
          </label>
          <select
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              darkMode
                ? "focus:ring-indigo-500 bg-gray-700 text-gray-300"
                : "focus:ring-indigo-500 bg-white text-gray-700"
            }`}
          >
            <option value="advance">Advance Payment</option>
            <option value="regular">Regular Payment</option>
            <option value="credit">Credit Payment</option>
            <option value="irregular">Irregular Payment</option>
          </select>
        </div>

        {/* Toggle Switch for Student Presence */}
        <div className="flex items-center space-x-2">
          <Switch
            checked={isPresent}
            onChange={setIsPresent}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              isPresent ? "bg-indigo-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isPresent ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </Switch>
          <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Student is present
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors ${
            darkMode ? "bg-indigo-500" : "bg-indigo-600"
          }`}
        >
          Record Payment
        </button>
      </form>
    </div>
  );
};

export default RecordPayment;
