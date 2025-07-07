"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
//import { useRouter } from "next/navigation";

import styles from "./styles/LoginForm.module.css";

export default function CredentialsLoginForm() {
  //const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // if (res?.error) {
    //   setError("Invalid email or password");
    // } else {
    //   router.push("/");
    // }
    if (res?.error) {
      setError("Invalid email or password");
    } else {
      // Instead of router.push("/")
      window.location.href = "/"; // ← full page reload ensures auth() reflects session
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <span className={styles.error}>{error}</span>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        Log in
      </button>
    </form>
  );
}
