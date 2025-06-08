import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DachshundLogo } from '../components/DachshundLogo';
import { ThemeToggle } from '../components/ThemeToggle';
import { AdminNavigation } from '../components/AdminNavigation';
import { useAdminStats } from '../hooks/useAdmin';
import { adminCookies } from '../utils/cookies';
import { Clock, Search, Database, ArrowLeft } from 'lucide-react';

export function AdminStatsPage() {
  const navigate = useNavigate();
  const [adminKey, setAdminKey] = useState('');
  const [keySubmitted, setKeySubmitted] = useState(false);
  const [rememberKey, setRememberKey] = useState(true);
  const { data, loading, error, fetchStats, clear } = useAdminStats();

  // Check for saved admin key on component mount
  useEffect(() => {
    const savedKey = adminCookies.getAdminKey();
    if (savedKey) {
      setAdminKey(savedKey);
      setKeySubmitted(true);
      fetchStats(savedKey);
    }
  }, [fetchStats]);

  const handleKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.trim()) {
      // Save admin key to cookie if remember is checked
      if (rememberKey) {
        adminCookies.saveAdminKey(adminKey.trim(), true);
      }
      
      setKeySubmitted(true);
      await fetchStats(adminKey.trim());
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (ms: number) => {
    return `${ms}ms`;
  };

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
            <h1 className="admin-title">Admin - Search Statistics</h1>
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
                <p>Enter your admin API key to access search statistics.</p>
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
                    Access Admin Stats
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
                    <p>Loading search statistics...</p>
                  </div>
                )}

                {data && (
                  <div className="admin-content">
                    <div className="stats-summary">
                      <div className="stat-card">
                        <div className="stat-icon">
                          <Database size={24} />
                        </div>
                        <div className="stat-content">
                          <div className="stat-value">{data.total_count.toLocaleString()}</div>
                          <div className="stat-label">Total Searches</div>
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-icon">
                          <Search size={24} />
                        </div>
                        <div className="stat-content">
                          <div className="stat-value">{data.recent_searches.length}</div>
                          <div className="stat-label">Recent Searches</div>
                        </div>
                      </div>
                    </div>

                    <div className="recent-searches">
                      <h2>Recent Search Activity</h2>
                      {data.recent_searches.length > 0 ? (
                        <div className="searches-list">
                          {data.recent_searches.map((search) => (
                            <div key={search.id} className="search-item">
                              <div className="search-header">
                                <div className="search-query">
                                  <Search size={16} />
                                  <span className="query-text">{search.query}</span>
                                </div>
                                <div className="search-meta">
                                  <span className="result-count">
                                    {search.result_count} results
                                  </span>
                                  <span className="search-time">
                                    <Clock size={14} />
                                    {formatDuration(search.search_time_ms)}
                                  </span>
                                </div>
                              </div>
                              <div className="search-footer">
                                <span className="search-timestamp">
                                  {formatDate(search.timestamp)}
                                </span>
                                {search.user_ip && (
                                  <span className="search-ip">
                                    IP: {search.user_ip}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-data">
                          <p>No recent searches found.</p>
                        </div>
                      )}
                    </div>

                    <div className="admin-actions">
                      <button 
                        onClick={() => fetchStats(adminKey)} 
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