import React from 'react';
import Link from "next/link";
import styles from './CSS/HomeStyles.module.css';

const HomePage = () => {
  return (
    <>
    <div className={styles.homeContainer}> 
    <div className={styles.heading}><h1 className={styles.text}>Deep Dive In The World Of GIFs</h1></div> 
      <div className={styles.content}>
        <div className={styles.buttonContainer}>
            <Link href="/Login">
            <button className={styles.loginButton}>Login</button>
            </Link>
            <Link href="/Signup">
            <button className={styles.signupButton}>Signup</button>
            </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomePage;
