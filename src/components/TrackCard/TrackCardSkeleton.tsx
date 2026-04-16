import React from 'react';
import styles from './TrackCardSkeleton.module.css';

export const TrackCardSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonInfo}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonArtist} />
      </div>
    </div>
  );
};
