import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postMode, setpostMode] = useState("Add");
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

  //handlers
  const handleEditPost = () => {
    setpostMode("Edit");
  };

  const handleAddPost = () => {
    setpostMode("Add");
  };

  //Post operations
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
        handleAddPost,
        handleEditPost,
        createPost,
        updatePost,
        deletePost,
        token,
        user,
        isLoggedIn: !!(token && user),
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
