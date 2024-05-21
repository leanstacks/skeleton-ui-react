import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import UserDetailEmpty from '../UserDetailEmpty';

describe('UserDetailEmpty', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserDetailEmpty />);
    await screen.findByTestId('user-detail-empty');

    // ASSERT
    expect(screen.getByTestId('user-detail-empty')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<UserDetailEmpty testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<UserDetailEmpty className="custom-className" />);
    await screen.findByTestId('user-detail-empty');

    // ASSERT
    expect(screen.getByTestId('user-detail-empty').classList).toContain('custom-className');
  });
});
