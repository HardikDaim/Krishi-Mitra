import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./blogCard";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';


export default function UserBlogs() {
  const [blogs, setBlogs] = useState([]);
  // get user blogs
  const getUserBlogs = async () => {
    const authToken = Cookies.get('authToken');
    const secretKey = 'Mynameishardik'; // Replace with your actual secret key
    try {
      const decodedToken = jwt.verify(authToken, secretKey);
      const id = decodedToken.userId;
   
      console.log('userId:', id); 
      const {data} = await axios.get(`http://localhost:4000/api/user-blog/${id}`);

      if (data.success) {
        // Handle successful response
        setBlogs(data.userBlog.blogs);
        console.log(data.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs)
  return (
    <div>
      <div><Navbar /></div>
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            title={blog.title}
            content={blog.content}
            image={blog.image}
            author={blog.author}
            date={blog.date}
          />
        ))}
    </div>
  
    </div>
  );
}
