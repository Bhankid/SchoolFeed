import React, { useState } from "react";
import axios from "axios"; // Import axios for API requests

interface AddStudentProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: {
    id: number;
    name: string;
    class: string;
    paymentType: string;
    balance: string;
    lastMeal: string;
  }) => void;
  darkMode: boolean;
}

const AddStudent: React.FC<AddStudentProps> = ({
  isOpen,
  onClose,
  onAddStudent,
  darkMode,
}) => {
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    paymentType: "",
    balance: "",
    lastMeal: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle student submission
  const handleSubmit = async () => {
    if (!newStudent.name || !newStudent.class || !newStudent.paymentType)
      return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/students", {
        name: newStudent.name,
        class: newStudent.class,
        paymentType: newStudent.paymentType,
        balance: parseFloat(newStudent.balance) || 0,
        lastMeal: newStudent.lastMeal || null,
      });

      onAddStudent(response.data);
      setNewStudent({
        name: "",
        class: "",
        paymentType: "",
        balance: "",
        lastMeal: "",
      });
      onClose();

      // Redirect to home page after successful submission
      window.location.href = "http://localhost:5173";
    } catch (err) {
      setError("Failed to add student. Please try again.");
      console.error("Error adding student:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } p-6 rounded-lg shadow-lg w-full sm:w-96 transition-transform transform scale-100`}
      >
        <h3 className="text-xl font-bold mb-4 text-center">Add New Student</h3>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:outline-none ${
                darkMode
                  ? "bg-gray-700 text-gray-300 border-gray-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              required
            />
          </div>

          {/* Class Selection */}
          <div>
            <label className="block text-sm font-medium">Class</label>
            <select
              name="class"
              value={newStudent.class}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 text-gray-300 border-gray-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              required
            >
              <option value="">Select Class</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
            </select>
          </div>

          {/* Payment Type */}
          <div>
            <label className="block text-sm font-medium">Payment Type</label>
            <select
              name="paymentType"
              value={newStudent.paymentType}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 text-gray-300 border-gray-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              required
            >
              <option value="">Select Payment Type</option>
              <option value="Regular">Regular Eater</option>
              <option value="Advance">Advance Payment</option>
              <option value="Irregular">Irregular Eater</option>
              <option value="Credit">Credit Eater</option>
            </select>
          </div>

          {/* Balance Field */}
          <div>
            <label className="block text-sm font-medium">Balance</label>
            <input
              type="text"
              name="balance"
              value={newStudent.balance}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:outline-none ${
                darkMode
                  ? "bg-gray-700 text-gray-300 border-gray-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              placeholder="₵0.00"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md transition-colors ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={`px-4 py-2 rounded-md transition-colors ${
                darkMode
                  ? "bg-indigo-500 text-white hover:bg-indigo-400"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Adding..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
