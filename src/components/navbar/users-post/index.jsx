// import UserIcon from "../../../assets/basic-user.svg";
// import MediaIcon from "../../../assets/icons/media.svg";
// import GifIcon from "../../../assets/icons/gif.svg";
// import EmojiIcon from "../../../assets/icons/emoji.svg";
/** *Reusable Input and Button Components

 * @author PetterMartin*/

let lastRequestTime = 0;

export default function CreatePostForm() {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  async function handleOnSubmit(event) {
    const currentTime = Date.now();

    if (currentTime - lastRequestTime < 1000) {
      console.log('Wait 1 second between requests.');
      return;
    }
    lastRequestTime = currentTime;

    event.preventDefault();
    setButtonDisabled(true);

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
        "https://api.noroff.dev/api/v1/social/posts?limit=1",
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
      className="w-full p-4 mb-1 text-xl text-gray-900 border-2 border-white bg-neutral-100 rounded-3xl dark:bg-gray-800 dark:border-gray-700"
      onSubmit={handleOnSubmit}
    >
      <h3>Create a new post</h3>

      <section>
        <div className="flex flex-col gap-1 mt-2">
          <label
            htmlFor="title"
            className="block text-sm leading-6 text-black"
          >
            Subject
          </label>


          <input
            id="title"
            name="title"
            required
            className="w-full h-auto resize-none overflow-hidden text-sm border border-gray-300  dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 p-2 rounded-3xl"
          />

        </div>
      </section>

      <div>
        <div className="flex flex-col gap-1 mt-2">
          <label
            htmlFor="userId"
            className="block text-sm leading-6 text-black"
          >
            What´s on your mind?
          </label>
          <input
            id="userId"
            name="userId"
            className="w-full h-20 resize-none overflow-hidden text-sm border border-gray-300  dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 p-2 mb-4 rounded-3xl"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="px-12 py-2 leading-tight tracking-tight text-gray-900 bg-orange-200 border-2 border-orange-200 dark:bg-blue-500 dark:text-white dark:border-blue-500 dark:hover:border-blue-400 rounded-3xl ms-1 hover:border-orange-100 shadow-custom"
        >
          Post
        </button>
      </div>
    </form>
  );
}
