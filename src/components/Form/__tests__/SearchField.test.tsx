import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchField from '../SearchField';
import SearchResult from '../SearchResult';

describe('SearchField', () => {
  const mockOnChange = jest.fn();
  const mockRenderSearchResults = jest.fn();

  beforeEach(() => {
    mockRenderSearchResults.mockImplementation(() => {
      return [<SearchResult onClick={jest.fn()} key="1" />];
    });
  });

  it('should render successfully', async () => {
    render(<SearchField onChange={mockOnChange} renderSearchResults={mockRenderSearchResults} />);
    await screen.findByTestId('field-search');

    expect(screen.getByTestId('field-search')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(
      <SearchField
        onChange={mockOnChange}
        renderSearchResults={mockRenderSearchResults}
        testId="custom-testId"
      />,
    );
    await screen.findByTestId('custom-testId');

    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    render(
      <SearchField
        className="custom-className"
        onChange={mockOnChange}
        renderSearchResults={mockRenderSearchResults}
      />,
    );
    await screen.findByTestId('field-search');

    expect(screen.getByTestId('field-search').classList).toContain('custom-className');
  });

  it('should display supporting text', async () => {
    render(
      <SearchField
        supportingText="supporting"
        onChange={mockOnChange}
        renderSearchResults={mockRenderSearchResults}
      />,
    );
    await screen.findByTestId('field-search-supporting-text');

    expect(screen.getByTestId('field-search-supporting-text')).toHaveTextContent('supporting');
  });

  it('should display error text', async () => {
    render(
      <SearchField
        errorText="error"
        onChange={mockOnChange}
        renderSearchResults={mockRenderSearchResults}
      />,
    );
    await screen.findByTestId('field-search-error');

    expect(screen.getByTestId('field-search-error')).toHaveTextContent('error');
  });

  it('should call onChange when input changes', async () => {
    render(<SearchField onChange={mockOnChange} renderSearchResults={mockRenderSearchResults} />);
    await screen.findByTestId('field-search');

    await userEvent.type(screen.getByTestId('field-search-input'), 'test');

    expect(screen.getByTestId('field-search-input')).toHaveValue('test');
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });
});
