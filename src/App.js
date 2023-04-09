import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MovieList from './MovieList';
import Watchlist from './Watchlist';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>InfiMovies</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/watchlist">Watchlist</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
