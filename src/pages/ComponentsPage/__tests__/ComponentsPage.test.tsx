import { render, screen } from 'test/test-utils';
import ComponentsPage from '../ComponentsPage';

describe('ComponentsPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<ComponentsPage />);
    await screen.findByTestId('page-components');

    // ASSERT
    expect(screen.getByTestId('page-components')).toBeDefined();
  });
});
