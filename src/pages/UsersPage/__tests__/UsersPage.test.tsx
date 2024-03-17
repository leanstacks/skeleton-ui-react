import { render, screen } from 'test/test-utils';
import UsersPage from '../UsersPage';

describe('UsersPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UsersPage />);
    await screen.findByTestId('page-users');

    // ASSERT
    expect(screen.getByTestId('page-users')).toBeDefined();
  });
});
