import React from 'react';
import { Track } from '../../types/track';
import { TrackCard } from '../TrackCard/TrackCard';
import { TrackCardSkeleton } from '../TrackCard/TrackCardSkeleton';
import styles from './TrackGrid.module.css';

interface TrackGridProps {
  tracks: Track[];
  isLoading: boolean;
  emptyMessage?: string;
}

export const TrackGrid: React.FC<TrackGridProps> = ({ 
  tracks, 
  isLoading, 
  emptyMessage = "No tracks found." 
}) => {
  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, n) => <TrackCardSkeleton key={n} />)}
      </div>
    );
  }

  if (tracks.length === 0) {
    return <p className={styles.noResults}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.grid}>
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  );
};
