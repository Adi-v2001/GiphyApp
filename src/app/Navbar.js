// 'use client';
import React from "react";
import Link from "next/link";
import Image from 'next/image';
import image from '../../public/giphy.jpeg';
import {useAuth} from './Context/AuthContext';

const Navbar = () => {

  const{user, logOut} = useAuth();
  return (
    <nav
      className="navbar fixed-top navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
      <Image
        className="logo"
        src={image}
        alt="My Image"
        style={{height:'50px',width:'50px',borderRadius:'50%', marginRight:'10px'}}
      />
        <a className="navbar-brand">
          GetGiphy
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
            <>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">
                Home
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/Dashboard">
                Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/" onClick={()=>{
                  logOut();
                }}>
                Logout
                </Link>
            </li>
            </>):(
            <>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">
                Home
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/Login">
                Login
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/Signup">
                Signup
                </Link>
            </li>
            </>)}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
