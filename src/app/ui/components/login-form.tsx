'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import styles from '@/app/ui/styles/LoginForm.module.css';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.formContainer}>
        <h1 className={`${lusitana.className} ${styles.heading}`}>
          Please log in to continue.
        </h1>

        <div>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
            <AtSymbolIcon className={styles.icon} />
          </div>
        </div>

        <div className="mt-4">
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
            <KeyIcon className={styles.icon} />
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <Button aria-disabled={isPending}>
            Log in <ArrowRightIcon className={styles.icon} />
        </Button>


        <div
            className={styles.errorContainer}
            aria-live="polite"
            aria-atomic="true"
            >
            {errorMessage && (
                <>
                <ExclamationCircleIcon className={styles.errorIcon} />
                <p className={styles.errorText}>{errorMessage}</p>
                </>
            )}
        </div>
      </div>
    </form>
  );
}
