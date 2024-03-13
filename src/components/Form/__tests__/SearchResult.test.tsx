import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchResult from '../SearchResult';

describe('SearchResult', () => {
  const mockOnClick = jest.fn();

  it('should render successfully', async () => {
    render(<SearchResult onClick={mockOnClick} />);
    await screen.findByTestId('field-search-result');

    expect(screen.getByTestId('field-search-result')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<SearchResult onClick={mockOnClick} testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    render(<SearchResult onClick={mockOnClick} className="custom-className" />);
    await screen.findByTestId('field-search-result');

    expect(screen.getByTestId('field-search-result').classList).toContain('custom-className');
  });

  it('should render children', async () => {
    render(
      <SearchResult onClick={mockOnClick}>
        <div data-testid="child"></div>
      </SearchResult>,
    );
    await screen.findByTestId('child');

    expect(screen.getByTestId('child')).toBeDefined();
  });

  it('should call onClick when clicked', async () => {
    render(<SearchResult onClick={mockOnClick} />);
    await screen.findByTestId('field-search-result');

    await userEvent.click(screen.getByTestId('field-search-result'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
