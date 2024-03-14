import { render, screen } from 'test/test-utils';
import ButtonComponents from '../ButtonComponents';

describe('ButtonComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<ButtonComponents />);
    await screen.findByTestId('components-button');

    // ASSERT
    expect(screen.getByTestId('components-button')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<ButtonComponents testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<ButtonComponents className="custom-className" />);
    await screen.findByTestId('components-button');

    // ASSERT
    expect(screen.getByTestId('components-button').classList).toContain('custom-className');
  });
});
