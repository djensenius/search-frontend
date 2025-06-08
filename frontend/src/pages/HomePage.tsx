import { useNavigate } from 'react-router-dom';
import { DachshundLogo } from '../components/DachshundLogo';
import { SearchBar } from '../components/SearchBar';
import { ThemeToggle } from '../components/ThemeToggle';
import { useHealth } from '../hooks/useSearch';

export function HomePage() {
  const navigate = useNavigate();
  const { isHealthy, loading: healthLoading } = useHealth();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-header">
          <DachshundLogo size={120} className="home-logo" />
          <h1 className="home-title">Dachshund.dev</h1>
          <p className="home-subtitle">
            OMG I DID THIS!
          </p>
        </div>

        <div className="home-search">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search some coding doc sites..."
          />
        </div>

        <div className="home-actions">
          {!healthLoading && (
            <div className={`status-indicator ${isHealthy ? 'healthy' : 'unhealthy'}`}>
              <span className="status-dot" aria-hidden="true"></span>
              {isHealthy ? 'Search service online' : 'Search service unavailable'}
            </div>
          )}
          <ThemeToggle />
        </div>

        <footer className="home-footer">
          <p>Built with ❤️ by David</p>
        </footer>
      </div>
    </div>
  );
}
