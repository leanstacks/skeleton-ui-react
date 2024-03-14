import { render, screen } from 'test/test-utils';
import userEvent from '@testing-library/user-event';

import MenuCloseButton from '../MenuCloseButton';

describe('MenuCloseButton', () => {
  it('should render successfully', async () => {
    render(<MenuCloseButton />);

    await screen.findByTestId('menu-close-button');

    expect(screen.getByTestId('menu-close-button')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<MenuCloseButton testId="custom-testid" />);

    await screen.findByTestId('custom-testid');

    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use custom className', async () => {
    render(<MenuCloseButton className="custom-class" />);

    await screen.findByTestId('menu-close-button');

    expect(screen.getByTestId('menu-close-button').classList).toContain('custom-class');
  });

  it('should call close function when clicked', async () => {
    const mockClose = jest.fn();
    render(<MenuCloseButton close={mockClose} />);

    await screen.findByTestId('menu-close-button');
    await userEvent.click(screen.getByTestId('menu-close-button'));

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
