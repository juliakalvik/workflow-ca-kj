import React, { useEffect, useState } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    userId: "1423",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    title: false,
    body: false,
  });

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = () => {
    fetch(`https://api.noroff.dev/api/v1//social/profiles/Mirmir/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyMywibmFtZSI6Ik1pcm1pciIsImVtYWlsIjoiTWlybWlyMjAyM0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4MDc5MjUzNDIyLTYzOGZhOWIyZDE2MD9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UUjhmSEJwZEdKMWJHeDhaVzU4TUh4OE1IeDhmREElM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04MDAmcT02MCIsImJhbm5lciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjk2OTIxODgxOTAzLWU4N2U1NjYyZDliND9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeGxaR2wwYjNKcFlXd3RabVZsWkh3ME1ueDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTgwMCZxPTYwIiwiaWF0IjoxNjk3MDQ5MDUxfQ.r5ztdR0-BzXv2yYLDfXcmZ-lve4mB4fNhZqC1ypd4i4",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch posts");
        }
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const { title, body } = newPost;

    if (title.trim() === "" || body.trim() === "") {
      setValidationErrors({
        title: title.trim() === "",
        body: body.trim() === "",
      });
      return;
    }

    const newPostData = {
      title,
      body,
      userId: newPost.userId,
    };

    fetch(`https://api.noroff.dev/api/v1/social/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyMywibmFtZSI6Ik1pcm1pciIsImVtYWlsIjoiTWlybWlyMjAyM0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4MDc5MjUzNDIyLTYzOGZhOWIyZDE2MD9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UUjhmSEJwZEdKMWJHeDhaVzU4TUh4OE1IeDhmREElM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04MDAmcT02MCIsImJhbm5lciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjk2OTIxODgxOTAzLWU4N2U1NjYyZDliND9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeGxaR2wwYjNKcFlXd3RabVZsWkh3ME1ueDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTgwMCZxPTYwIiwiaWF0IjoxNjk3MDQ5MDUxfQ.r5ztdR0-BzXv2yYLDfXcmZ-lve4mB4fNhZqC1ypd4i4",
      },
      body: JSON.stringify(newPostData),
    })
      .then((response) => {
        if (response.ok) {
          console.warn("Post created successfully");
          setNewPost({ title: "", body: "", userId: newPost.userId });
          fetchUserPosts();
        } else {
          throw new Error("Failed to create post");
        }
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  const handleEditPost = (postId, updatedPostText) => {
    const updatedPosts = [...posts];
    const postIndex = updatedPosts.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
      updatedPosts[postIndex].body = updatedPostText;
      setPosts(updatedPosts);
      setIsEditing(null);

      // You can send the updated post data to the API as needed
      fetch(`https://api.noroff.dev/api/v1/social/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyMywibmFtZSI6Ik1pcm1pciIsImVtYWlsIjoiTWlybWlyMjAyM0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4MDc5MjUzNDIyLTYzOGZhOWIyZDE2MD9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UUjhmSEJwZEdKMWJHeDhaVzU4TUh4OE1IeDhmREElM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04MDAmcT02MCIsImJhbm5lciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjk2OTIxODgxOTAzLWU4N2U1NjYyZDliND9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeGxaR2wwYjNKcFlXd3RabVZsWkh3ME1ueDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTgwMCZxPTYwIiwiaWF0IjoxNjk3MDQ5MDUxfQ.r5ztdR0-BzXv2yYLDfXcmZ-lve4mB4fNhZqC1ypd4i4",
        },
        body: JSON.stringify({ body: updatedPostText }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update post");
          }
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    }
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);

    // You can send a delete request to the API to delete the post with postId
    fetch(`https://api.noroff.dev/api/v1/social/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyMywibmFtZSI6Ik1pcm1pciIsImVtYWlsIjoiTWlybWlyMjAyM0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4MDc5MjUzNDIyLTYzOGZhOWIyZDE2MD9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UUjhmSEJwZEdKMWJHeDhaVzU4TUh4OE1IeDhmREElM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04MDAmcT02MCIsImJhbm5lciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjk2OTIxODgxOTAzLWU4N2U1NjYyZDliND9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeGxaR2wwYjNKcFlXd3RabVZsWkh3ME1ueDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTgwMCZxPTYwIiwiaWF0IjoxNjk3MDQ5MDUxfQ.r5ztdR0-BzXv2yYLDfXcmZ-lve4mB4fNhZqC1ypd4i4",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete post");
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const handleViewPost = (postId) => {
    const post = posts.find((post) => post.id === postId);
    if (post) {
      setSelectedPost(post);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Posts by {newPost.userId}</h1>
      <div className="bg-white w-full mt-2 p-4 mb-8 rounded-3xl shadow-md border-2 border-gray-200">
        <form onSubmit={handleOnSubmit}>
          <div className="flex items-start space-x-4">
            <div className="flex-grow text-black">
              <textarea
                placeholder="What's happening?"
                className={`w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 ${
                  validationErrors.body ? "border-red-500" : ""
                }`}
                value={newPost.body}
                onChange={(e) =>
                  setNewPost({ ...newPost, body: e.target.value })
                }
                rows="4"
              />
              {validationErrors.body && (
                <p className="text-red-500 mt-2">Body is required.</p>
              )}
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-grow text-black">
              <input
                type="text"
                placeholder="Title"
                className={`w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 ${
                  validationErrors.title ? "border-red-500" : ""
                }`}
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />
              {validationErrors.title && (
                <p className="text-red-500 mt-2">Title is required.</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end mt-3">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
            >
              Post
            </button>
          </div>
        </form>
      </div>
      {selectedPost && (
        <div className="bg-white w-full mt-2 p-4 mb-8 rounded-3xl shadow-md border-2 border-gray-200">
          <h2 className="text-xl text-black font-semibold mb-2">
            Selected Post:
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <div>
              <span className="ml-2 font-semibold">{selectedPost.userId}</span>
            </div>
            <div>{selectedPost.body}</div>
          </div>
        </div>
      )}
      <div className="mt-4">
        <h2 className="text-xl text-black font-semibold mb-2">Recent Posts:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {posts.map((post, index) => (
              <li key={post.id} className="mb-4 text-black">
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <span className="ml-2 font-semibold">{post.userId}</span>
                    </div>
                    <div>
                      <button
                        onClick={() => setIsEditing(post.id)}
                        className="text-indigo-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleViewPost(post.id)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </div>
                  </div>
                  {isEditing === post.id ? (
                    <div>
                      <textarea
                        rows="4"
                        value={post.body}
                        onChange={(e) =>
                          handleEditPost(post.id, e.target.value)
                        }
                        className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                      />
                    </div>
                  ) : (
                    <div>{post.body}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
