import React from "react";
import BlogPost from "../Blog/Blog";
import "./Homepage.css";

const posts = [
  {
    title: "First Blog Post",
    description: "This is the description of the first blog post.",
    image: "https://via.placeholder.com/300",
  },
  {
    title: "Second Blog Post",
    description: "This is the description of the second blog post.",
    image: "https://via.placeholder.com/300",
  },
  // Add more posts here
];

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Blog App</h1>
      </header>
      <div className="blog-posts">
        {posts.map((post, index) => (
          <BlogPost
            key={index}
            title={post.title}
            description={post.description}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
