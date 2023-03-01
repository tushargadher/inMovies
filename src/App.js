import './App.css';
import BottomNav from './Components/BottomNav';
import Heading from './Components/Heading';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Trending from './Components/Trending';
import Movies from './Components/Movies';
import Series from './Components/Series';
import Search from './Components/Search';
function App() {
  return (
    <>
      <Router>
        <Heading />
        <Routes>

          <Route exact path='/inMovies' element={<Trending />} />
          <Route exact path='/Movies' element={<Movies />} />
          <Route exact path='/TvSeries' element={<Series />} />
          <Route exact path='/Search' element={<Search />} />

        </Routes>
        <BottomNav />
      </Router>
    </>
  );
}

export default App;
