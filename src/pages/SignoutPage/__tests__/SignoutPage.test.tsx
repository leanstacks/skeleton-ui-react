import { render, screen } from 'test/test-utils';
import SignoutPage from '../SignoutPage';

describe('SignoutPage', () => {
  const originalLocation = window.location;
  const replaceSpy = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'location', { value: { replace: replaceSpy } });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', { value: originalLocation });
  });

  it('should render successfully', async () => {
    render(<SignoutPage />);

    await screen.findByTestId('page-signout');

    expect(screen.getByTestId('page-signout')).toBeDefined();
  });

  it('should redirect to IdP', async () => {
    render(<SignoutPage />);

    await screen.findByTestId('page-signout');

    expect(screen.getByTestId('page-signout')).toBeDefined();
    expect(replaceSpy).toHaveBeenCalled();
  });
});
