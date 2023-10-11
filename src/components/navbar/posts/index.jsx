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
        "https://api.noroff.dev/api/v1/social/posts?limit=10",
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
    fetchData(); // Fetch immediately once

    const timer = setInterval(() => {
      fetchData();
    }, 5000); // Fetch every 5 seconds

    return () => clearInterval(timer); // Cleanup
  }, []);

  return (
    <div className="w-full p-6 bg-orange-200 border-2 border-orange-100 rounded-3xl dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-4 text-2xl font-bold text-left text-gray-800 dark:text-white">
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
            className="w-full p-4 mb-4 border-2 border-white bg-neutral-100 rounded-3xl dark:bg-gray-700 dark:border-gray-600" // Add margin-bottom here
          >
            {/* Post Content */}
            <div className="flex flex-wrap items-start w-full">
              {/* Content Text */}
              <p className="mb-2 text-sm text-gray-600 sm:text-base dark:text-white">
                Title: {post.title} {/* Render the title */}
              </p>
              <p className="mb-2 text-sm text-gray-600 sm:text-base dark:text-white">
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
            <div className="flex flex-wrap items-start justify-between w-full mb-2"> {/* Add margin-bottom here */}
              {/* User Icon */}
              <img
                src={UserIcon}
                alt="User Icon"
                className="w-10 h-10 rounded-full dark:invert"
              />

              {/* User Name */}
              <p className="hidden ml-2 text-sm text-black dark:text-white xxs:inline-block">
                John Doe
              </p>

              {/* Username */}
              <p className="ml-2 text-sm text-gray-600 dark:text-white">
                @JohnDoe
              </p>
            </div>
            {/* Like and Comment Buttons */}
            <div className="flex flex-wrap items-center justify-end w-full">
              <button className="mr-4 text-sm text-gray-600 border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 hover:text-blue-500">
                Like
              </button>
              <button className="text-sm text-gray-600 border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 hover:text-blue-500">
                Comment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OtherPosts;