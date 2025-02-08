import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  Calendar, 
  Bell,
  Home,
  LogOut
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Payments from './components/Payments';
import Attendance from './components/Attendance';
import Alerts from './components/Alerts';

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    // Retrieve the active tab from localStorage on component mount
    return localStorage.getItem('activeTab') || 'dashboard';
  });

  // Update localStorage whenever the activeTab changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'students', name: 'Students', icon: Users },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'attendance', name: 'Attendance', icon: Calendar },
    { id: 'alerts', name: 'Alerts', icon: Bell }, 
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <Students />;
      case 'payments':
        return <Payments />;
      case 'attendance':
        return <Attendance />;
      case 'alerts':
        return <Alerts />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">SchoolFeed</h1>
          <p className="text-sm text-gray-600">Fee Management</p>
        </div>
        <nav className="mt-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-6 py-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${
                  activeTab === tab.id ? 'bg-indigo-50 text-indigo-600' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {tab.name}
              </button>
            );
          })}
          <button className="w-full flex items-center px-6 py-4 text-red-600 hover:bg-red-50 transition-colors mt-auto">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
      
      <Toaster position="top-right" />
    </div>
  );
}

export default App;