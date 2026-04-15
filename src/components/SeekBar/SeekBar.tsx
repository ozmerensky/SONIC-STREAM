import React from 'react';
import styles from './SeekBar.module.css';

interface SeekBarProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
  label?: string;
}

export const SeekBar: React.FC<SeekBarProps> = ({ value, max, onChange, label }) => {
  return (
    <div className={styles.container}>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider}
        aria-label={label}
        data-testid="seek-bar"
      />
    </div>
  );
};
