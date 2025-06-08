import { useState, useCallback } from 'react';
import type { 
  AdminStatsResponse, 
  AdminTopQueriesResponse,
  AdminForceIndexResponse,
  HealthResponse
} from '../types/api';
import { adminService } from '../utils/api';

interface HealthData {
  basic: HealthResponse;
  search: { search_api_healthy: boolean; timestamp: string };
}

interface UseAdminStatsResult {
  data: AdminStatsResponse | null;
  loading: boolean;
  error: string | null;
  fetchStats: (adminKey: string) => Promise<void>;
  clear: () => void;
}

export function useAdminStats(): UseAdminStatsResult {
  const [data, setData] = useState<AdminStatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (adminKey: string) => {
    if (!adminKey.trim()) {
      setError('Admin API key is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await adminService.getStats(adminKey);
      setData(result);
    } catch (err) {
      console.error('Admin stats error:', err);
      if (err instanceof Error && err.message.includes('401')) {
        setError('Unauthorized: Invalid admin API key');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to fetch admin stats');
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, fetchStats, clear };
}

interface UseAdminTopQueriesResult {
  data: AdminTopQueriesResponse | null;
  loading: boolean;
  error: string | null;
  fetchTopQueries: (adminKey: string) => Promise<void>;
  clear: () => void;
}

export function useAdminTopQueries(): UseAdminTopQueriesResult {
  const [data, setData] = useState<AdminTopQueriesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopQueries = useCallback(async (adminKey: string) => {
    if (!adminKey.trim()) {
      setError('Admin API key is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await adminService.getTopQueries(adminKey);
      setData(result);
    } catch (err) {
      console.error('Admin top queries error:', err);
      if (err instanceof Error && err.message.includes('401')) {
        setError('Unauthorized: Invalid admin API key');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to fetch top queries');
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, fetchTopQueries, clear };
}

interface UseAdminSystemResult {
  healthData: HealthData | null;
  indexData: AdminForceIndexResponse | null;
  healthLoading: boolean;
  indexLoading: boolean;
  healthError: string | null;
  indexError: string | null;
  forceIndex: (adminKey: string) => Promise<void>;
  refreshHealth: () => Promise<void>;
  clear: () => void;
}

export function useAdminSystem(): UseAdminSystemResult {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [indexData, setIndexData] = useState<AdminForceIndexResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [indexLoading, setIndexLoading] = useState(false);
  const [healthError, setHealthError] = useState<string | null>(null);
  const [indexError, setIndexError] = useState<string | null>(null);

  const forceIndex = useCallback(async (adminKey: string) => {
    if (!adminKey.trim()) {
      setIndexError('Admin API key is required');
      return;
    }

    setIndexLoading(true);
    setIndexError(null);

    try {
      const result = await adminService.forceIndex(adminKey);
      setIndexData(result);
    } catch (err) {
      console.error('Force index error:', err);
      if (err instanceof Error && err.message.includes('401')) {
        setIndexError('Unauthorized: Invalid admin API key');
      } else {
        setIndexError(err instanceof Error ? err.message : 'Failed to force index');
      }
    } finally {
      setIndexLoading(false);
    }
  }, []);

  const refreshHealth = useCallback(async () => {
    setHealthLoading(true);
    setHealthError(null);

    try {
      // Get basic health and search health
      const [basicHealth, searchHealth] = await Promise.all([
        fetch('/api/health').then(r => r.json()),
        fetch('/api/search/health').then(r => r.json())
      ]);
      
      setHealthData({
        basic: basicHealth,
        search: searchHealth
      });
    } catch (err) {
      console.error('Health check error:', err);
      setHealthError(err instanceof Error ? err.message : 'Failed to check system health');
    } finally {
      setHealthLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setHealthData(null);
    setIndexData(null);
    setHealthError(null);
    setIndexError(null);
    setHealthLoading(false);
    setIndexLoading(false);
  }, []);

  return { 
    healthData, 
    indexData, 
    healthLoading, 
    indexLoading, 
    healthError, 
    indexError, 
    forceIndex, 
    refreshHealth, 
    clear 
  };
}