export interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  score: number;
  indexed_at: string;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  total_count: number;
  took_ms: number;
}

export interface SearchParams {
  q: string;
  limit?: number;
  offset?: number;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  status?: number;
}

// Admin API types
export interface SearchStatistic {
  id: string;
  query: string;
  query_normalized: string;
  result_count: number;
  search_time_ms: number;
  timestamp: string;
  user_ip: string | null;
}

export interface AdminStatsResponse {
  recent_searches: SearchStatistic[];
  total_count: number;
}

export interface TopQuery {
  query: string;
  frequency: number;
}

export interface AdminTopQueriesResponse {
  top_queries: TopQuery[];
}

export interface AdminForceIndexResponse {
  message: string;
  domains_queued: number;
  timer_reset: boolean;
}