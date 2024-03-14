import { render, screen } from 'test/test-utils';

import TextComponents from '../TextComponents';

describe('TextComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TextComponents />);
    await screen.findByTestId('components-text');

    // ASSERT
    expect(screen.getByTestId('components-text')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<TextComponents testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<TextComponents className="custom-className" />);
    await screen.findByTestId('components-text');

    // ASSERT
    expect(screen.getByTestId('components-text').classList).toContain('custom-className');
  });
});
