"use client";

import styles from "./styles/LoginForm.module.css";
import { login } from "../lib/actions/auth";

export default function GoogleLoginForm() {
  return (
    <button onClick={() => login()} className={styles.oauthButton}>
      <span className={styles.oauthIcon}> {/* insert Google icon image here if desired */} </span>
      Continue with Google
    </button>
  );
}
