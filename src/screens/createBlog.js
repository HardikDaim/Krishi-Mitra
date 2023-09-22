import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import axios from 'axios';

export default function CreateBlog() {

  let navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    image: '',
    author: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         // Retrieve the user's ID from the session data (assuming you have set it in the session during login)

      const response = await axios.post('http://localhost:4000/api/create-post', {
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
        author: inputs.author,
       
      });

      if (response.status === 200) {
        console.log(response.data); // Handle success response
        navigate('/');
        alert('Post Successfully Uploaded');
      } else {
        throw new Error('Failed to Post');
      }
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create new Post
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 ">
                Location/Area
              </label>
              <div className="">
                <input
                  name="title"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                Name of Crop
              </label>
              <div className="">
                <input
                  name="title"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                Problems/Symptoms in Crop
              </label>
              <div className="">
                <input
                  name="title"
                  type="text"
                  value={inputs.title}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                Description/Additional Text
              </label>
              <div className="">      
                <textarea
                name="content"
                value={inputs.content}
                onChange={handleChange}
                rows="4"
                className="w-full block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="What's in your mind..."
               
              ></textarea>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                  Image
                </label>
              </div>
              <div className="">
                <input
                  name="image"
                  value={inputs.image}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                  Author
                </label>
              </div>
              <div className="">
                <input
                  name="author"
                  value={inputs.author}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Post Now
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
