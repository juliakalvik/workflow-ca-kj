import { API_URL } from '../lib/constants';
import { useEffect, useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import UserIcon from "../assets/icons/user.svg";

const SinglePostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/social/posts/${id}`);
      const data = await response.json();
      setPost(data);
    };
    fetchData();
  }, [id]);

  return (
    <>
      {post ? (
        <div
          className="w-full p-4 mb-4 border-2 border-white bg-neutral-100 rounded-3xl dark:bg-gray-700 dark:border-gray-600"
        >
          <h2 className="text-lg font-bold text-left text-gray-800 dark:text-white">
            {post.title}
          </h2>
          <p className="mb-2 text-base text-left text-gray-800 dark:text-white">
            {post.body}
          </p>
          {post.media && (
            <img
              src={post.media}
              alt="Post Media"
              className="w-full h-auto mb-2"
            />
          )}
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/">Go Back</Link>
    </>
  );
};

export default SinglePostPage;
