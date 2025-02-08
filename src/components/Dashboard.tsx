import React from 'react';
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
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

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

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

function Dashboard() {
  // Sample data for the charts
  const weeklyCollections = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Daily Collections (₵)',
        data: [2450, 2800, 2600, 2900, 2700],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const paymentDistribution = {
    labels: ['Regular', 'Occasional', 'Credit'],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(34, 197, 94)',
          'rgb(249, 115, 22)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthlyTrend = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Collections',
        data: [11200, 12400, 10800, 10880],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
      {
        label: 'Pending Payments',
        data: [1200, 800, 1400, 1000],
        backgroundColor: 'rgba(249, 115, 22, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value="324"
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Today's Collections"
          value="₵2,450"
          icon={CreditCard}
          color="bg-green-500"
        />
        <StatCard
          title="Pending Payments"
          value="28"
          icon={Bell}
          color="bg-orange-500"
        />
        <StatCard
          title="Monthly Revenue"
          value="₵45,280"
          icon={TrendingUp}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Collections</h3>
          <div className="h-[300px]">
            <Line data={weeklyCollections} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Distribution</h3>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut data={paymentDistribution} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Collection Trend</h3>
          <div className="h-[300px]">
            <Bar data={monthlyTrend} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;