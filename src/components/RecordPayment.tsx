import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch } from "@headlessui/react";
import { Calendar, CircleDollarSign } from "lucide-react";

interface RecordPaymentProps {
  darkMode: boolean;
}

const RecordPayment: React.FC<RecordPaymentProps> = ({ darkMode }) => {
  const [isPresent, setIsPresent] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState<string[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);

  // Fetch Available Classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/students/classes"
        );
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Fetch Students when Class Changes
  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      setFilteredStudents([]);
      return;
    }
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/students/by-class/${selectedClass}`
        );
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [selectedClass]);

  // Filter Students by Search Query
  useEffect(() => {
    const filtered = students.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  // Handle Payment & Attendance Submission
  const handleSubmit = async () => {
    if (!selectedStudent) {
      alert("Please select a student.");
      return;
    }

    try {
      // Record Attendance
      await axios.post("http://localhost:3000/attendance", {
        studentId: selectedStudent,
        isPresent: isPresent,
      });

      // If student is paying, record payment
      if (isPaying) {
        if (!amount || !paymentType || !paymentMode) {
          alert("Please fill all payment details.");
          return;
        }

        await axios.post("http://localhost:3000/payments", {
          studentId: selectedStudent,
          amount: parseFloat(amount),
          paymentType,
          paymentMode,
          date: currentDate,
        });
      }

      // Reset form
      setSelectedStudent(null);
      setAmount("");
      setPaymentType("");
      setPaymentMode("");
      setIsPresent(false);
      setIsPaying(false);

      alert("Attendance & Payment recorded successfully!");
    } catch (err) {
      console.error("Error recording data:", err);
      alert("Failed to record data. Please try again.");
    }
  };

  async function handleSubmitWithoutPayment(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    event.preventDefault();

    if (!selectedStudent) {
      alert("Please select a student.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/attendance", {
        studentId: selectedStudent,
        isPresent: isPresent,
      });

      // Reset form fields related to attendance
      setSelectedStudent(null);
      setIsPresent(false);
      setIsPaying(false);

      alert("Attendance recorded successfully!");
    } catch (err) {
      console.error("Error recording attendance:", err);
      alert("Failed to record attendance. Please try again.");
    }
  }

  return (
    <div
      className={`p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <h2 className="text-xl font-bold mb-4">Record Payment</h2>

      {/* Select by Class & Search Bar (Side by Side on Desktop) */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Select by Class */}
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-2">
            Select by Class
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              darkMode
                ? "focus:ring-purple-500 bg-gray-700 text-gray-300"
                : "focus:ring-purple-500 bg-white text-gray-700"
            }`}
          >
            <option value="">All Classes</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-2">
            Search Student
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-4 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? "focus:ring-purple-500 bg-gray-700 text-gray-300"
                : "focus:ring-purple-500 bg-white text-gray-700"
            }`}
            placeholder="Search by name..."
          />
        </div>
      </div>

      {/* Student Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Student</label>
        <select
          value={selectedStudent || ""}
          onChange={(e) => setSelectedStudent(Number(e.target.value))}
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
            darkMode
              ? "focus:ring-indigo-500 bg-gray-700 text-gray-300"
              : "focus:ring-indigo-500 bg-white text-gray-700"
          }`}
        >
          <option value="">Select Student</option>
          {filteredStudents.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      {/* Toggle Switches for Student Presence and Paying Status */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Student Presence Switch */}
        <div className="flex items-center space-x-2">
          <Switch
            checked={isPresent}
            onChange={setIsPresent}
            className={`${
              isPresent ? "bg-purple-500" : "bg-gray-400"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className="sr-only">Student is present</span>
            <span
              className={`${
                isPresent ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
          <span className="text-sm">Student is present</span>
        </div>

        {/* Student Paying Switch */}
        <div className="flex items-center space-x-2">
          <Switch
            checked={isPaying}
            onChange={setIsPaying}
            className={`${
              isPaying ? "bg-purple-500" : "bg-gray-400"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className="sr-only">Student is paying</span>
            <span
              className={`${
                isPaying ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
          <span className="text-sm">Student is paying</span>
        </div>
      </div>

      {/* Submit Button for Absent or Present but Not Paying */}
      {(isPresent === false || (isPresent && !isPaying)) && (
        <button
          onClick={handleSubmitWithoutPayment}
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "focus:ring-purple-500 bg-gray-700 text-gray-300"
                  : "focus:ring-purple-500 bg-white text-gray-700"
              }`}
              placeholder="₵0.00"
            />
          </div>

          {/* Date Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "focus:ring-purple-500 bg-gray-700 text-gray-300"
                  : "focus:ring-purple-500 bg-white text-gray-700"
              }`}
            />
          </div>

          {/* Payment Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Payment Type
            </label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "focus:ring-purple-500 bg-gray-700 text-gray-300"
                  : "focus:ring-purple-500 bg-white text-gray-700"
              }`}
            >
              <option value="">Select Payment Type</option>
              <option value="Advance">Advance Payment</option>
              <option value="Regular">Regular Payment</option>
              <option value="Credit">Credit Payment</option>
              <option value="Irregular">Irregular Payment</option>
            </select>
          </div>

          {/* Payment Mode Radio Buttons */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Payment Mode
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMode"
                  value="cash"
                  checked={paymentMode === "cash"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="form-radio"
                />
                <span>Cash</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMode"
                  value="momo"
                  checked={paymentMode === "momo"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="form-radio"
                />
                <span>MoMo</span>
              </label>
            </div>
          </div>

          {/* Submit Button for Payment */}
          <button
            onClick={handleSubmit}
            className={`w-full px-4 py-2 rounded-md transition-colors ${
              darkMode
                ? "bg-purple-500 text-white hover:bg-purple-400"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Record Payment
          </button>
        </>
      )}
    </div>
  );
};

export default RecordPayment;
