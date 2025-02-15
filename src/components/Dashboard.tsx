import React, { useEffect, useState } from "react";
import { Users, CreditCard, Bell, TrendingUp } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import CountUp from "react-countup";
import axios from "axios";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface StatCardProps {
  title: string;
  value: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  darkMode?: boolean; // Add darkMode prop
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  darkMode = false,
}) => {
  // Extract numeric value and symbol (e.g., "₵" or "%") from the value string
  const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
  const symbol = value.replace(/[0-9.-]+/g, "");
  return (
    <div
      className={`rounded-lg shadow-md p-4 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {title}
          </p>
          <p
            className={`text-2xl font-bold mt-1 flex items-center ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {/* Use CountUp for the counting effect */}
            <span className="ml-1">{symbol}</span>
            <CountUp
              start={0}
              end={numericValue}
              duration={2.5}
              separator=","
              decimals={numericValue % 1 !== 0 ? 2 : 0}
            />
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

function Dashboard({ darkMode }: { darkMode: boolean }) {
  const [totalStudents, setTotalStudents] = useState<string>("0");
  const [todaysCollections, setTodaysCollections] = useState<string>("₵0");
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("₵0"); 
  const [pendingPayments, setPendingPayments] = useState<string>("₵0");

     useEffect(() => {
       // Fetch total number of students from the backend
       const fetchTotalStudents = async () => {
         try {
           const response = await fetch("http://localhost:3000/students/total");
           if (!response.ok) {
             throw new Error("Failed to fetch total students");
           }
           const data = await response.json();
           setTotalStudents(data.total.toString());
         } catch (error) {
           console.error("Error fetching total students:", error);
         }
       };

       // Fetch today's total payments from the backend
       const fetchTodaysCollections = async () => {
         try {
           const response = await axios.get(
             "http://localhost:3000/payments/today-total"
           );
           const total = response.data.total;
           setTodaysCollections(`₵${total.toFixed(2)}`); // Format as currency with 2 decimal places
         } catch (error) {
           console.error("Error fetching today's collections:", error);
           setTodaysCollections("₵0"); // Fallback to 0 if there's an error
         }
       };

       // Fetch monthly revenue from the backend
       const fetchMonthlyRevenue = async () => {
         try {
           const response = await axios.get(
             "http://localhost:3000/payments/monthly-revenue"
           );
           const total = response.data.total;
           setMonthlyRevenue(`₵${total.toFixed(2)}`); // Format as currency with 2 decimal places
         } catch (error) {
           console.error("Error fetching monthly revenue:", error);
           setMonthlyRevenue("₵0"); // Fallback to 0 if there's an error
         }
       };


         // Fetch pending payments (total of all credit transactions)
 const fetchPendingPayments = async () => {
   try {
     const response = await fetch("http://localhost:3000/credit-summaries");
     if (!response.ok) {
       throw new Error("Failed to fetch pending payments");
     }

     const data = await response.json();

     // Convert all amounts to numbers and sum them up
     const totalPending = data.data.reduce(
       (sum: number, summary: { amount: string }) => {
         const numericAmount = parseFloat(summary.amount.replace("₵", "")) || 0;
         return sum + numericAmount;
       },
       0
     );

     // Update state with the formatted total
     setPendingPayments(`₵${totalPending.toFixed(2)}`);
   } catch (error) {
     console.error("Error fetching pending payments:", error);
     setPendingPayments("₵0.00"); 
   }
 };


       fetchTotalStudents();
       fetchTodaysCollections();
       fetchMonthlyRevenue();
        fetchPendingPayments();
     }, []);
  

  // Sample data for the charts (unchanged)
  const weeklyCollections = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Daily Collections (₵)",
        data: [2450, 2800, 2600, 2900, 2700],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const paymentDistribution = {
    labels: ["Regular", "Occasional", "Credit"],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(249, 115, 22, 0.8)",
        ],
        borderColor: [
          "rgb(99, 102, 241)",
          "rgb(34, 197, 94)",
          "rgb(249, 115, 22)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthlyTrend = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Collections",
        data: [11200, 12400, 10800, 10880],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
      },
      {
        label: "Pending Payments",
        data: [1200, 800, 1400, 1000],
        backgroundColor: "rgba(249, 115, 22, 0.8)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as "bottom",
        labels: {
          color: darkMode ? "#ffffff" : "#000000",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#ffffff" : "#000000",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        ticks: {
          color: darkMode ? "#ffffff" : "#000000",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen p-2 transition-colors duration-300`}
    >
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          color="bg-blue-500"
          darkMode={darkMode}
        />
        <StatCard
          title="Today's Collections"
          value={todaysCollections}
          icon={CreditCard}
          color="bg-green-500"
          darkMode={darkMode}
        />
        <StatCard
          title="Pending Payments"
          value={pendingPayments}
          icon={Bell}
          color="bg-orange-500"
          darkMode={darkMode}
        />
        <StatCard
          title="Monthly Revenue"
          value={monthlyRevenue}
          icon={TrendingUp}
          color="bg-purple-500"
          darkMode={darkMode}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div
          className={`rounded-lg shadow-md p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Weekly Collections
          </h3>
          <div className="h-[300px]">
            <Line data={weeklyCollections} options={chartOptions} />
          </div>
        </div>
        <div
          className={`rounded-lg shadow-md p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Payment Distribution
          </h3>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut data={paymentDistribution} options={chartOptions} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div
          className={`rounded-lg shadow-md p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Monthly Collection Trend
          </h3>
          <div className="h-[300px]">
            <Bar data={monthlyTrend} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;