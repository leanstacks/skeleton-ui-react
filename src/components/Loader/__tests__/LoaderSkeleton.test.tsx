import { render, screen } from 'test/test-utils';

import LoaderSkeleton from '../LoaderSkeleton';

describe('LoaderSkeleton', () => {
  it('should render successfully', async () => {
    render(<LoaderSkeleton />);

    await screen.findByTestId('loader-skeleton');

    expect(screen.getByTestId('loader-skeleton')).toBeDefined();
  });

  it('should render custom testId', async () => {
    render(<LoaderSkeleton testId="test" />);

    await screen.findByTestId('test');

    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('should render custom class name', async () => {
    render(<LoaderSkeleton testId="loader-skeleton-test" className="my-class" />);

    await screen.findByTestId('loader-skeleton-test');

    expect(screen.getByTestId('loader-skeleton-test').classList).toContain('my-class');
  });
});
