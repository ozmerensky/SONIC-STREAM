import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Player } from './components/Player/Player';
import { PlayerProvider } from './context/PlayerContext';
import { Home } from './pages/Home/Home';
import './App.css';
import { Search } from './pages/Search/Search';

function App() {
  return (
    <PlayerProvider>
      <Router>
        <div className="appContainer">
        <Sidebar />
        
        <div className="mainLayout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>

        <Player />
      </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;
