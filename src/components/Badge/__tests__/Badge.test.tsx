import { render, screen } from 'test/test-utils';

import Badge from '../Badge';

describe('Badge', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Badge>0</Badge>);
    await screen.findAllByTestId('badge');

    // ASSERT
    expect(screen.getByTestId('badge')).toBeDefined();
    expect(screen.getByTestId('badge').textContent).toEqual('0');
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<Badge testId="custom-testId">0</Badge>);
    await screen.findAllByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<Badge className="custom-className">0</Badge>);
    await screen.findAllByTestId('badge');

    // ASSERT
    expect(screen.getByTestId('badge').classList).toContain('custom-className');
  });
});
