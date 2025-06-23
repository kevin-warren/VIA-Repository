//import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/components/login-form';
import { Suspense } from 'react';
import styles from '@/app/ui/styles/LoginPage.module.css';

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          {/* <div className={styles.logo}>
            <AcmeLogo />
          </div> */}
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
