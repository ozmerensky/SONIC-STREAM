import './App.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TrackCard } from './components/TrackCard/TrackCard';
import { Player } from './components/Player/Player';
import { PlayerProvider } from './context/PlayerContext';
import { Track } from './types/track';
import { useEffect, useState } from 'react';
import { trackService } from './services/trackService';
import { TrackCardSkeleton } from './components/TrackCard/TrackCardSkeleton';

function App() {
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
    <PlayerProvider>
      <div className="appContainer">
        <Sidebar />
        <main className="contentArea" data-testid="main-content">
          <h1 className="mainTitle">Sonic Stream</h1>
          <div className="trackGrid">
            {isLoading 
              ? Array.from({ length: 8 }).map((_, n) => <TrackCardSkeleton key={n} />)
              : tracks.map((track) => <TrackCard key={track.id} track={track} />)
            }
          </div>
        </main>
        <Player />
      </div>
    </PlayerProvider>
  );
}

export default App;
