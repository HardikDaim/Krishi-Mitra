import React from 'react';
import './App.css';
import Home from './screens/home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/login';
import Signup from './screens/signup';
import About from './screens/about'
import Services from './screens/services'
import Contact from './screens/contact'
import CreateBlog from './screens/createBlog';



function App() {
  return (
  
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/create-blog" element={<CreateBlog />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
 
  );
}

export default App;
