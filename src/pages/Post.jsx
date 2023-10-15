import { API_URL } from '../lib/constants';
import { useEffect, useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';

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
        <div className="single-post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* Add other elements here similar to "otherPosts" */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/">Go Back</Link>
    </>
  );
};

export default SinglePostPage;