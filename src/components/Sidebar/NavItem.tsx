import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface NavItemProps {
  label: string;
  icon: string;
  to: string;
}

export const NavItem: React.FC<NavItemProps> = ({ label, icon, to }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
      data-testid={`nav-item-${label.toLowerCase()}`}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </NavLink>
  );
};
