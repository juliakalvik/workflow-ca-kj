import React from "react";
import { Outlet, Link } from "@tanstack/react-router";
import HomeIcon from "../../../assets/icons/home.svg";
import UserIcon from "../../../assets/icons/user.svg";
import MailIcon from "../../../assets/icons/mail.svg";
import BookmarkIcon from "../../../assets/icons/bookmark.svg";
import CommunityIcon from "../../../assets/icons/community.svg";
import CogIcon from "../../../assets/icons/cog.svg";

function NavBar() {
  return (
    <nav className=" bg-neutral-100 text-gray-800 dark:text-white rounded-3xl p-5 border-2 border-white dark:bg-gray-800 dark:border-gray-700 flex flex-col text-xl h-100 w-full min-w-80">
      <ul className=" space-y-6">
        <li className="flex items-center bg-orange-200 dark:bg-blue-500 dark:text-white dark:border-blue-500 dark:hover:border-blue-400 text-gray-800 p-2 md:w-full w-10 mt-auto rounded-3xl border-2 border-orange-200 hover:border-orange-100 shadow-custom leading-tight tracking-tigh">
          <Link to="/" style={{ color: "black" }} className="flex items-center dark:invert">
            <img src={HomeIcon} alt="Home Icon" className="w-6 h-6 mr-2" />
            <span className="hidden md:inline-block ">Home</span>
          </Link>
        </li>
        <li className="flex items-center p-2">
          <Link
            to="/profile"
            style={{ color: "black" }}
            className="flex items-center dark:invert"
          >
            <img src={UserIcon} alt="User Icon" className="w-6 h-6 mr-2" />
            <span className="hidden md:inline-block ">Profile</span>
          </Link>
        </li>
        <li className="flex items-center p-2 dark:invert">
          <img src={MailIcon} alt="Mail Icon" className="w-6 h-6 mr-2" />
          <a
            href="#"
            style={{ color: "black" }}
            className="hidden md:inline-block"
          >
            Messages
          </a>
        </li>
        <li className="flex items-center p-2 dark:invert">
          <img
            src={BookmarkIcon}
            alt="Bookmark Icon"
            className="w-6 h-6 mr-2"
          />
          <a
            href="#"
            style={{ color: "black" }}
            className="hidden md:inline-block"
          >
            Bookmarks
          </a>
        </li>
        <li className="flex items-center p-2 dark:invert">
          <img
            src={CommunityIcon}
            alt="Community Icon"
            className="w-6 h-6 mr-2"
          />
          <a
            href="#"
            style={{ color: "black" }}
            className="hidden md:inline-block"
          >
            Communities
          </a>
        </li>
        <li className="flex items-center p-2 dark:invert">
          <img src={CogIcon} alt="Settings Icon" className="w-6 h-6 mr-2" />
          <a
            href="#"
            style={{ color: "black" }}
            className="hidden md:inline-block"
          >
            Settings
          </a>
        </li>
      </ul>

      <div className="pb-16"></div>
      <div className="pb-16"></div>
      <div className="pb-16"></div>

      <button className="hidden md:inline-block bg-orange-200 dark:bg-blue-500 dark:text-white dark:border-blue-500 dark:hover:border-blue-400  text-gray-900 p-2 w-full mt-auto rounded-3xl border-2 border-orange-200 hover:border-orange-100 shadow-custom leading-tight tracking-tight">
        <Link to="/Login">
          Login
        </Link>
      </button>
      <Link to="/Login" style={{ color: "gray-800" }}>
        <span className="md:hidden text-base flex justify-center text-gray-800 dark:text-white">Login</span>
      </Link>
    </nav>
  );
}

export default NavBar;
