import { useState, useEffect } from "react";

const SinglePost = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  // Define query parameters
  const queryParams = {
    _posts: true,
    _following: true,
    _followers: true,
  };


  //Correct user id and token inserted from local storage- CNB.  ---- FYI
  const userId = localStorage.getItem("userId");
  const accessKey = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Convert queryParams to URLSearchParams
        const params = new URLSearchParams(queryParams);

        // Construct the URL
        const url = new URL(
          `https://api.noroff.dev/api/v1/social/profiles/${userId}/`
        );
        url.search = params.toString();
        console.log(url.href)

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessKey}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Recent Posts</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mt-4 text-xl font-semibold text-black">Posts</h2>
          {profile?.posts.map((post) => (
            <div key={post?.id} className="flex p-4 bg-white rounded-lg shadow">
              <div className="mr-4">
                <img
                  src={profile?.avatar}
                  alt={profile?.name}
                  className="object-cover w-12 h-12 rounded-full"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-black">{post?.title}</h2>
                <p className="text-gray-600 ">{post?.body}</p>
                <div className="mt-2">
                  {post?.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 mr-2 text-xs text-gray-700 bg-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full text-black">
                <img
                  src={post?.media}
                  alt={post?.title}
                  className="object-cover w-full h-48 mt-2 rounded-lg text-balck"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SinglePost;
