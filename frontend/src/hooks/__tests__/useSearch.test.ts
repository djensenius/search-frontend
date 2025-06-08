import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useSearch } from '../useSearch';

// Mock the search service
vi.mock('../../utils/api', () => ({
  searchService: {
    search: vi.fn(),
    health: vi.fn(),
    searchHealth: vi.fn(),
  },
}));

describe('useSearch', () => {
  it('maintains referential equality of search function across re-renders', () => {
    const { result, rerender } = renderHook(() => useSearch());
    
    const initialSearchFunction = result.current.search;
    
    // Force a re-render
    rerender();
    
    const searchFunctionAfterRerender = result.current.search;
    
    // The search function should maintain referential equality
    expect(initialSearchFunction).toBe(searchFunctionAfterRerender);
  });

  it('maintains referential equality of clear function across re-renders', () => {
    const { result, rerender } = renderHook(() => useSearch());
    
    const initialClearFunction = result.current.clear;
    
    // Force a re-render
    rerender();
    
    const clearFunctionAfterRerender = result.current.clear;
    
    // The clear function should maintain referential equality
    expect(initialClearFunction).toBe(clearFunctionAfterRerender);
  });
});