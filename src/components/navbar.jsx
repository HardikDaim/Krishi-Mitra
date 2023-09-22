import React from 'react'
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {

    const bgColor = {
        backgroundColor: "#f0f4f8",
    }

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login")
    }
    return (
        <div style={bgColor}>

        
        <div className="container-fluid">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3  border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        <img src='/logo-removebg-preview.png' alt='Logo' width={ 40} height={40} ></img>
                        <span class="fs-4 text-indigo-600 font-semibold">कृषि-मित्र</span>
                    </Link>
                </div>

                {localStorage.getItem("authToken") ?
                    <div>
                        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/" className="nav-link  text-indigo-600 hover:text-indigo-500 font-semibold   px-2">Home</Link></li>
                            <li><Link to="/about" className="nav-link  text-indigo-600 hover:text-indigo-500 font-semibold  px-2">About</Link></li>
                            <li><Link to="/services" className="nav-link  text-indigo-600 hover:text-indigo5400 font-semibold  px-2">Services</Link></li>
                            <li><Link to="/contact" className="nav-link text-indigo-600 hover:text-indigo-500 font-semibold  px-2">Contact</Link></li>
                            <li><a href="https://hardikdaim.netlify.app" target='_blank' className="nav-link text-indigo-600 hover:text-indigo-500 font-semibold  px-2">MyWebsite</a></li>
                        </ul>
                    </div> :
                    <div>
                        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/" className="nav-link  text-indigo-600 hover:text-indigo-500 font-semibold   px-2">Home</Link></li>
                            <li><Link to="/about" className="nav-link  text-indigo-600 hover:text-indigo-500 font-semibold  px-2">About</Link></li>
                            <li><Link to="/services" className="nav-link  text-indigo-600 hover:text-indigo5400 font-semibold  px-2">Services</Link></li>
                            <li><Link to="/contact" className="nav-link text-indigo-600 hover:text-indigo-500 font-semibold  px-2">Contact</Link></li>
                            <li><a href="https://hardikdaim.netlify.app" target='_blank' className="nav-link text-indigo-600 hover:text-indigo-500 font-semibold  px-2">MyWebsite</a></li>
                        </ul>
                    </div>
                }


                <div className="col-md-3 text-end">
                    {!localStorage.getItem("authToken") ?
                        <div>
                            <Link to="/login" type="button" className="justify-center border-indigo-600 border-1 rounded-md  px-3 mx-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</Link>
                            <Link to="/signup" type="button" className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</Link>
                        </div>
                        : <div>
                            <Link to="/create-blog" type="button" className="position-relative justify-center border-indigo-600 border-1 rounded-md  px-3 mx-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">+ New <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span></Link>
                            <Link to="/login" type="button" className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleLogout}>LogOut</Link>
                        </div>
                    }
                </div>
            </header>
        </div>
        </div>
    );
}
