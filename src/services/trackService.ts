import tracksData from '../mocks/tracks.json';
import { Track } from '../types/track';

export const trackService = {
  getTracks: async (): Promise<Track[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(tracksData as Track[]);
      }, 1200);
    });
  }
};