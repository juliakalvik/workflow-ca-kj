import React, { useState } from 'react';
import UserIcon from "../../../assets/basic-user.svg";
import MediaIcon from "../../../assets/icons/media.svg";
import GifIcon from "../../../assets/icons/gif.svg";
import EmojiIcon from "../../../assets/icons/emoji.svg";

function PostSubmission() {

  const [postContent, setPostContent] = useState('');

  const handlePostSubmission = async () => {
    try {
      // Send the postContent to your backend API endpoint
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: postContent }),
      });

      if (response.ok) {
        // Handle success, maybe show a success message
        console.log('Post successful!');
      } else {
        // Handle error, show an error message
        console.error('Error posting the content');
      }
    } catch (error) {
      console.error('Error posting the content', error);
    }
  };
  
  return (
    <div className=" bg-neutral-100 text-gray-900 w-full text-xl p-4 mb-1 rounded-3xl border-2 border-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-start space-x-4">
        {/* User Profile */}
        <img src={UserIcon} alt="User Icon" className="hidden xxs:inline-block w-10 h-10 rounded-full" />

        {/* Post Input */}
        <div className="flex-grow w-full">
          <textarea
            placeholder="What's happening?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full h-auto resize-none overflow-hidden text-sm border border-gray-300  dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 p-2 rounded-3xl"
          ></textarea>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between mt-2">
        {/* Icons */}
        <div className="flex space-x-1 flex-wrap">
          <img src={MediaIcon} alt="Camera Icon" className="w-4 h-4 dark:invert hidden xxs:inline-block" />
          <img src={GifIcon} alt="GIF Icon" className="w-4 h-4 dark:invert hidden xxs:inline-block" />
          <img src={EmojiIcon} alt="Emoji Icon" className="w-4 h-4 dark:invert hidden xxs:inline-block" />
        </div>

        {/* Post Button */}
        <button className="bg-orange-200 dark:bg-blue-500 dark:text-white dark:border-blue-500 dark:hover:border-blue-400  text-gray-900 px-12 py-2 rounded-3xl ms-1 border-2 border-orange-200 hover:border-orange-100 shadow-custom leading-tight tracking-tight">
          Post
        </button>
      </div>
    </div>
  );
}

export default PostSubmission;
