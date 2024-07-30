import React, { useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
import BlogPost from "../blog-posts/BlogPost";

const Homepage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const { isAuthenticated, user, loading } = useAuthContext();
  console.log(user);
  console.log(blogs);

  if (!isAuthenticated) {
    navigate("/login");
  }

  const fetchBlogs = async () => {
    try {
      const blog = await axios.get(`/api/v1/blog/${user.id}`);
      // console.log("Fetched blog", blog.data.allPosts);
      setBlogs(blog.data.posts);
    } catch (error) {
      console.error("Error fetching blog", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Blog App</h1>
      </header>
      <div className="blog-posts">
        {blogs.map((post, index) => (
          <BlogPost key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
