import './App.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TrackCard } from './components/TrackCard/TrackCard';
import { Player } from './components/Player/Player';
import tracks from './mocks/tracks.json';
import { Track } from './types/track';

function App() {
  return (
    <div className="appContainer">
      <Sidebar />
      <main className="contentArea" data-testid="main-content">
        <h1 className="mainTitle">Sonic Stream</h1>
        <div className="trackGrid">
          {tracks.map((track: Track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </main>
      <Player />
    </div>
  );
}

export default App;
