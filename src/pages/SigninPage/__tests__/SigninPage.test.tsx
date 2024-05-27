import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import SigninPage from '../SigninPage';

describe('SigninPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<SigninPage />);
    await screen.findByTestId('page-signin');

    // ASSERT
    expect(screen.getByTestId('page-signin')).toBeDefined();
  });
});
