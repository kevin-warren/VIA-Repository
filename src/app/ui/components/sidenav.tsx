import NavLinks from './nav-links';
import styles from '@/app/ui/styles/SideNav.module.css';

export default function SideNav() {
  return (
    <div className={styles.sideNav}>
      <div className={styles.navContainer}>
        <NavLinks />
      </div>
    </div>
  );
}
