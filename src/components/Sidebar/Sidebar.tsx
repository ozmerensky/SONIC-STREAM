import React from 'react';
import { NavItem } from './NavItem';
import { usePlayer } from '../../context/PlayerContext';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const { playlists, createPlaylist } = usePlayer();

  const handleCreatePlaylist = () => {
    const newName = `My Playlist #${playlists.length + 1}`;
    createPlaylist(newName);
  };

  return (
    <aside className={styles.sidebar} data-testid="sidebar">
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🎵</span>
        <h2 className={styles.logoText} data-testid="sidebar-logo">Sonic Stream</h2>
      </div>
      
      <nav className={styles.navGroup}>
        <NavItem label="Home" icon="🏠" to="/" />
        <NavItem label="Search" icon="🔍" to="/search" />
        <NavItem label="Your Library" icon="📚" to="/library" />
      </nav>

      <div className={styles.playlistSection}>
        <h3 className={styles.sectionTitle}>Playlists</h3>
        <button 
          className={styles.createButton} 
          onClick={handleCreatePlaylist}
          data-testid="create-playlist-btn"
        >
          + Create Playlist
        </button>

        <ul className={styles.playlistList}>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <Link to={`/playlist/${playlist.id}`} className={styles.playlistItem}>
                {playlist.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
