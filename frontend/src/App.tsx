import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { AdminStatsPage } from './pages/AdminStatsPage';
import { AdminTopQueriesPage } from './pages/AdminTopQueriesPage';
import { AdminSystemHealthPage } from './pages/AdminSystemHealthPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/admin/stats" element={<AdminStatsPage />} />
            <Route path="/admin/top-queries" element={<AdminTopQueriesPage />} />
            <Route path="/admin/system-health" element={<AdminSystemHealthPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
