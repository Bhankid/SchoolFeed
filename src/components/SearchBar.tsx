import { useState, useEffect, useRef } from "react";
import Mousetrap from "mousetrap";
import { Search } from "lucide-react";

export default function SearchBar({ darkMode }: { darkMode: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Open search and focus input on Ctrl + K / Cmd + K
    Mousetrap.bind(["ctrl+k", "command+k"], (e) => {
      e.preventDefault();
      setShowSearch(true);
      setTimeout(() => inputRef.current?.focus(), 10); // Ensure input gets focus
    });

    // Close search on Esc key
    Mousetrap.bind("esc", (e) => {
      if (showSearch) {
        e.preventDefault();
        setShowSearch(false);
        setSearchTerm("");
        inputRef.current?.blur(); // Remove focus from input
      }
    });

    return () => {
      Mousetrap.unbind(["ctrl+k", "command+k", "esc"]);
    };
  }, [showSearch]);

  return (
    <div
      className={`relative w-full max-w-md ${
        showSearch ? "block" : "hidden"
      } sm:block`}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full pl-10 pr-20 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          darkMode
            ? "bg-gray-800 text-gray-300 focus:ring-indigo-500"
            : "bg-white text-gray-700 focus:ring-indigo-500"
        } shadow-sm`}
      />
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
      <span className="absolute right-4 top-2.5 text-gray-400 text-sm select-none">
        Ctrl + K
      </span>
    </div>
  );
}
