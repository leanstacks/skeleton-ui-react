import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import LoaderSkeleton from '../LoaderSkeleton';

describe('LoaderSkeleton', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<LoaderSkeleton />);
    await screen.findByTestId('loader-skeleton');

    // ASSERT
    expect(screen.getByTestId('loader-skeleton')).toBeDefined();
  });

  it('should render custom testId', async () => {
    // ARRANGE
    render(<LoaderSkeleton testId="test" />);
    await screen.findByTestId('test');

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('should render custom class name', async () => {
    // ARRANGE
    render(<LoaderSkeleton testId="loader-skeleton-test" className="my-class" />);
    await screen.findByTestId('loader-skeleton-test');

    // ASSERT
    expect(screen.getByTestId('loader-skeleton-test').classList).toContain('my-class');
  });
});
