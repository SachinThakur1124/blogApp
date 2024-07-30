import React from "react";
import "./blogcard.css";
import { useAuthContext } from "../../context/AuthContextProvider";

const imageUrl = (imagePath) => {
  return `${import.meta.env.VITE_BASE_URL}/images/${encodeURIComponent(
    imagePath
  )}`;
};

const BlogPost = ({ post }) => {
  const { isAuthenticated, user, loading } = useAuthContext();
  const imageSrc = imageUrl(post.image);
  console.log(imageSrc); // Log the image URL to the console

  return (
    <div className="blog-card">
      <img src={imageSrc} alt={post.title} className="blog-image" />
      <div className="blog-content">
        <h2 className="blog-title">{post.title}</h2>
        <p className="blog-description">{post.description}</p>
        <p className="blog-author">By {user.name}</p>
        <p className="blog-date">{post.createdAt}</p>
      </div>
    </div>
  );
};

export default BlogPost;
