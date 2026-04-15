import React, { useState } from 'react';
import { SeekBar } from '../SeekBar/SeekBar';
import { usePlayer } from '../../context/PlayerContext';
import styles from './Player.module.css';

export const Player: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay } = usePlayer();
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);

  return (
    <footer className={styles.playerBar} data-testid="player-bar">
      <div className={styles.trackInfo} data-testid="player-track-info">
        {currentTrack ? (
          <img 
            src={currentTrack.albumCover} 
            alt="" 
            className={styles.albumCoverSmall}
          />
        ) : (
          <div className={styles.albumPlaceholder}></div>
        )}
        
        <div className={styles.textContainer}>
          <div className={styles.title}>
            {currentTrack?.title || "Select a track"}
          </div>
          <div className={styles.artist}>
            {currentTrack?.artist || "to start listening"}
          </div>
        </div>
      </div>

      <div className={styles.controlsContainer}>
        <div className={styles.buttons}>
          <button className={styles.controlBtn} aria-label="Shuffle">🔀</button>
          <button className={styles.controlBtn} aria-label="Previous">⏮</button>
          
          <button 
            className={styles.playBtn} 
            data-testid="main-play-btn" 
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlay}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          <button className={styles.controlBtn} aria-label="Next">⏭</button>
          <button className={styles.controlBtn} aria-label="Repeat">🔁</button>
        </div>
        
        <div className={styles.progressBar}>
          <span className={styles.time}>0:00</span>
          <SeekBar value={progress} max={100} onChange={setProgress} label="Music progress" />
          <span className={styles.time}>{currentTrack?.duration || "0:00"}</span>
        </div>
      </div>

      <div className={styles.volumeContainer}>
        <span className={styles.volumeIcon}>🔊</span>
        <div className={styles.volumeSlider}>
          <SeekBar value={volume} max={100} onChange={setVolume} label="Volume control" />
        </div>
      </div>
    </footer>
  );
};
