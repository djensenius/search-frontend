import axios from 'axios';
import { 
  SearchResponse, 
  SearchQuery, 
  IndexRequest, 
  IndexResponse,
  AdminStatsResponse,
  AdminTopQueriesResponse,
  AdminForceIndexResponse
} from '../types/api';

/**
 * Service class for interacting with the Search API
 * Provides methods for search, health checks, and administrative functions
 */
export class SearchService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.SEARCH_API_URL || 'http://localhost:3000';
  }

  /**
   * Perform a search query using the Search API
   * @param query - Search parameters including query string, limit, and offset
   * @returns Promise resolving to search results
   * @throws Error when the API request fails or returns an error
   */
  async search(query: SearchQuery): Promise<SearchResponse> {
    try {
      const params = new URLSearchParams();
      params.append('q', query.q);
      
      if (query.limit) {
        params.append('limit', query.limit.toString());
      }
      
      if (query.offset) {
        params.append('offset', query.offset.toString());
      }

      const response = await axios.get<SearchResponse>(`${this.baseUrl}/search`, {
        params: params,
        timeout: 10000, // 10 second timeout
      });

      return response.data;
    } catch (error) {
      console.error('Search API error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(`Search API returned ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
          throw new Error('Unable to connect to Search API');
        }
      }
      
      throw new Error('Failed to perform search');
    }
  }

  /**
   * Check the health status of the Search API
   * @returns Promise resolving to true if the API is healthy, false otherwise
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/health`, {
        timeout: 5000
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  /**
   * Submit domains for indexing by the Search API
   * @param indexRequest - Request containing array of domains to index
   * @returns Promise resolving to indexing response
   * @throws Error when the indexing request fails
   */
  async indexDomains(indexRequest: IndexRequest): Promise<IndexResponse> {
    try {
      const response = await axios.post<IndexResponse>(`${this.baseUrl}/index`, indexRequest, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Search indexing API error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(`Search API returned ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
          throw new Error('Unable to connect to Search API');
        }
      }
      
      throw new Error('Failed to queue domains for indexing');
    }
  }

  /**
   * Force start the indexing process (admin-only functionality)
   * @returns Promise resolving to force index response
   * @throws Error when the force index request fails
   */
  async forceIndex(): Promise<AdminForceIndexResponse> {
    try {
      const response = await axios.post<AdminForceIndexResponse>(`${this.baseUrl}/admin/force-index`, {}, {
        timeout: 10000,
        headers: {
          'X-Admin-Key': process.env.ADMIN_API_KEY || ''
        }
      });

      return response.data;
    } catch (error) {
      console.error('Search force index API error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(`Search API returned ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
          throw new Error('Unable to connect to Search API');
        }
      }
      
      throw new Error('Failed to force indexing');
    }
  }

  /**
   * Get search statistics from the Search API (admin-only functionality)
   * @returns Promise resolving to admin statistics response
   * @throws Error when the statistics request fails
   */
  async getStats(): Promise<AdminStatsResponse> {
    try {
      const response = await axios.get<AdminStatsResponse>(`${this.baseUrl}/admin/stats`, {
        timeout: 10000,
        headers: {
          'X-Admin-Key': process.env.ADMIN_API_KEY || ''
        }
      });

      return response.data;
    } catch (error) {
      console.error('Search stats API error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(`Search API returned ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
          throw new Error('Unable to connect to Search API');
        }
      }
      
      throw new Error('Failed to get statistics');
    }
  }

  /**
   * Get top search queries from the Search API (admin-only functionality)
   * @returns Promise resolving to top queries response
   * @throws Error when the top queries request fails
   */
  async getTopQueries(): Promise<AdminTopQueriesResponse> {
    try {
      const response = await axios.get<AdminTopQueriesResponse>(`${this.baseUrl}/admin/top-queries`, {
        timeout: 10000,
        headers: {
          'X-Admin-Key': process.env.ADMIN_API_KEY || ''
        }
      });

      return response.data;
    } catch (error) {
      console.error('Search top queries API error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(`Search API returned ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
          throw new Error('Unable to connect to Search API');
        }
      }
      
      throw new Error('Failed to get top queries');
    }
  }
}