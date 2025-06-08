import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DachshundLogo } from '../components/DachshundLogo';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import { ThemeToggle } from '../components/ThemeToggle';
import { useSearch } from '../hooks/useSearch';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RESULTS_PER_PAGE = 25;

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, loading, error, search } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);

  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    if (query) {
      const offset = (page - 1) * RESULTS_PER_PAGE;
      search({ q: query, limit: RESULTS_PER_PAGE, offset });
      setCurrentPage(page);
    }
  }, [query, page, search]);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ q: query, page: newPage.toString() });
  };

  const totalPages = data ? Math.ceil(data.total_count / RESULTS_PER_PAGE) : 0;

  if (!query) {
    navigate('/');
    return null;
  }

  return (
    <div className="search-page">
      <header className="search-header">
        <div className="header-container">
          <div className="header-left">
            <button 
              onClick={() => navigate('/')}
              className="logo-button"
              aria-label="Go to homepage"
              title="Go to homepage"
            >
              <DachshundLogo size={32} />
              <span className="logo-text">Dachshund.dev</span>
            </button>
          </div>
          <div className="header-center">
            <SearchBar
              onSearch={handleSearch}
              initialQuery={query}
              loading={loading}
              placeholder="Search..."
            />
          </div>
          <div className="header-right">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="search-main">
        <div className="search-container">
          {loading && (
            <div className="loading-indicator">
              <div className="spinner" aria-hidden="true"></div>
              <p>Searching...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <h2>Search Error</h2>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()}
                aria-label="Retry search"
              >
                Try Again
              </button>
            </div>
          )}

          {data && !loading && !error && (
            <>
              <SearchResults
                results={data.results}
                query={data.query}
                totalCount={data.total_count}
                timeTaken={data.took_ms}
              />

              {totalPages > 1 && (
                <nav className="pagination" aria-label="Search results pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="pagination-button"
                    aria-label="Go to previous page"
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                    Previous
                  </button>

                  <div className="page-numbers" role="group" aria-label="Page numbers">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = Math.max(1, currentPage - 2) + i;
                      if (pageNumber > totalPages) return null;
                      
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
                          aria-label={`Go to page ${pageNumber}`}
                          aria-current={currentPage === pageNumber ? 'page' : undefined}
                        >
                          {pageNumber}
                        </button>
                      );
                    }).filter(Boolean)}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="pagination-button"
                    aria-label="Go to next page"
                  >
                    Next
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}