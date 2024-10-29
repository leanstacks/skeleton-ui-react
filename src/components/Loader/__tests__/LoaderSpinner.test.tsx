import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from 'test/test-utils';

import LoaderSpinner from '../LoaderSpinner';

describe('LoaderSpinner', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<LoaderSpinner />);
    await screen.findByTestId('loader-spinner');

    // ASSERT
    expect(screen.getByTestId('loader-spinner')).toBeDefined();
  });

  it('should render custom testId', async () => {
    // ARRANGE
    render(<LoaderSpinner testId="test" />);
    await screen.findByTestId('test');

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('should render default icon', async () => {
    // ARRANGE
    render(<LoaderSpinner />);
    await screen.findByTestId('loader-spinner');

    // ASSERT
    expect(screen.getByTestId('loader-spinner-icon')).toHaveAttribute('data-icon', 'circle-notch');
  });

  it('should render custom icon', async () => {
    // ARRANGE
    render(<LoaderSpinner icon="bars" />);
    await waitFor(() =>
      expect(screen.getByTestId('loader-spinner-icon')).toHaveAttribute('data-icon', 'bars'),
    );

    // ASSERT
    expect(screen.getByTestId('loader-spinner-icon')).toHaveAttribute('data-icon', 'bars');
  });

  it('should render custom icon class name', async () => {
    // ARRANGE
    render(<LoaderSpinner testId="loader-spinner-test" iconClassName="my-class" />);
    await screen.findByTestId('loader-spinner-test');

    // ASSERT
    expect(screen.getByTestId('loader-spinner-test-icon').classList).toContain('my-class');
  });

  it('should render custom class name', async () => {
    // ARRANGE
    render(<LoaderSpinner testId="loader-spinner-test" className="my-class" />);
    await screen.findByTestId('loader-spinner-test');

    // ASSERT
    expect(screen.getByTestId('loader-spinner-test').classList).toContain('my-class');
  });

  it('should render text', async () => {
    // ARRANGE
    render(<LoaderSpinner testId="loader-spinner-test" text="loader text" />);
    await screen.findByText('loader text');

    // ASSERT
    expect(screen.getByText('loader text')).toBeDefined();
  });

  it('should render custom text class name', async () => {
    // ARRANGE
    render(
      <LoaderSpinner testId="loader-spinner-test" textClassName="my-class" text="loader text" />,
    );
    await screen.findByText('loader text');

    // ASSERT
    expect(screen.getByText('loader text').classList).toContain('my-class');
  });
});
