import { registerUser } from "../lib/actions/register";
import styles from "../ui/styles/LoginForm.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Create Account</h1>

        <form action={registerUser} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            Create Account
          </button>
        </form>

        <p className={styles.orText}>
          Already have an account?{" "}
          <a href="/login" className={styles.link}>
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
