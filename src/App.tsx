import './App.css';
import { TrackCard } from './components/TrackCard/TrackCard';
import tracks from './mocks/tracks.json';
import { Track } from './types/track';

function App() {
  return (
    <div className="appContainer">
      <h1 className="mainTitle">Sonic Stream</h1>
      
      <div className="trackGrid">
        {tracks.map((track: Track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}

export default App;