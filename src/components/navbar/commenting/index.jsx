import React, { useState } from "react";
import PropTypes from "prop-types";

CommentSection.propTypes = {
    postId: PropTypes.number.isRequired,
    existingComments: PropTypes.arrayOf(PropTypes.string).isRequired,
    onCommentSubmit: PropTypes.func.isRequired,
  };
  

function CommentSection({ postId, existingComments, onCommentSubmit }) {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    onCommentSubmit(postId, newComment);
    setNewComment("");
  };

  return (
    <div className="mt-4">
      <h3 className="mb-2 text-lg font-semibold text-left">Comments:</h3>
      <ul className="list-disc pl-4 text-left">
        {existingComments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <div className="mt-2 flex items-center">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
          className="flex-grow p-2 text-base text-left text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 rounded-lg"
        />
        <button
          onClick={handleCommentSubmit}
          className="ml-2 text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-emerald-600 hover:border-emerald-600"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;