/** *Reusable Input and Button Components

 * @author PetterMartin*/

import React, { useState, useEffect } from "react";
import UserIcon from "../../../assets/icons/user.svg";

function OtherPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedBody, setEditedBody] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const accessKey = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyMywibmFtZSI6Ik1pcm1pciIsImVtYWlsIjoiTWlybWlyMjAyM0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4MDc5MjUzNDIyLTYzOGZhOWIyZDE2MD9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UUjhmSEJwZEdKMWJHeDhaVzU4TUh4OE1IeDhmREElM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04MDAmcT02MCIsImJhbm5lciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjk2OTIxODgxOTAzLWU4N2U1NjYyZDliND9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeGxaR2wwYjNKcFlXd3RabVZsWkh3ME1ueDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTgwMCZxPTYwIiwiaWF0IjoxNjk3MDYzMzIzfQ.NrTN_OF0maTAH0H_4mhdw4pIkDcuxz_sY3ISUcH-2m4",
    },
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/social/posts?limit=10",
        accessKey
      );
  
      if (response.ok) {
        const responseData = await response.json();
        const updatedData = responseData.map((post) => {
          const existingPost = data.find((p) => p.id === post.id);
          if (existingPost) {
            post.likes = existingPost.likes;
          }
          return post;
        });
        setData(updatedData);
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

  useEffect(() => {
    // Filter posts based on search term and update filteredData state
    const filteredPosts = data.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredPosts);
  }, [data, searchTerm]);

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/social/posts/${data[editIndex].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyMywibmFtZSI6Ik1pcm1pciIsImVtYWlsIjoiTWlybWlyMjAyM0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4MDc5MjUzNDIyLTYzOGZhOWIyZDE2MD9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UUjhmSEJwZEdKMWJHeDhaVzU4TUh4OE1IeDhmREElM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04MDAmcT02MCIsImJhbm5lciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjk2OTIxODgxOTAzLWU4N2U1NjYyZDliND9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeGxaR2wwYjNKcFlXd3RabVZsWkh3ME1ueDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTgwMCZxPTYwIiwiaWF0IjoxNjk3MDYzMzIzfQ.NrTN_OF0maTAH0H_4mhdw4pIkDcuxz_sY3ISUcH-2m4",
          },
          body: JSON.stringify({
            title: data[editIndex].title,
            body: editedBody,
            tags: data[editIndex].tags,
            media: data[editIndex].media,
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
      setEditIndex(null);
      setEditedBody("");
      fetchData();
    }
  };

  const handleDeleteClick = async (postId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/social/posts/${postId}`,
          {
            method: "DELETE",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyMywibmFtZSI6Ik1pcm1pciIsImVtYWlsIjoiTWlybWlyMjAyM0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4MDc5MjUzNDIyLTYzOGZhOWIyZDE2MD9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UUjhmSEJwZEdKMWJHeDhaVzU4TUh4OE1IeDhmREElM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04MDAmcT02MCIsImJhbm5lciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjk2OTIxODgxOTAzLWU4N2U1NjYyZDliND9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeGxaR2wwYjNKcFlXd3RabVZsWkh3ME1ueDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTgwMCZxPTYwIiwiaWF0IjoxNjk3MDYzMzIzfQ.NrTN_OF0maTAH0H_4mhdw4pIkDcuxz_sY3ISUcH-2m4",
            },
          }
        );

        if (response.ok) {
          console.log("Post deleted successfully!");
          fetchData();
        } else {
          throw new Error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  useEffect(() => {
    const savedLikedPosts = localStorage.getItem("likedPosts");
    if (savedLikedPosts) {
      setLikedPosts(JSON.parse(savedLikedPosts));
    }
  
    fetchData();
  
    const timer = setInterval(() => {
      fetchData();
    }, 10000);
  
    return () => clearInterval(timer);
  }, []);
  

  const handleLikeClick = async (postId) => {
    try {
      if (!likedPosts.includes(postId)) {
        const emojiSymbol = "👍";
        const response = await fetch(
          `https://api.noroff.dev/api/v1/social/posts/${postId}/react/${encodeURIComponent(
            emojiSymbol
          )}`,
          {
            method: "PUT",
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3MiwibmFtZSI6IktoYWRhciIsImVtYWlsIjoiS2hhZGFyQHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY5NjkzNDEwMH0.LBn5-HZyYjJT9RUFrid6F7NBvMSnNls-Bzx06FAQ_j0",
            },
          }
        );
  
        if (response.ok) {
          const reactionData = await response.json();
  
          // Update liked posts state and local storage
          const updatedLikedPosts = [...likedPosts, postId];
          setLikedPosts(updatedLikedPosts);
          localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
  
          // Update the data state with new likes count
          setData((prevData) =>
            prevData.map((post) =>
              post.id === postId ? { ...post, likes: reactionData.count } : post
            )
          );
        } else {
          throw new Error("Failed to react to the post");
        }
      } else {
        console.log("You have already liked this post.");
      }
    } catch (error) {
      console.error("Error reacting to the post:", error);
    }
  };

  return (
    <div className="w-full p-6 bg-orange-200 border-2 border-orange-100 rounded-3xl dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-4 text-2xl font-bold text-left text-gray-800 dark:text-white">
        Posts
      </h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 text-base text-left text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 rounded-lg"
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        filteredData
          .filter((post) => post.title || post.body || post.media)
          .map((post, index) => (
            <div
              key={index}
              className="w-full p-4 mb-4 border-2 border-white bg-neutral-100 rounded-3xl dark:bg-gray-700 dark:border-gray-600"
            >
              {/* Title */}
              <h2 className="text-lg font-bold text-left text-gray-800 dark:text-white">
                {post.title}
              </h2>

              {/* Body */}
              {editIndex === index ? (
                <textarea
                  className="w-full p-2 text-base text-left text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 rounded-lg"
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                />
              ) : (
                <p className="mb-2 text-base text-left text-gray-800 dark:text-white">
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

                <div className="flex items-center gap-2">
                  {editIndex === index ? (
                    <button
                      className="text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-emerald-600 hover:border-emerald-600"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-yellow-500 hover:border-yellow-400"
                      onClick={() => handleEditClick(index, post.body)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(post.id)}
                    className="text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-red-500 hover:border-red-500"
                  >
                    Delete
                  </button>
                  <button
                    className="text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-emerald-500 hover:border-emerald-500"
                    onClick={() => handleLikeClick(post.id)}
                  >
                    {String.fromCodePoint(0x1f44d)}{" "}
                    Like {post.likes}
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
