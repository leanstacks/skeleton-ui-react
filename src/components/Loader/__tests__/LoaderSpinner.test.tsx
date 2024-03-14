import { render, screen } from 'test/test-utils';

import LoaderSpinner from '../LoaderSpinner';

describe('LoaderSpinner', () => {
  it('should render successfully', async () => {
    render(<LoaderSpinner />);

    await screen.findByTestId('loader-spinner');

    expect(screen.getByTestId('loader-spinner')).toBeDefined();
  });

  it('should render custom testId', async () => {
    render(<LoaderSpinner testId="test" />);

    await screen.findByTestId('test');

    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('should render default icon', async () => {
    render(<LoaderSpinner />);

    await screen.findByTestId('loader-spinner');

    expect(screen.getByTestId('loader-spinner-icon').textContent).toBe('progress_activity');
  });

  it('should render custom icon', async () => {
    render(<LoaderSpinner iconName="circle" testId="loader-spinner-circle" />);

    await screen.findByTestId('loader-spinner-circle');

    expect(screen.getByTestId('loader-spinner-circle-icon').textContent).toBe('circle');
  });

  it('should render custom icon class name', async () => {
    render(<LoaderSpinner testId="loader-spinner-test" iconClassName="my-class" />);

    await screen.findByTestId('loader-spinner-test');

    expect(screen.getByTestId('loader-spinner-test-icon').classList).toContain('my-class');
  });

  it('should render custom class name', async () => {
    render(<LoaderSpinner testId="loader-spinner-test" className="my-class" />);

    await screen.findByTestId('loader-spinner-test');

    expect(screen.getByTestId('loader-spinner-test').classList).toContain('my-class');
  });

  it('should render text', async () => {
    render(<LoaderSpinner testId="loader-spinner-test" text="loader text" />);

    await screen.findByText('loader text');

    expect(screen.getByText('loader text')).toBeDefined();
  });

  it('should render custom text class name', async () => {
    render(
      <LoaderSpinner testId="loader-spinner-test" textClassName="my-class" text="loader text" />,
    );

    await screen.findByText('loader text');

    expect(screen.getByText('loader text').classList).toContain('my-class');
  });
});
