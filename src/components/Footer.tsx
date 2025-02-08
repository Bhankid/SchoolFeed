function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} SchoolFeed. All rights reserved.
      </p>
      <p className="text-sm mt-2">Developed by Your Team</p>
    </footer>
  );
}

export default Footer;
