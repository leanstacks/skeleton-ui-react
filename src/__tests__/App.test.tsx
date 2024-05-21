import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import App from '../App';

describe('App', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<App />);
    await screen.findByTestId('app');

    // ASSERT
    expect(screen.getByTestId('app')).toBeDefined();
  });
});
