"use client";
import styles from "../CSS/Login.module.css";
import InputControl from "../InputControl.js";
import Link from "next/link";
import { useState } from "react";
import {updateProfile} from "firebase/auth";
import {auth} from '../config/firebase';
import { useRouter } from 'next/navigation';
import {useAuth} from '../Context/AuthContext';

function Signup() {
  const router = useRouter();
  const {user, signup} = useAuth();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission= async(e)=>{
    e.preventDefault();
    if(!values.name || !values.email || !values.password){
        setErrorMsg("Please fill all the fields");
        return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);

    try{
      await signup(values.email, values.password);
      setSubmitButtonDisabled(false);
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: values.name,
      });
      alert("Account created successfully");
      router.push("/Login");
    }catch(err){
      setSubmitButtonDisabled(false);
      alert("An error occured please retry!");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>SignUp</h1>
        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) => {
            setValues((prev) => ({ ...prev, name: event.target.value }));
          }}
        />
        <InputControl
          label="Email"
          placeholder="Enter your email"
          onChange={(event) => {
            setValues((prev) => ({ ...prev, email: event.target.value }));
          }}
        />
        <InputControl
          label="Password"
          placeholder="Enter your password"
          onChange={(event) => {
            setValues((prev) => ({ ...prev, password: event.target.value }));
          }}
          type="password"
        />
        <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled = {submitButtonDisabled}>Signup</button>
          <p>
            Already have an account?{" "}
            <span>
              <Link href="/Login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
