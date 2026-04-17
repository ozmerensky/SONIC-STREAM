import { useEffect, useState } from 'react';
import { trackService } from '../../services/trackService';
import { Track } from '../../types/track';
import { TrackCard } from '../../components/TrackCard/TrackCard';
import { TrackCardSkeleton } from '../../components/TrackCard/TrackCardSkeleton';
import '../../App.css';

export const Home = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const data = await trackService.getTracks();
        setTracks(data);
      } finally {
        setIsLoading(false);
      }
    };
    loadTracks();
  }, []);

  return (
    <main className="contentArea" data-testid="main-content">
      <h1 className="mainTitle">Sonic Stream</h1>
      <div className="trackGrid">
        {isLoading 
          ? Array.from({ length: 8 }).map((_, n) => <TrackCardSkeleton key={n} />)
          : tracks.map((track) => <TrackCard key={track.id} track={track} />)
        }
      </div>
    </main>
  );
};
