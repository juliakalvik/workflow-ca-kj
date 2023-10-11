
// import UserIcon from "../../../assets/basic-user.svg";
// import MediaIcon from "../../../assets/icons/media.svg";
// import GifIcon from "../../../assets/icons/gif.svg";
// import EmojiIcon from "../../../assets/icons/emoji.svg";

export default function CreatePostForm() {
  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const { title, userId } = form.elements;

    const accessKey = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3MiwibmFtZSI6IktoYWRhciIsImVtYWlsIjoiS2hhZGFyQHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY5NjkzNDEwMH0.LBn5-HZyYjJT9RUFrid6F7NBvMSnNls-Bzx06FAQ_j0",
      },
    };

    const newPost = {
      title: title.value,
      body: title.value,
      userId: userId.value,
    };

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/social/posts", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            ...accessKey.headers, 
          },
          body: JSON.stringify(newPost),
        }
      );
  
      if (response.ok) {
        console.log("Post successful!");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    }
  }

  return (
    <form
      className="p-4 py-6 mt-8 space-y-6 rounded shadow bg-zinc-900"
      onSubmit={handleOnSubmit}
    >
      <h3>Create a new post</h3>

      <section>
        <div className="flex flex-col gap-1 mt-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-white"
          >
            title
          </label>

          <input
            id="title"
            name="title"
            required
            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </section>

      <div>
        <div className="flex flex-col gap-1 mt-2">
          <label
            htmlFor="userId"
            className="block text-sm font-medium leading-6 text-white"
          >
            User Id
          </label>
          <input
            id="userId"
            name="userId"
            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Post
        </button>
      </div>
    </form>
  );
}
