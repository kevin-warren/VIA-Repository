import Link from 'next/link';
import styles from "../ui/styles/LoginForm.module.css";
import CredentialsLoginForm from "../ui/CredentialsLoginForm";
import GoogleLoginForm from "../ui/GoogleLoginForm";

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Sign In</h1>
        <GoogleLoginForm />
        <span className={styles.orText}>Or</span>
        <CredentialsLoginForm />
        <Link href="/register" className={styles.NewUser}>
            New User? Create Account
        </Link>
      </div>
    </div>
  );
}

