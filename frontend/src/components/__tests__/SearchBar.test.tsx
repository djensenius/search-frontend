import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders with placeholder text', () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'test query');
    await user.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  it('does not call onSearch with empty query', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const submitButton = screen.getByRole('button', { name: /search/i });
    await user.click(submitButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('clears the input when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test query');

    const clearButton = screen.getByLabelText('Clear search');
    await user.click(clearButton);

    expect(input).toHaveValue('');
  });

  it('shows loading state', () => {
    render(<SearchBar onSearch={mockOnSearch} loading={true} />);
    
    expect(screen.getByText('Searching...')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('uses initial query', () => {
    render(<SearchBar onSearch={mockOnSearch} initialQuery="initial query" />);
    
    expect(screen.getByRole('textbox')).toHaveValue('initial query');
  });
});