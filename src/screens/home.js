import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Carousel from "../components/carousel";
import Newsletter from "../components/newsletter";
import axios from "axios";
import BlogCard from "../components/blogCard";
import AddInfo from "./addinfo";

export default function Home() {
  const backgroundImageStyle = {
    backgroundImage:
      'url("https://www.transparenttextures.com/patterns/black-thread-light.png")',
    /* Add other background properties here if needed */
    backgroundColor: "#f0f4f8",
  };

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
      <div style={backgroundImageStyle}>
        <div className="row">
          <div className="col-12 col-lg-3 col-md-4 col-sm-12 container">
            {localStorage.getItem("authToken") && (
              <div className="mt-4 bg-white ">
                <div className="w-full mx-auto p-4 border rounded-lg">
                  <h2 className="text-2xl font-semibold mb-2 text-center">
                    Create a New Post
                  </h2>
                  <form className="flex flex-wrap">
                    <div className="w-full mb-4 flex-grow pr-2">
                      <label
                        htmlFor="postContent"
                        className="block text-gray-700 font-bold"
                      >
                        Write something about your post:
                      </label>
                      <Link to="/create-blog ">
                        <textarea
                          id="postContent"
                          name="postContent"
                          rows="4"
                          className="w-full border rounded-lg p-2"
                          placeholder="What's in your mind...?"
                          required
                        ></textarea>
                      </Link>
                      <div className="flex">
                        <div className="w-full md:w-1/4 mb-4 md:mb-0">
                          <div className="relative flex items-center">
                            <img 
                              width="48"
                              height="48"
                              src="https://img.icons8.com/fluency/48/cloud.png"
                              alt="cloud"
                            />
                            <div className="relative flex items-center ml-5">
                              <img
                                width="48"
                                height="48"
                                src="https://img.icons8.com/fluency/48/tractor.png"
                                alt="tractor"
                              />
                            </div>
                            <div className="relative flex items-center ml-5">
                              <img
                                width="48"
                                height="48"
                                src="https://img.icons8.com/fluency/48/shopping-cart-promotion.png"
                                alt="shopping-cart-promotion"
                              />{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <button
                        type="submit"
                        className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full"
                      >
                        Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

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
                <strong>Register</strong> or <strong>Login</strong> to see
                Posts!
              </p>
            </div>
          )}
        </div>
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
