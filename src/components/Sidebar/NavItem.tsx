import React from 'react';
import styles from './Sidebar.module.css';

interface NavItemProps {
  label: string;
  icon: string;
  isActive?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ label, icon, isActive }) => {
  return (
    <div className={`${styles.navItem} ${isActive ? styles.active : ''}`} data-testid={`nav-item-${label.toLowerCase()}`}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};
