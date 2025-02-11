import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { Calendar, CircleDollarSign } from "lucide-react";

interface RecordPaymentProps {
  darkMode: boolean;
}

const RecordPayment: React.FC<RecordPaymentProps> = ({ darkMode }) => {
  const [isPresent, setIsPresent] = useState(false);
  const [isPaying, setIsPaying] = useState(false); // New state for paying status
  const [selectedClass, setSelectedClass] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // State to hold the current date
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-md p-4 max-w-lg mx-auto`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Record Payment
        </h3>
      </div>
      <form className="space-y-4 mt-4">
        {/* Select by Class & Search Bar (Side by Side on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Select by Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select by Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "focus:ring-indigo-500 bg-gray-700 text-gray-300"
                  : "focus:ring-indigo-500 bg-white text-gray-700"
              }`}
            >
              <option value="">All Classes</option>
              <option value="class1">Class 1</option>
              <option value="class2">Class 2</option>
              <option value="class3">Class 3</option>
            </select>
          </div>
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search Student
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-4 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "focus:ring-indigo-500 bg-gray-700 text-gray-300"
                  : "focus:ring-indigo-500 bg-white text-gray-700"
              }`}
              placeholder="Search by name..."
            />
          </div>
        </div>
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
        {/* Toggle Switches for Student Presence and Paying Status */}
        <div className="flex items-center space-x-4">
          {/* Student Presence Switch */}
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
          {/* Student Paying Switch */}
          <Switch
            checked={isPaying}
            onChange={setIsPaying}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ml-4 ${
              isPaying ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isPaying ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </Switch>
          <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Student is paying
          </span>
        </div>
        {/* Submit Button for Absent or Present but Not Paying */}
        {(isPresent === false || (isPresent && !isPaying)) && (
          <button
            type="submit"
            className={`w-full text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors ${
              darkMode ? "bg-red-500" : "bg-red-600"
            }`}
          >
            Submit Without Payment
          </button>
        )}
        {/* Conditional Form Rendering */}
        {isPresent && isPaying && (
          <>
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
                  value={currentDate}
                  readOnly
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
                <option value="advance">Select Payment Type</option>
                <option value="advance">Advance Payment</option>
                <option value="regular">Regular Payment</option>
                <option value="credit">Credit Payment</option>
                <option value="irregular">Irregular Payment</option>
              </select>
            </div>
            {/* Payment Mode Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Mode
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="cash"
                    className="form-radio text-indigo-500 cursor-pointer"
                  />
                  <span>Cash</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="momo"
                    className="form-radio text-indigo-500 cursor-pointer"
                  />
                  <span>MoMo</span>
                </label>
              </div>
            </div>
            {/* Submit Button for Payment */}
            <button
              type="submit"
              className={`w-full text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors ${
                darkMode ? "bg-indigo-500" : "bg-indigo-600"
              }`}
            >
              Record Payment
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default RecordPayment;
