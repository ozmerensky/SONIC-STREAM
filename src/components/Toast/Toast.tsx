import React from 'react';
import { usePlayer } from '../../context/PlayerContext';
import styles from './Toast.module.css';

export const Toast: React.FC = () => {
  const { toastMessage, hideToast } = usePlayer();

  if (!toastMessage) return null;

  return (
    <div 
      className={styles.toastContainer} 
      data-testid="toast-notification"
      onClick={hideToast}
      role="button"
      aria-label="Dismiss notification"
    >
      <div className={styles.toastContent}>
        {toastMessage}
      </div>
    </div>
  );
};
