import styles from './Button.module.css';

export default function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
