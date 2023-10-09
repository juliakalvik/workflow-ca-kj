import React from "react";
import UserIcon from "../../assets/icons/user.svg";

function OtherPosts() {
  return (
    <div className="w-full bg-orange-200 p-6 rounded-3xl border-2 border-orange-100 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-left">Posts</h1>
      <div className="w-full bg-neutral-100 p-4 rounded-3xl border-2 border-white dark:bg-gray-700 dark:border-gray-600">
        {/* Post Content */}
        <div className="w-full flex items-start flex-wrap">
          {/* Content Text */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-white mb-16">Some interesting post content.</p>
        </div>

        {/* Divider Line */}
        <hr className="w-full border-t-2 border-gray-300 my-4" />

        {/* User Section */}
        <div className="w-full flex flex-wrap items-start justify-between">
          <div className="flex items-center flex-wrap">
            {/* User Icon */}
            <img
              src={UserIcon}
              alt="User Icon"
              className="w-10 h-10 rounded-full dark:invert"
            />

            {/* User Name */}
            <p className="ml-2 text-black dark:text-white text-sm hidden xxs:inline-block">John Doe</p>

            {/* Username */}
            <p className="text-gray-600 dark:text-white text-sm ml-2">@JohnDoe</p>
          </div>
          {/* Like and Comment Buttons */}
          <div className="w-full flex items-center justify-end flex-wrap">
            <button className="text-sm text-gray-600 dark:text-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 hover:text-blue-500 mr-4">
              Like
            </button>
            <button className="text-sm text-gray-600 dark:text-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 hover:text-blue-500">
              Comment
            </button>
          </div>
        </div>
      </div>
      <div className=" bg-neutral-100 p-4 mt-1 rounded-3xl border-2 border-white dark:bg-gray-700 dark:border-gray-600">
        {/* Post Content */}
        <div className="w-full flex items-start flex-wrap">
          {/* Content Text */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-white mb-16 ">Some interesting post content.</p>
        </div>

        {/* Divider Line */}
        <hr className="w-full border-t-2 border-gray-300 my-4" />

        {/* User Section */}
        <div className="w-full flex flex-wrap items-start justify-between">
          <div className="flex items-center flex-wrap">
            {/* User Icon */}
            <img
              src={UserIcon}
              alt="User Icon"
              className="w-10 h-10 rounded-full dark:invert"
            />

            {/* User Name */}
            <p className="ml-2 text-black dark:text-white text-sm hidden xxs:inline-block">John Doe</p>

            {/* Username */}
            <p className="text-gray-600 dark:text-white text-sm ml-2">@JohnDoe</p>
          </div>
          {/* Like and Comment Buttons */}
          <div className="w-full flex items-center justify-end flex-wrap">
            <button className="text-sm text-gray-600 dark:text-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 hover:text-blue-500 mr-4">
              Like
            </button>
            <button className="text-sm text-gray-600 dark:text-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 hover:text-blue-500">
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherPosts;
