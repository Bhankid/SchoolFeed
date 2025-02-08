function Footer() {
  return (
    <footer className="bg-indigo-500 text-white py-4 px-6 text-center">
      <div className="flex justify-center items-center">
        <p className="text-sm mr-4">
          &copy; {new Date().getFullYear()} SchoolFeed. All rights reserved.
        </p>
        <p className="text-sm mr-4">Version 1.0.0 Alpha</p>
        <p className="text-sm">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/devfred"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-900"
          >
            Dev Fred
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
