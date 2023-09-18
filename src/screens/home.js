import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Carousel from "../components/carousel";
import Newsletter from "../components/newsletter";
import axios from "axios";
import BlogCard from "../components/blogCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  // Function to fetch all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/all-blogs");
      if (data?.success) {
        // Reverse the order of blogs
        const reversedBlogs = data.blogs.reverse();
        setBlogs(reversedBlogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      {/* <div>
        <Carousel />
      </div> */}
      <div>
        {localStorage.getItem("authToken") ? (
          blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                title={blog.title}
                content={blog.content}
                image={blog.image}
                author={blog.author}
                date={blog.date}
                _id={blog._id} // Pass the _id to the BlogCard component
              />
            ))
          ) : (
            <div className="text-center">
              <div className="h-screen flex flex-col items-center justify-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="160"
                  height="160"
                  fill="currentColor"
                  className="bi bi-bank mb-2"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89L8 0ZM3.777 3h8.447L8 1 3.777 3ZM2 6v7h1V6H2Zm2 0v7h2.5V6H4Zm3.5 0v7h1V6h-1Zm2 0v7H12V6H9.5ZM13 6v7h1V6h-1Zm2-1V4H1v1h14Zm-.39 9H1.39l-.25 1h13.72l-.25-1Z" />
                </svg>
                <p className="text-4xl">No Posts Yet!</p>
              </div>
            </div>
          )
        ) : (
          <div className="h-screen flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="160"
              height="160"
              fill="currentColor"
              class="bi bi-door-open-fill mb-2"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
            </svg>
            <p className="text-4xl">
              <strong>Register</strong> or <strong>Login</strong> to see Posts!
            </p>
          </div>
        )}
      </div>

      {/* <div>
        <Newsletter />
      </div> */}
      <div>
        <Footer />
      </div>
    </div>
  );
}
