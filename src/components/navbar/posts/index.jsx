import React, { useState, useEffect } from "react";
import UserIcon from "../../../assets/icons/user.svg";

function OtherPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedBody, setEditedBody] = useState("");

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
    fetchData();

    const timer = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleEditClick = (index, body) => {
    setEditIndex(index);
    setEditedBody(body);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/social/posts/${data[editIndex].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3MiwibmFtZSI6IktoYWRhciIsImVtYWlsIjoiS2hhZGFyQHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY5NjkzNDEwMH0.LBn5-HZyYjJT9RUFrid6F7NBvMSnNls-Bzx06FAQ_j0",
          },
          body: JSON.stringify({
            title: data[editIndex].title, // Keep the title unchanged
            body: editedBody, // Update the body text
            tags: data[editIndex].tags, // Keep tags unchanged
            media: data[editIndex].media, // Keep media URL unchanged
          }),
        }
      );

      if (response.ok) {
        console.log("Post updated successfully!");
      } else {
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      // Reset edit state
      setEditIndex(null);
      setEditedBody("");
      // Refetch the data after updating
      fetchData();
    }
  };

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
            className="w-full p-4 mb-4 border-2 border-white bg-neutral-100 rounded-3xl dark:bg-gray-700 dark:border-gray-600"
          >
            {/* Title */}
            <h2 className="mb-2 text-lg font-semibold text-left text-gray-800 dark:text-white">
              {post.title}
            </h2>

            {/* Body */}
            {editIndex === index ? (
              <textarea
                className="w-full mb-2 p-2 text-sm text-left text-gray-600 sm:text-base dark:text-white"
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
              />
            ) : (
              <p className="mb-2 text-sm text-left text-gray-600 sm:text-base dark:text-white">
                {post.body}
              </p>
            )}

            {/* Media */}
            {post.media && (
              <img
                src={post.media}
                alt="Post Media"
                className="w-full h-auto mb-2"
              />
            )}

            {/* User Icon, User ID, Like, and Comment Buttons */}
            <div className="flex flex-wrap items-center justify-between w-full mb-2">
              <div className="flex items-center">
                <img
                  src={UserIcon}
                  alt="User Icon"
                  className="w-10 h-10 rounded-full dark:invert"
                />
                <p className="ml-2 text-sm text-gray-600 dark:text-white">
                  @{post.id}
                </p>
              </div>

              <div className="flex items-center">
                {editIndex === index ? (
                  <button
                    className="mr-2 text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-emerald-600 hover:border-emerald-600"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="mr-2 text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-yellow-500 hover:border-yellow-500"
                    onClick={() => handleEditClick(index, post.body)}
                  >
                    Edit
                  </button>
                )}
                <button className="text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-red-500 hover:border-red-500">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OtherPosts;
