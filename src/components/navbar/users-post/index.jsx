// import UserIcon from "../../../assets/basic-user.svg";
// import MediaIcon from "../../../assets/icons/media.svg";
// import GifIcon from "../../../assets/icons/gif.svg";
// import EmojiIcon from "../../../assets/icons/emoji.svg";
/** *Reusable Input and Button Components

 * @author PetterMartin*/

import React, { useState } from 'react';

let lastRequestTime = 0;

export default function CreatePostForm() {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  async function handleOnSubmit(event) {
    event.preventDefault();
    const currentTime = Date.now();

    if (currentTime - lastRequestTime < 1000) {
      console.log('Wait 1 second between requests.');
      return;
    }

    lastRequestTime = currentTime;
    setButtonDisabled(true);

    const form = event.target;
    const { title, userId } = form.elements;

    const accessKey = {
      headers: {
        Authorization: "YOUR_AUTH_TOKEN_HERE",
      },
    };

    const newPost = {
      title: title.value,
      body: title.value,
      userId: userId.value,
    };

    try {
      const response = await fetch("https://api.noroff.dev/api/v1/social/posts?limit=1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          ...accessKey.headers,
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        console.log("Post successful!");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }

    setTimeout(() => setButtonDisabled(false), 1000);
  }

  return (
    <form
      onSubmit={handleOnSubmit}
    // Your existing classNames
    >
      {/* Existing form content */}
      <button
        type="submit"
        disabled={buttonDisabled}
      // Your existing classNames
      >
        Post
      </button>
    </form>
  );
}
