'use client';

import { ButtonHTMLAttributes } from 'react';
import styles from '@/app/ui/styles/Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export function Button({ className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${styles.button} ${className}`}
    />
  );
}
