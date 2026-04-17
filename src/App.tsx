import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Player } from './components/Player/Player';
import { PlayerProvider } from './context/PlayerContext';
import { Home } from './pages/Home/Home';

function App() {
  return (
    <PlayerProvider>
      <Router>
        <div className="appContainer">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<div className="contentArea">Search Page</div>} />
          </Routes>
          <Player />
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;
