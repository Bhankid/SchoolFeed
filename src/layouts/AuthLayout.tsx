import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
