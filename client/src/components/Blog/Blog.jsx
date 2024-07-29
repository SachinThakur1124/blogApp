import React from "react";
import "./BlogPost.css";

const BlogPost = ({ title, description, image }) => {
  return (
    <div className="blog-post">
      <img src={image} alt={title} className="blog-post-image" />
      <h2 className="blog-post-title">{title}</h2>
      <p className="blog-post-description">{description}</p>
    </div>
  );
};

export default BlogPost;
