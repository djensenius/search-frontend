import type { SearchResult as SearchResultType } from '../types/api';
import { ExternalLink, Clock } from 'lucide-react';

interface SearchResultProps {
  result: SearchResultType;
}

export function SearchResult({ result }: SearchResultProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const formatScore = (score: number) => {
    return Math.round(score * 100);
  };

  return (
    <article className="search-result">
      <div className="result-header">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="result-title"
          aria-label={`${result.title} (opens in new tab)`}
        >
          {result.title}
          <ExternalLink size={14} className="external-link-icon" aria-hidden="true" />
        </a>
        <div 
          className="result-score" 
          title={`Relevance score: ${formatScore(result.score)}%`}
          aria-label={`Relevance score: ${formatScore(result.score)} percent`}
        >
          {formatScore(result.score)}%
        </div>
      </div>
      
      <div className="result-url" aria-label="URL">
        {result.url}
      </div>
      
      <div 
        className="result-snippet" 
        dangerouslySetInnerHTML={{ __html: result.snippet }}
        aria-label="Search result excerpt"
      />
      
      <div className="result-meta">
        <span className="indexed-date">
          <Clock size={12} aria-hidden="true" />
          <span aria-label="Indexed date">Indexed: {formatDate(result.indexed_at)}</span>
        </span>
      </div>
    </article>
  );
}

interface SearchResultsProps {
  results: SearchResultType[];
  query: string;
  totalCount: number;
  timeTaken: number;
}

export function SearchResults({ results, query, totalCount, timeTaken }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="no-results" role="status" aria-live="polite">
        <p>No results found for "{query}"</p>
        <p>Try different keywords or check your spelling.</p>
      </div>
    );
  }

  return (
    <section className="search-results" aria-label="Search results">
      <div className="results-info" role="status" aria-live="polite">
        About {totalCount.toLocaleString()} results ({timeTaken}ms)
      </div>
      
      <div className="results-list" role="list">
        {results.map((result) => (
          <div key={result.id} role="listitem">
            <SearchResult result={result} />
          </div>
        ))}
      </div>
    </section>
  );
}