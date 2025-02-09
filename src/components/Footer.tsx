function Footer() {
  return (
    <footer className="bg-indigo-500 text-white py-4 px-6 text-center md:px-12 lg:px-24">
      <div className="flex justify-center items-center flex-wrap md:flex-nowrap">
        <p className="text-sm mr-4 mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} SchoolFeed. All rights reserved.
        </p>
        <p className="text-sm mr-4 mb-2 md:mb-0">Version 1.0.0 Alpha</p>
        <p className="text-sm mb-2 md:mb-0">
          Developed by{" "}
          <a
            href="https://alfred-portfolio-site.onrender.com/"
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
