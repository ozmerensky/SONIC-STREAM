import React from 'react';
import { NavItem } from './NavItem';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar} data-testid="sidebar">
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🎵</span>
        <h2 className={styles.logoText} data-testid="sidebar-logo">Sonic Stream</h2>
      </div>
      
      <nav className={styles.navGroup}>
        <NavItem label="Home" icon="🏠" isActive />
        <NavItem label="Search" icon="🔍" />
        <NavItem label="Your Library" icon="📚" />
      </nav>

      <div className={styles.playlistSection}>
        <h3 className={styles.sectionTitle}>Playlists</h3>
        <button className={styles.createButton}>+ Create Playlist</button>
      </div>
    </aside>
  );
};
