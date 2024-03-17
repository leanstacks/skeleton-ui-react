import { render, screen } from 'test/test-utils';

import StandardLayout from '../StandardLayout';

describe('StandardLayout', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<StandardLayout />);
    await screen.findByTestId('layout-standard');

    // ASSERT
    expect(screen.getByTestId('layout-standard')).toBeDefined();
  });
});
