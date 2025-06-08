import axios from 'axios';
import type { 
  SearchResponse, 
  SearchParams, 
  HealthResponse, 
  AdminStatsResponse,
  AdminTopQueriesResponse,
  AdminForceIndexResponse
} from '../types/api';

const API_BASE_URL = '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const searchService = {
  async search(params: SearchParams): Promise<SearchResponse> {
    const response = await api.get<SearchResponse>('/search', { params });
    return response.data;
  },

  async health(): Promise<HealthResponse> {
    const response = await api.get<HealthResponse>('/health');
    return response.data;
  },

  async searchHealth(): Promise<{ search_api_healthy: boolean; timestamp: string }> {
    const response = await api.get('/search/health');
    return response.data;
  },
};

export const adminService = {
  async getStats(adminKey: string): Promise<AdminStatsResponse> {
    const response = await api.get<AdminStatsResponse>('/admin/stats', {
      headers: { 'X-Admin-Key': adminKey }
    });
    return response.data;
  },

  async getTopQueries(adminKey: string): Promise<AdminTopQueriesResponse> {
    const response = await api.get<AdminTopQueriesResponse>('/admin/top-queries', {
      headers: { 'X-Admin-Key': adminKey }
    });
    return response.data;
  },

  async forceIndex(adminKey: string): Promise<AdminForceIndexResponse> {
    const response = await api.post<AdminForceIndexResponse>('/admin/force-index', {}, {
      headers: { 'X-Admin-Key': adminKey }
    });
    return response.data;
  },
};