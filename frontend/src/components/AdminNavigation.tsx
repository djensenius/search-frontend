import { NavLink, useLocation } from 'react-router-dom';
import { BarChart3, TrendingUp, Activity, LogOut } from 'lucide-react';
import { adminCookies } from '../utils/cookies';

interface AdminNavigationProps {
  onLogout?: () => void;
}

export function AdminNavigation({ onLogout }: AdminNavigationProps) {
  const location = useLocation();

  const handleLogout = () => {
    adminCookies.clearAdminKey();
    if (onLogout) {
      onLogout();
    }
  };

  const navItems = [
    {
      path: '/admin/stats',
      label: 'Search Statistics',
      icon: BarChart3,
      description: 'View search activity and performance metrics'
    },
    {
      path: '/admin/top-queries',
      label: 'Top Queries',
      icon: TrendingUp,
      description: 'Most popular search terms and trends'
    },
    {
      path: '/admin/system-health',
      label: 'System Health',
      icon: Activity,
      description: 'Server status and health monitoring'
    }
  ];

  return (
    <nav className="admin-navigation">
      <div className="admin-nav-header">
        <h3>Administration</h3>
        <p>Manage and monitor your search engine</p>
      </div>
      
      <div className="admin-nav-items">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${isActive ? 'active' : ''}`}
              title={item.description}
            >
              <div className="nav-item-icon">
                <Icon size={20} />
              </div>
              <div className="nav-item-content">
                <span className="nav-item-label">{item.label}</span>
                <span className="nav-item-description">{item.description}</span>
              </div>
            </NavLink>
          );
        })}
      </div>
      
      <div className="admin-nav-footer">
        <button 
          onClick={handleLogout}
          className="admin-logout-button"
          title="Sign out and clear saved credentials"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
}