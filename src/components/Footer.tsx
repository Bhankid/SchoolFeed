import React from "react";

function Footer({ darkMode }: { darkMode: boolean }) {
  return (
    <footer
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-purple-600 text-white"
      } py-4 px-6 text-center md:px-12 lg:px-24 transition-colors duration-300`}
    >
      <div className="flex justify-center items-center flex-wrap md:flex-nowrap">
        {/* Copyright */}
        <p className="text-sm mr-4 mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} SchoolFeed. All rights reserved.
        </p>
        {/* Version */}
        <p className="text-sm mr-4 mb-2 md:mb-0">Version 1.0.0 Alpha</p>
        {/* Developer Link */}
        <p className="text-sm mb-2 md:mb-0">
          Developed by{" "}
          <a
            href="https://alfred-portfolio-site.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              darkMode
                ? "bg-gray-900 hover:text-red-300"
                : "text-gray-800 hover:text-gray-900"
            } transition-colors duration-300`}
          >
            Dev Fred
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;