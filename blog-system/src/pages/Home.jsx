import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";
import Post from "../components/Post";
import { Link } from "react-router-dom";

function Home() {
  const { posts, isLoggedIn, handleAddPost } = useContext(PostsContext);

  return (
    <>
      <h1 className="text-6xl font-semibold text-center mt-10 underline underline-offset-8 decoration-purple-700 decoration-4">
        Welcome to my Blog
      </h1>
      <h2 className="text-2xl font-extralight text-center mt-5">
        Start your journey with us by browsing our posts
      </h2>
      <div className="w-1/2 h-0.5 bg-purple-800 mx-auto mt-20"></div>
      {posts.length === 0 && (
        <>
          <div className="text-2xl font-light text-center mt-5">
            {!isLoggedIn
              ? "No posts found, login to add your first post now!"
              : "No posts found,add your first post now!"}
          </div>
          {isLoggedIn ? (
            <Link
              onClick={handleAddPost}
              to="/add"
              className="btn bg-purple-700 rounded-xl hover:bg-purple-800 transition-all duration-300 block mx-auto w-fit text-center mt-4 pt-2"
            >
              Add First Post
            </Link>
          ) : (
            <Link
              to="/login"
              className="btn bg-purple-700 rounded-xl hover:bg-purple-800 transition-all duration-300 block mx-auto w-32 text-center mt-4 pt-2"
            >
              Login
            </Link>
          )}
        </>
      )}
      {posts.length > 0 && (
        <div className="container mx-auto px-4 py-8 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {posts.map((post) => {
              return <Post key={post._id} post={post} />;
            })}
          </div>
          {isLoggedIn && (
            <Link
              onClick={handleAddPost}
              to="/add"
              className="btn btn-circle border-0 shadow-2xl shadow-purple-900 size-15 fixed right-8 bottom-8 bg-purple-700 hover:bg-purple-800 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
