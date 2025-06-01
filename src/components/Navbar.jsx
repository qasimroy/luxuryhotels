"use client"
import Link from 'next/link';
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookies from 'js-cookie';
import { apis } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const Navbar = () => {

  const { request, response, loading } = useRequest(true);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 2500, // Animation duration (in ms)
      easing: "ease-in-out", // Easing for the animation
      once: false, // Whether animation should happen only once
    });
  });

  const token = Cookies.get("token");


  const userdetails = localStorage.getItem("userdetails");
  const userdetailsJsonString = JSON.parse(userdetails);

  // console.log("userdetailsJsonString",userdetailsJsonString);

  const handleLogout = () => {
    // Retrieve the user details from localStorage and parse it as JSON
    const userDetails = JSON.parse(localStorage.getItem("userdetails"));

    if (userDetails && userDetails.authToken) {
      // Send the POST request with the authToken as the payload
      // request("POST", apis.LOGOUT_API, { authToken: userDetails.authToken });
      localStorage.removeItem("userdetails");

      window.location.href = "/new"

    } else {
      console.error("No user details or authToken found in localStorage");
    }
  };

  // useEffect(() => {
  //   if (response) {
  //     // On successful response, clear user details from localStorage and redirect
  //     localStorage.removeItem("userdetails");
  //     router.push("/");
  //     toast.success(response?.message);
  //   }
  // }, [response])

  return (
    <header id="header" data-aos="fade-down">
      {/* Top Navigation Bar */}
      <div className="top-nav-list">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-expand-lg">
                <div className=" navbar-collapse">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link className="nav-link" href="/dashboard/">LIST YOUR HOTEL</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/publish-news"
                        className="nav-link btn-link"
                      // onClick={() => alert('Publish News Clicked!')}
                      >
                        PUBLISH NEWS
                      </Link>
                    </li>
                    {!userdetailsJsonString?.authToken && (
                      <li className="nav-item">
                        <a className="nav-link" href="/new/login">Login</a>
                      </li>
                    )}

                    {userdetailsJsonString?.authToken && (

                      <div className="nav-item dropdown user_dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="javascript:void(0);"
                          id="user-drop"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img src="/new/assets/img/user.png" alt="" />
                        </a>
                        <div className="dropdown-menu" aria-labelledby="user-drop">
                          <div className="user_info">
                            <div className="user_name">
                              <div>{userdetailsJsonString?.name}</div>
                              <div className="user_email">
                                <small>{userdetailsJsonString?.email}</small>
                              </div>
                            </div>
                            <ul>
                              <li>
                                <Link href="/dashboard">
                                  dashboard
                                </Link>
                              </li>
                              <li>
                                <a onClick={handleLogout} className='text-gray-950 cursor-pointer'>
                                  <i className="ion-log-out " /> Logout
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}


                    {/* {!userdetailsJsonString.authToken ?(
                         <li className="nav-item">
                     <a className="nav-link" href="/new/login">Login</a>
                     </li> 
                    ):(
                      <div className="dropdown">
                        <div className="avatar" tabindex="0" role="button" fdprocessedid="g1z11c">
                          <div className="w-12 rounded-full">
                            <img src="https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg" />
                            </div>
                            
                            </div>
                            <ul tabindex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                              <p className="text-xl font-medium  hover:hover:text-primary p-2">{userdetailsJsonString?.name}</p>
                              <Link className="text-xl font-medium  hover:hover:text-primary p-2" href="new/dashboard">Dashboard</Link>
                              <p className="text-xl font-medium  hover:hover:text-primary p-2 cursor-pointer" onClick={handleLogout}>Log Out</p>
                              </ul>
                              </div>
                    )} */}
                    <li className="nav-item">
                      <Link href="/luxury-hotels-find" className="nav-link theme-btn" style={{ background: 'linear-gradient(to right, rgb(204, 164, 89), rgb(230, 205, 113), rgb(204, 163, 86))' }}>
                        FIND A HOTEL
                      </Link>

                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container">
        <nav className="navbar navbar-links navbar-expand-lg">
          <a className="navbar-brand" href="/new">
            <img src="/new/assets/img/logo.svg" alt="Luxury Hotel Logo" />
          </a>

          {userdetailsJsonString?.authToken && (

            <div className="nav-item dropdown user_dropdown mobile-usershow">
              <a
                className="nav-link dropdown-toggle"
                href="javascript:void(0);"
                id="user-drop"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src="/new/assets/img/user.png" alt="" />
              </a>
              <div className="dropdown-menu" aria-labelledby="user-drop">
                <div className="user_info">
                  <div className="user_name">
                    <div>{userdetailsJsonString?.name}</div>
                    <div className="user_email">
                      <small>{userdetailsJsonString?.email}</small>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link href="/dashboard">
                        dashboard
                      </Link>
                    </li>
                    <li>
                      <a onClick={handleLogout} className='text-gray-950'>
                        <i className="ion-log-out " /> Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className=" navbar-collapse main-navbar" id="navbarContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/new">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/new/luxury-hotels-resorts">Luxury Hotels & Resorts</a>
              </li>

              <li className="nav-item">
                {/* <select
                  className="newsSelect form-select"
                  onChange={(e) => console.log(e.target.value)}
                  defaultValue="news"
                  aria-label="News Options"
                >
                  <option value="news">NEWS</option>
                  <option value="latest-news">LATEST NEWS</option>
                  <option value="travel-news">TRAVEL NEWS</option>
                </select> */}

                <div className="dropdown">
                  <button className="nav-link news-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    News
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item " href="/latest-news">LATEST NEWS</Link></li>
                    <li><Link className="dropdown-item" href="/travel-news">TRAVEL NEWS</Link></li>
                  </ul>
                </div>
              </li>

              <div className='mobile-nav'>
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/hotel-info">LIST YOUR HOTEL</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/publish-news"
                      className="nav-link btn-link"
                    // onClick={() => alert('Publish News Clicked!')}
                    >
                      PUBLISH NEWS
                    </Link>
                  </li>
                  {!userdetailsJsonString?.authToken && (
                    <li className="nav-item">
                      <a className="nav-link" href="/new/login">Login</a>
                    </li>
                  )}



                  <li className="nav-item">
                    <Link className="nav-link theme-btn" href="/luxury-hotels-find">
                      FIND A HOTEL
                    </Link>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;