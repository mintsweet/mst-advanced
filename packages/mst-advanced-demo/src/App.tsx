import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { HomePage, QueryPage, ListPage } from './pages';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/query">Query Demo</Link>
            </li>
            <li>
              <Link to="/list">List Demo</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/query" element={<QueryPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
