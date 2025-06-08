import { useState, type FormEvent } from 'react';
import { Search, X } from 'lucide-react';

/**
 * Props for the SearchBar component
 */
interface SearchBarProps {
  /** Callback function called when a search is submitted */
  onSearch: (query: string) => void;
  /** Initial query value to populate the input */
  initialQuery?: string;
  /** Whether the search is currently loading */
  loading?: boolean;
  /** Placeholder text for the search input */
  placeholder?: string;
}

/**
 * A comprehensive search input component with validation, loading states, and clear functionality
 * Features auto-focus, keyboard navigation, and accessibility support
 */

export function SearchBar({ onSearch, initialQuery = '', loading = false, placeholder = 'Search...' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const clearQuery = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-container">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          disabled={loading}
          autoFocus
        />
        {query && (
          <button
            type="button"
            onClick={clearQuery}
            className="clear-button"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="search-button"
        disabled={loading || !query.trim()}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}