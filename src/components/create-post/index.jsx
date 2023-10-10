import React, { useEffect, useState } from "react";


export default function PostsPage() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const newPost = {
      title: postText,
      body: postText,
      userId: getUserId(), // Implement your user ID retrieval logic here
    };

    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual URL of your API endpoint for posting posts.
      const response = await fetch("https://docs.noroff.dev//social/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        console.warn("Post created successfully");
        setPostText("");
        fetchPosts(); // Refresh the list of posts
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const getUserId = () => {
    // Implement your user ID retrieval logic here
    return "user123"; // Example user ID
  };

  return (
    <>
      <h1>Posts</h1>

      <div className="bg-white w-full mt-2 p-4 mb-8 rounded-3xl shadow-md border-2 border-gray-200">
        <form onSubmit={handleOnSubmit}>
          <div className="flex items-start space-x-4">
            <img className="w-10 h-10 rounded-full" alt="User Avatar" />

            <div className="flex-grow">
              <textarea
                placeholder="What's happening?"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                rows="4" 
              />
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

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Recent Posts:</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {posts.map((post, index) => (
                <li key={index} className="mb-2">
                  {post.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
