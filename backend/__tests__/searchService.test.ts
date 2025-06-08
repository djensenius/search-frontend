import { SearchService } from '../src/services/searchService';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SearchService', () => {
  let searchService: SearchService;

  beforeEach(() => {
    searchService = new SearchService();
    jest.clearAllMocks();
  });

  describe('search', () => {
    it('should return search results', async () => {
      const mockResponse = {
        data: {
          query: 'test',
          results: [],
          total_count: 0,
          took_ms: 100
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await searchService.search({ q: 'test' });

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:3000/search',
        expect.objectContaining({
          params: expect.any(URLSearchParams),
          timeout: 10000
        })
      );
    });

    it('should handle API errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(searchService.search({ q: 'test' })).rejects.toThrow('Failed to perform search');
    });

    it('should handle HTTP errors', async () => {
      const error = {
        response: {
          status: 500,
          statusText: 'Internal Server Error'
        }
      };

      mockedAxios.isAxiosError.mockReturnValue(true);
      mockedAxios.get.mockRejectedValue(error);

      await expect(searchService.search({ q: 'test' })).rejects.toThrow('Search API returned 500: Internal Server Error');
    });
  });

  describe('healthCheck', () => {
    it('should return true for successful health check', async () => {
      mockedAxios.get.mockResolvedValue({ status: 200 });

      const result = await searchService.healthCheck();

      expect(result).toBe(true);
    });

    it('should return false for failed health check', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      const result = await searchService.healthCheck();

      expect(result).toBe(false);
    });
  });
});
