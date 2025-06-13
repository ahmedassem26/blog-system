import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const PostsContext = createContext();

// const InitialPosts = [
//   {
//     id: 1,
//     title: "Getting Started with React",
//     description:
//       "React has become one of the most popular frontend frameworks. Learn the core concepts like components, props, and state to begin your React journey.",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     author: "Ahmed Assem",
//   },
//   {
//     id: 2,
//     title: "CSS Grid vs Flexbox",
//     description:
//       "Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Understand when to use each for optimal responsive designs.",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     author: "Ahmed Assem",
//     date: "2023-06-22",
//   },
//   {
//     id: 3,
//     title: "JavaScript ES6 Features",
//     description:
//       "Modern JavaScript has evolved significantly. Explore essential ES6+ features like arrow functions, destructuring.",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     author: "Ahmed Assem",
//   },
//   {
//     id: 4,
//     title: "The Art of Programming",
//     description:
//       "Programming is not just about writing code, it's about solving problems creatively. Every developer has their own unique approach to tackling challenges.",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     author: "Sarah Johnson",
//   },
//   {
//     id: 5,
//     title: "Web Development Trends 2023",
//     description:
//       "This year we're seeing exciting developments in web technologies, with frameworks like React and Vue continuing to dominate the frontend landscape.",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     author: "Michael Chen",
//   },
//   {
//     id: 6,
//     title: "Mobile First Design",
//     description:
//       "With mobile devices accounting for over 50% of web traffic, adopting a mobile-first approach to design is no longer optional for modern websites.",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     author: "Emma Wilson",
//   },
//   {
//     id: 7,
//     title: "CSS Tricks You Should Know",
//     description:
//       "Learn these 10 CSS tricks that will make your styling more efficient and your websites more responsive than ever before.",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     author: "David Rodriguez",
//   },
//   {
//     id: 8,
//     title: "JavaScript Performance Tips",
//     description:
//       "Optimizing your JavaScript code can lead to significantly better user experiences. Here are some proven techniques to speed up your apps.",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     author: "Lisa Park",
//   },
//   {
//     id: 9,
//     title: "Building Accessible Websites",
//     description:
//       "Web accessibility isn't just good practice - it's essential. Learn how to make your sites usable for everyone, regardless of ability.",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     author: "James Peterson",
//   },
//   {
//     id: 10,
//     title: "The Future of AI in Development",
//     description:
//       "Artificial intelligence is changing how we write and maintain code. Explore how AI tools are transforming the developer workflow.",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     author: "Nadia Ali",
//   },
//   {
//     id: 11,
//     title: "State Management Solutions",
//     description:
//       "Comparing different state management approaches in React: Context API, Redux, Zustand, and Jotai. Which one is right for your project?",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     author: "Thomas Wright",
//   },
//   {
//     id: 12,
//     title: "TypeScript Best Practices",
//     description:
//       "TypeScript can dramatically improve your code quality when used properly. Here are the patterns and practices that deliver the most value.",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     author: "Olivia Martinez",
//   },
// ];

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postMode, setpostMode] = useState("Add");
  const [currentPost, setCurrentPost] = useState({});
  const { token, user } = useContext(AuthContext);

  // Fetch posts
  const getAllPosts = async () => {
    const response = await fetch("http://localhost:4000/api/posts");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch posts");
    }
    setPosts(data);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleEditPost = (post) => {
    setpostMode("Edit");
    setCurrentPost(post);
  };

  const handleAddPost = () => {
    setpostMode("Add");
    setCurrentPost({});
  };

  const createPost = async (postData) => {
    const response = await fetch("http://localhost:4000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create post");
    }

    setPosts([data, ...posts]);
    return data;
  };

  const updatePost = async (postId, postData) => {
    const response = await fetch(`http://localhost:4000/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update post");
    }

    setPosts(posts.map((post) => (post._id === postId ? data : post)));
    return data;
  };

  const deletePost = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    const response = await fetch(`http://localhost:4000/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete post");
    }

    setPosts(posts.filter((post) => post._id !== postId));
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        postMode,
        setpostMode,
        handleAddPost,
        handleEditPost,
        currentPost,
        createPost,
        updatePost,
        deletePost,
        token,
        user,
        isLoggedIn: user ? true : false,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
