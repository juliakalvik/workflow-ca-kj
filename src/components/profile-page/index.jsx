import React, { useEffect, useState } from "react";
import Post from "../create-post/index";

export default function ProfilePage() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();

  //   const url = new URL("https://example.com?foo=1&bar=2");

  // const personname = new URLSearchParams(url.search);
  const personName = "Tonje";

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3MiwibmFtZSI6IktoYWRhciIsImVtYWlsIjoiS2hhZGFyQHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY5NjkzNDEwMH0.LBn5-HZyYjJT9RUFrid6F7NBvMSnNls-Bzx06FAQ_j0",
    },
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/social/profiles/${personName}`,
          options
        );

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          console.log(data);
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

    const newPostData = {
      title: postText,
      body: postText,
      userId: getUserId(),
    };

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/social/posts",
        options
      );

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
    return "85"; // Example user ID
  };

  console.log(profile);

  return (
    <div className="w-full">
      {/* Profile Section */}
      <div className="bg-neutral-100 text-gray-900 dark:text-white border-2 border-white dark:bg-gray-800 dark:border-gray-700 rounded-3xl overflow-hidden">
        <div
          className={`relative bg-indigo-600 h-40`}
          style={{ backgroundColor: "#F4D196" }}
        >
          <img
            src={profile?.banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-400 opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={profile?.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
            />
          </div>
        </div>
        {/* Profile Details */}
        <div className="px-6 py-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold text-gray-800 dark:text-white">
            Profile Name {profile?.name}
          </h1>
          <p className="text-gray-600 dark:text-white">Profile Bio</p>
        </div>
        {/* Bio */}
        <div className="px-6 py-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
            Bio {profile?.email}
          </h2>
          <p className="text-sm sm:text-sm md:text-sm text-gray-600 dark:text-white">
            I DANCE FOR MONEY
          </p>
        </div>
      </div>

      {/* Create Post Section */}
      <div className="mt-4 w-full bg-orange-200 p-6 rounded-3xl border-2 border-orange-100 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 ml-2">
          What's on your mind...
        </h1>
        <form onSubmit={handleOnSubmit}>
          <div className="flex items-start space-x-4">
            <img
              className="w-10 h-10 rounded-full"
              src="user-avatar.jpg" // Replace with the actual path to your user's avatar
              alt="User Avatar"
            />
            <div className="flex-grow">
              <textarea
                placeholder="Write your post here..."
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
      </div>

      {/* Posts Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Recent Posts:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts.map((post, index) => <Post key={index} post={post} />)
        )}
      </div>
    </div>
  );
}
