import { useState, useEffect, useCallback } from 'react';
import type { SearchResponse, SearchParams } from '../types/api';
import { searchService } from '../utils/api';

interface UseSearchResult {
  data: SearchResponse | null;
  loading: boolean;
  error: string | null;
  search: (params: SearchParams) => Promise<void>;
  clear: () => void;
}

export function useSearch(): UseSearchResult {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (params: SearchParams) => {
    if (!params.q.trim()) {
      setError('Search query is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await searchService.search(params);
      setData(result);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
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

  return { data, loading, error, search, clear };
}

interface UseHealthResult {
  isHealthy: boolean;
  loading: boolean;
  error: string | null;
  lastChecked: Date | null;
}

export function useHealth(): UseHealthResult {
  const [isHealthy, setIsHealthy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await searchService.health();
        const searchHealth = await searchService.searchHealth();
        setIsHealthy(searchHealth.search_api_healthy);
        setError(null);
      } catch (err) {
        console.error('Health check error:', err);
        setIsHealthy(false);
        setError(err instanceof Error ? err.message : 'Health check failed');
      } finally {
        setLoading(false);
        setLastChecked(new Date());
      }
    };

    checkHealth();
    
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { isHealthy, loading, error, lastChecked };
}