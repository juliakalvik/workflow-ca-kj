import React, { useState, useEffect } from "react";
import UserIcon from "../../../assets/icons/user.svg";

function OtherPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const accessKey = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3MiwibmFtZSI6IktoYWRhciIsImVtYWlsIjoiS2hhZGFyQHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY5NjkzNDEwMH0.LBn5-HZyYjJT9RUFrid6F7NBvMSnNls-Bzx06FAQ_j0",
    },
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/social/posts",
        accessKey
      );

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="w-full bg-orange-200 p-6 rounded-3xl border-2 border-orange-100 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-left">
        Posts
      </h1>
  
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        data.map((post, index) => (
          <div
            key={index}
            className="w-full bg-neutral-100 p-4 rounded-3xl border-2 border-white dark:bg-gray-700 dark:border-gray-600 mb-4" // Add margin-bottom here
          >
            {/* Post Content */}
            <div className="w-full flex items-start flex-wrap">
              {/* Content Text */}
              <p className="text-sm sm:text-base text-gray-600 dark:text-white mb-2">
                Title: {post.title} {/* Render the title */}
              </p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-white mb-2">
                Body: {post.body} {/* Render the body */}
              </p>
  
              {/* Media */}
              {post.media && (
                <img
                  src={post.media}
                  alt="Post Media"
                  className="w-full h-auto mb-2" // Add margin-bottom here
                />
              )}
            </div>
  
            {/* User Section */}
            <div className="w-full flex flex-wrap items-start justify-between mb-2"> {/* Add margin-bottom here */}
              {/* User Icon */}
              <img
                src={UserIcon}
                alt="User Icon"
                className="w-10 h-10 rounded-full dark:invert"
              />
  
              {/* User Name */}
              <p className="ml-2 text-black dark:text-white text-sm hidden xxs:inline-block">
                John Doe
              </p>
  
              {/* Username */}
              <p className="text-gray-600 dark:text-white text-sm ml-2">
                @JohnDoe
              </p>
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
            <p className="ml-2 text-black dark:text-white text-sm hidden xxs:inline-block">
              John Doe
            </p>
            {/* Username */}
            <p className="text-gray-600 dark:text-white text-sm ml-2">
              @JohnDoe
            </p>
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
        ))
      )}
    </div>
  );
}

export default OtherPosts;