"use client";
import styles from "../CSS/Login.module.css";
import InputControl from "../InputControl.js";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useAuth} from '../Context/AuthContext';

function Login() {
  const router = useRouter();
  const {user, login} = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async() => {
    if (!values.email || !values.password) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);

    try{
      await login(values.email, values.password);
      setSubmitButtonDisabled(false);
      router.push("/Dashboard");
      alert("Login Successful");

    }catch(err){
      setSubmitButtonDisabled(false);
      alert("Wrong email or password");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>
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
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Login
          </button>
          <p>
            Create a new account?{" "}
            <span>
              <Link href="/Signup">Signup</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
