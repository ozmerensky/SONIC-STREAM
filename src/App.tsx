import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Player } from './components/Player/Player';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { Home } from './pages/Home/Home';
import { Search } from './pages/Search/Search';
import { Library } from './pages/Library/Library';
import './App.css';
import { PlaylistDetails } from './pages/PlaylistDetalis/PlaylistDetails';
import { Toast } from './components/Toast/Toast';

const AppContent = () => {
  const { currentTrack } = usePlayer();
  return (
    <Router>
      <div className="appContainer">
        <Sidebar />
        
        <div className="mainLayout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/playlist/:id" element={<PlaylistDetails />} />
          </Routes>
        </div>
        {currentTrack && <Player />}
        <Toast />
      </div>
    </Router>
  );
};

function App() {
  return (
    <PlayerProvider>
      <AppContent />
    </PlayerProvider>
  );
}

export default App;
