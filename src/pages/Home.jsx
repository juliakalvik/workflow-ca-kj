import { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";
import Header from "../components/navbar/header";
import NavBar from "../components/navbar/home-nav";
import PostSubmission from "../components/navbar/users-post";
import OtherPosts from "../components/navbar/posts";
import TrendingSection from "../components/navbar/trending";

/**
 * @typedef {import('../lib/types.js').PostModel} Post
 */

/**
 * Home Page displays a list of posts
 * @see https://docs.noroff.dev/social-endpoints/posts
 */
export default function HomePage() {
  /** @type {[Post[], React.Dispatch<Data>]} */
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        const accessToken = localStorage.getItem("jwt");

        const url = new URL(`${API_URL}/posts`);
        url.searchParams.append("_author", "true");
        url.searchParams.append("_comments", "true");
        url.searchParams.append("_reactions", "true");

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong! {error?.message}</h1>;

  return (
    <>
      <div className="container mt-2 mx-2 w-full">
        {/* Header*/}
        <Header />

        {/* Main Content */}
        <div className="flex">
          {/* Left Side */}
          <div className="min-w-80 sm:w-2/12 md:w-3/12">
            <NavBar />
          </div>

          {/* Middle */}
          <div className="w-10/12 sm:w-10/12 md:w-7/12 mx-1">
            <PostSubmission />
            <OtherPosts />
          </div>

          {/* Right Side */}
          <div className="w-0 sm:w-0 md:w-2/12">
            <TrendingSection />
          </div>
        </div>
      </div>
      <section>
        {posts.map((post) => (
          <div key={post.id}>{post?.title}</div>
        ))}
      </section>
    </>
  );
}

