import { render, screen } from 'test/test-utils';
import AvatarComponents from '../AvatarComponents';

describe('AvatarComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<AvatarComponents />);
    await screen.findByTestId('components-avatar');

    // ASSERT
    expect(screen.getByTestId('components-avatar')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<AvatarComponents testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<AvatarComponents className="custom-className" />);
    await screen.findByTestId('components-avatar');

    // ASSERT
    expect(screen.getByTestId('components-avatar').classList).toContain('custom-className');
  });
});
