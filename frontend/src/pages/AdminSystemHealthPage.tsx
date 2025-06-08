import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DachshundLogo } from '../components/DachshundLogo';
import { ThemeToggle } from '../components/ThemeToggle';
import { AdminNavigation } from '../components/AdminNavigation';
import { useAdminSystem } from '../hooks/useAdmin';
import { adminCookies } from '../utils/cookies';
import { 
  Activity, 
  Server, 
  Database, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock,
  ArrowLeft,
  Play
} from 'lucide-react';

export function AdminSystemHealthPage() {
  const navigate = useNavigate();
  const [adminKey, setAdminKey] = useState('');
  const [keySubmitted, setKeySubmitted] = useState(false);
  const [rememberKey, setRememberKey] = useState(true);
  const { 
    healthData, 
    indexData,
    healthLoading, 
    indexLoading,
    healthError, 
    indexError,
    forceIndex, 
    refreshHealth, 
    clear 
  } = useAdminSystem();

  // Check for saved admin key on component mount
  useEffect(() => {
    const savedKey = adminCookies.getAdminKey();
    if (savedKey) {
      setAdminKey(savedKey);
      setKeySubmitted(true);
      refreshHealth();
    }
  }, [refreshHealth]);

  const handleKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.trim()) {
      // Save admin key to cookie if remember is checked
      if (rememberKey) {
        adminCookies.saveAdminKey(adminKey.trim(), true);
      }
      
      setKeySubmitted(true);
      await refreshHealth();
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

  const handleForceIndex = async () => {
    if (adminKey.trim()) {
      await forceIndex(adminKey.trim());
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  useEffect(() => {
    if (keySubmitted && !healthData) {
      refreshHealth();
    }
  }, [keySubmitted, healthData, refreshHealth]);

  const getStatusIcon = (isHealthy: boolean) => {
    return isHealthy ? (
      <CheckCircle className="status-icon healthy" size={20} />
    ) : (
      <XCircle className="status-icon unhealthy" size={20} />
    );
  };

  const getStatusText = (isHealthy: boolean) => {
    return isHealthy ? 'Healthy' : 'Unhealthy';
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
            <h1 className="admin-title">Admin - System Health</h1>
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
                <p>Enter your admin API key to access system health information.</p>
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
                    Access System Health
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
                {healthError && (
                  <div className="admin-error">
                    <p>{healthError}</p>
                    <button onClick={() => { setKeySubmitted(false); clear(); }} className="retry-button">
                      Try Again
                    </button>
                  </div>
                )}

                {healthLoading && (
                  <div className="admin-loading">
                    <div className="spinner" aria-hidden="true"></div>
                    <p>Checking system health...</p>
                  </div>
                )}

                {healthData && (
                  <div className="admin-content">
                  <div className="health-summary">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Activity size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">
                          {healthData.basic?.status === 'healthy' && healthData.search?.search_api_healthy ? 'All Systems' : 'Issues Detected'}
                        </div>
                        <div className="stat-label">System Status</div>
                      </div>
                    </div>
                  </div>

                  <div className="health-details">
                    <h2>Service Health Status</h2>
                    
                    <div className="health-services">
                      {/* Basic Health */}
                      <div className="service-item">
                        <div className="service-header">
                          <div className="service-info">
                            <Server size={20} />
                            <span className="service-name">Backend API</span>
                          </div>
                          <div className="service-status">
                            {getStatusIcon(healthData.basic?.status === 'healthy')}
                            <span className={`status-text ${healthData.basic?.status === 'healthy' ? 'healthy' : 'unhealthy'}`}>
                              {getStatusText(healthData.basic?.status === 'healthy')}
                            </span>
                          </div>
                        </div>
                        <div className="service-details">
                          <div className="detail-item">
                            <span className="detail-label">Service:</span>
                            <span className="detail-value">{healthData.basic?.service || 'Unknown'}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Last Check:</span>
                            <span className="detail-value">
                              <Clock size={14} />
                              {healthData.basic?.timestamp ? formatDate(healthData.basic.timestamp) : 'Unknown'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Search Health */}
                      <div className="service-item">
                        <div className="service-header">
                          <div className="service-info">
                            <Database size={20} />
                            <span className="service-name">Search API</span>
                          </div>
                          <div className="service-status">
                            {getStatusIcon(healthData.search?.search_api_healthy)}
                            <span className={`status-text ${healthData.search?.search_api_healthy ? 'healthy' : 'unhealthy'}`}>
                              {getStatusText(healthData.search?.search_api_healthy)}
                            </span>
                          </div>
                        </div>
                        <div className="service-details">
                          <div className="detail-item">
                            <span className="detail-label">API Status:</span>
                            <span className="detail-value">
                              {healthData.search?.search_api_healthy ? 'Operational' : 'Down'}
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Last Check:</span>
                            <span className="detail-value">
                              <Clock size={14} />
                              {healthData.search?.timestamp ? formatDate(healthData.search.timestamp) : 'Unknown'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div className="admin-actions">
                    <div className="action-section">
                      <h3>System Administration</h3>
                      <div className="action-buttons">
                        <button 
                          onClick={refreshHealth} 
                          className="action-button refresh"
                          disabled={healthLoading}
                        >
                          <RefreshCw size={16} />
                          Refresh Health Status
                        </button>
                        
                        <button 
                          onClick={handleForceIndex} 
                          className="action-button index"
                          disabled={indexLoading || !adminKey.trim()}
                        >
                          <Play size={16} />
                          {indexLoading ? 'Starting Indexing...' : 'Force Start Indexing'}
                        </button>
                      </div>
                    </div>

                    {indexError && (
                      <div className="action-error">
                        <p>{indexError}</p>
                      </div>
                    )}

                    {indexData && (
                      <div className="action-result">
                        <h4>Indexing Result:</h4>
                        <p>{indexData.message}</p>
                        <div className="index-details">
                          <span>Domains Queued: {indexData.domains_queued}</span>
                          <span>Timer Reset: {indexData.timer_reset ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                    )}
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