import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchResult from '../SearchResult';

describe('SearchResult', () => {
  const mockOnClick = vi.fn();

  it('should render successfully', async () => {
    // ARRANGE
    render(<SearchResult onClick={mockOnClick} />);
    await screen.findByTestId('field-search-result');

    // ASSERT
    expect(screen.getByTestId('field-search-result')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<SearchResult onClick={mockOnClick} testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<SearchResult onClick={mockOnClick} className="custom-className" />);
    await screen.findByTestId('field-search-result');

    // ASSERT
    expect(screen.getByTestId('field-search-result').classList).toContain('custom-className');
  });

  it('should render children', async () => {
    // ARRANGE
    render(
      <SearchResult onClick={mockOnClick}>
        <div data-testid="child"></div>
      </SearchResult>,
    );
    await screen.findByTestId('child');

    // ASSERT
    expect(screen.getByTestId('child')).toBeDefined();
  });

  it('should call onClick when clicked', async () => {
    // ARRANGE
    render(<SearchResult onClick={mockOnClick} />);
    await screen.findByTestId('field-search-result');

    // ACT
    await userEvent.click(screen.getByTestId('field-search-result'));

    // ASSERT
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
