import { v4 as uuidv4 } from 'uuid';
import { SearchStatistic, AdminStatsResponse, TopQuery, AdminTopQueriesResponse } from '../types/api';

/**
 * Service for collecting and managing search statistics
 * Uses in-memory storage for simplicity - could be replaced with a database
 */
export class StatsService {
  private searchStats: SearchStatistic[] = [];
  private maxStoredStats = 1000; // Limit memory usage

  /**
   * Record a search operation
   */
  recordSearch(params: {
    query: string;
    queryNormalized: string;
    resultCount: number;
    searchTimeMs: number;
    userIp?: string;
  }): void {
    const stat: SearchStatistic = {
      id: uuidv4(),
      query: params.query,
      query_normalized: params.queryNormalized,
      result_count: params.resultCount,
      search_time_ms: params.searchTimeMs,
      timestamp: new Date().toISOString(),
      user_ip: params.userIp || null
    };

    this.searchStats.unshift(stat); // Add to beginning

    // Keep only the most recent stats to prevent memory issues
    if (this.searchStats.length > this.maxStoredStats) {
      this.searchStats = this.searchStats.slice(0, this.maxStoredStats);
    }
  }

  /**
   * Get comprehensive search statistics
   */
  getStats(): AdminStatsResponse {
    return {
      recent_searches: this.searchStats.slice(0, 50), // Last 50 searches
      total_count: this.searchStats.length
    };
  }

  /**
   * Get top search queries with frequency counts
   */
  getTopQueries(): AdminTopQueriesResponse {
    // Count query frequencies
    const queryFrequency = new Map<string, number>();
    
    this.searchStats.forEach(stat => {
      const normalizedQuery = stat.query_normalized.toLowerCase();
      queryFrequency.set(normalizedQuery, (queryFrequency.get(normalizedQuery) || 0) + 1);
    });

    // Convert to array and sort by frequency
    const topQueries: TopQuery[] = Array.from(queryFrequency.entries())
      .map(([query, frequency]) => ({ query, frequency }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 20); // Top 20 queries

    return { top_queries: topQueries };
  }

  /**
   * Clear all statistics (for testing or admin maintenance)
   */
  clearStats(): void {
    this.searchStats = [];
  }

  /**
   * Get current stats count
   */
  getStatsCount(): number {
    return this.searchStats.length;
  }
}

// Export singleton instance
export const statsService = new StatsService();