import React from "react";
import logo from "../../../assets/Y_logo.png";
import user from "../../../assets/basic-user.svg";

function Header() {
  return (
    <header className="bg-neutral-100 text-gray-900 p-4  rounded-3xl border-2 border-white dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center mb-1">
      {/* Left side - Logo */}
      <div>
        <img src={logo} alt="Logo" className="w-20 h-20 logo dark:invert" />
      </div>

      {/* Middle - Search Bar (hidden on mobile) */}
      <div className="hidden md:flex w-96 h-20 items-center mx-4">
        <input
          type="text"
          placeholder="Search anything.."
          className="w-full p-2 rounded-full border-2 bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
        />
      </div>

      {/* Right side - User Stories */}
      <div className="flex items-center space-x-2">
        <p className="text-center">Username</p>
        <div className="w-14 h-14 rounded-full border-2 bg-orange-200">
          <img
            src={user}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
