import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DachshundLogo } from '../components/DachshundLogo';
import { ThemeToggle } from '../components/ThemeToggle';
import { AdminNavigation } from '../components/AdminNavigation';
import { useAdminTopQueries } from '../hooks/useAdmin';
import { adminCookies } from '../utils/cookies';
import { TrendingUp, Search, Hash, ArrowLeft } from 'lucide-react';

export function AdminTopQueriesPage() {
  const navigate = useNavigate();
  const [adminKey, setAdminKey] = useState('');
  const [keySubmitted, setKeySubmitted] = useState(false);
  const [rememberKey, setRememberKey] = useState(true);
  const { data, loading, error, fetchTopQueries, clear } = useAdminTopQueries();

  // Check for saved admin key on component mount
  useEffect(() => {
    const savedKey = adminCookies.getAdminKey();
    if (savedKey) {
      setAdminKey(savedKey);
      setKeySubmitted(true);
      fetchTopQueries(savedKey);
    }
  }, [fetchTopQueries]);

  const handleKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.trim()) {
      // Save admin key to cookie if remember is checked
      if (rememberKey) {
        adminCookies.saveAdminKey(adminKey.trim(), true);
      }
      
      setKeySubmitted(true);
      await fetchTopQueries(adminKey.trim());
    }
  };

  const handleLogout = () => {
    adminCookies.clearAdminKey();
    setKeySubmitted(false);
    setAdminKey('');
    clear();
  };

  const handleBack = () => {
    navigate('/');
  };

  const getPopularityLevel = (frequency: number, maxFrequency: number) => {
    const percentage = (frequency / maxFrequency) * 100;
    if (percentage >= 80) return 'very-high';
    if (percentage >= 60) return 'high';
    if (percentage >= 40) return 'medium';
    if (percentage >= 20) return 'low';
    return 'very-low';
  };

  const maxFrequency = data?.top_queries && data.top_queries.length > 0 
    ? Math.max(...data.top_queries.map(q => q.frequency))
    : 0;

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="header-container">
          <div className="header-left">
            <button 
              onClick={handleBack}
              className="back-button"
              aria-label="Go back to homepage"
              title="Go back to homepage"
            >
              <ArrowLeft size={20} />
              <DachshundLogo size={32} />
              <span className="logo-text">Dachshund.dev</span>
            </button>
          </div>
          <div className="header-center">
            <h1 className="admin-title">Admin - Top Search Queries</h1>
          </div>
          <div className="header-right">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-container">
          {!keySubmitted ? (
            <div className="admin-auth">
              <div className="auth-card">
                <h2>Admin Authentication Required</h2>
                <p>Enter your admin API key to access top search queries.</p>
                <form onSubmit={handleKeySubmit} className="auth-form">
                  <div className="input-group">
                    <label htmlFor="admin-key">Admin API Key:</label>
                    <input
                      id="admin-key"
                      type="password"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      placeholder="Enter admin API key..."
                      className="admin-input"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={rememberKey}
                        onChange={(e) => setRememberKey(e.target.checked)}
                      />
                      <span>Remember me for 7 days</span>
                    </label>
                  </div>
                  <button type="submit" className="auth-button" disabled={!adminKey.trim()}>
                    Access Top Queries
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="admin-with-nav">
              <aside className="admin-nav-sidebar">
                <AdminNavigation onLogout={handleLogout} />
              </aside>
              <div className="admin-main-content">
                {error && (
                  <div className="admin-error">
                    <p>{error}</p>
                    <button onClick={() => { setKeySubmitted(false); clear(); }} className="retry-button">
                      Try Again
                    </button>
                  </div>
                )}

                {loading && (
                  <div className="admin-loading">
                    <div className="spinner" aria-hidden="true"></div>
                    <p>Loading top search queries...</p>
                  </div>
                )}

                {data && (
                <div className="admin-content">
                  <div className="queries-summary">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <TrendingUp size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{data.top_queries.length}</div>
                        <div className="stat-label">Top Queries</div>
                      </div>
                    </div>
                    {data.top_queries.length > 0 && (
                      <div className="stat-card">
                        <div className="stat-icon">
                          <Hash size={24} />
                        </div>
                        <div className="stat-content">
                          <div className="stat-value">{data.top_queries[0].frequency}</div>
                          <div className="stat-label">Most Popular</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="top-queries">
                    <h2>Most Popular Search Queries</h2>
                    {data.top_queries.length > 0 ? (
                      <div className="queries-list">
                        {data.top_queries.map((query, index) => (
                          <div key={`${query.query}-${index}`} className="query-item">
                            <div className="query-rank">
                              <span className="rank-number">#{index + 1}</span>
                            </div>
                            <div className="query-content">
                              <div className="query-header">
                                <div className="query-text">
                                  <Search size={16} />
                                  <span>{query.query}</span>
                                </div>
                                <div className="query-frequency">
                                  <span className="frequency-count">
                                    {query.frequency.toLocaleString()} searches
                                  </span>
                                </div>
                              </div>
                              <div className="query-popularity">
                                <div className="popularity-bar">
                                  <div 
                                    className={`popularity-fill ${getPopularityLevel(query.frequency, maxFrequency)}`}
                                    style={{ 
                                      width: `${(query.frequency / maxFrequency) * 100}%` 
                                    }}
                                  ></div>
                                </div>
                                <span className="popularity-label">
                                  {Math.round((query.frequency / maxFrequency) * 100)}% of top query
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-data">
                        <p>No search queries found.</p>
                      </div>
                    )}
                  </div>

                  <div className="admin-actions">
                    <button 
                      onClick={() => fetchTopQueries(adminKey)} 
                      className="refresh-button"
                      disabled={loading}
                    >
                      Refresh Data
                    </button>
                  </div>
                </div>
              )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}