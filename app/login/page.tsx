// 'use client';

// import { useState } from 'react';

// export default function SignupPage() {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [message, setMessage] = useState('');

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     const res = await fetch('/api/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       setMessage('Signup successful! You can now log in.');
//     } else {
//       setMessage(data.error || 'Signup failed');
//     }
//   }

//   return (
//     <main className="max-w-md mx-auto mt-10">
//       <h1 className="text-xl font-bold mb-4">Sign Up</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="w-full border p-2"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           className="w-full border p-2"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           className="w-full border p-2"
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2">
//           Sign Up
//         </button>
//       </form>
//       {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
//     </main>
//   );
// }

// import { SignInButton } from "../ui/sign-in-button";

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
        <Link href="/register" className={styles.link}>
            Create Account
        </Link>
      </div>
    </div>
  );
}

