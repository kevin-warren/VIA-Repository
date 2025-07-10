// import { registerUser } from "../lib/actions/register";
// import styles from "../ui/styles/LoginForm.module.css";

// export default function RegisterPage() {
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.card}>
//         <h1 className={styles.heading}>Create Account</h1>

//         <form action={registerUser} className={styles.form}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             required
//             className={styles.input}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required
//             className={styles.input}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             className={styles.input}
//           />

//           <button type="submit" className={styles.button}>
//             Create Account
//           </button>
//         </form>

//         <p className={styles.orText}>
//           Already have an account?{" "}
//           <a href="/login" className={styles.link}>
//             Sign In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../lib/actions/register";
import styles from "../ui/styles/LoginForm.module.css";

export default function RegisterPage() {
  //const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await registerUser(formData); // this calls your "use server" action
      // Success: redirect will happen on server via `redirect("/login")`
    } catch (err: any) {
      setError(err.message); // Displays "User already exists"
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Create Account</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
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

          {/* 🔴 Error message display */}
          {error && <p className={styles.error}>{error}</p>}
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
