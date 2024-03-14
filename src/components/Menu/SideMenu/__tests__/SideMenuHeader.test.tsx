import { render, screen } from 'test/test-utils';
import userEvent from '@testing-library/user-event';

import SideMenuHeader from '../SideMenuHeader';

describe('SideMenuHeader', () => {
  it('should render successfully', async () => {
    render(
      <SideMenuHeader>
        <div data-testid="menu-header-content">Content</div>
      </SideMenuHeader>,
    );

    await screen.findByTestId('menu-header');

    expect(screen.getByTestId('menu-header')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(
      <SideMenuHeader testId="custom-testid">
        <div data-testid="menu-header-content">Content</div>
      </SideMenuHeader>,
    );

    await screen.findByTestId('custom-testid');

    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use custom className', async () => {
    render(
      <SideMenuHeader className="custom-class">
        <div data-testid="menu-header-content">Content</div>
      </SideMenuHeader>,
    );

    await screen.findByTestId('menu-header');

    expect(screen.getByTestId('menu-header').classList).toContain('custom-class');
  });

  it('should render header content', async () => {
    render(
      <SideMenuHeader className="custom-class">
        <div data-testid="menu-header-content">Content</div>
      </SideMenuHeader>,
    );

    await screen.findByTestId('menu-header-content');

    expect(screen.getByTestId('menu-header-content')).toBeDefined();
  });

  it('should call close function when close button clicked', async () => {
    const mockClose = jest.fn();
    render(
      <SideMenuHeader close={mockClose}>
        <div data-testid="menu-header-content">Content</div>
      </SideMenuHeader>,
    );

    await screen.findByTestId('menu-header');

    await userEvent.click(screen.getByTestId('menu-header-close-button'));

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should do nothing when no close function and close button clicked', async () => {
    render(
      <SideMenuHeader>
        <div data-testid="menu-header-content">Content</div>
      </SideMenuHeader>,
    );

    await screen.findByTestId('menu-header');

    await userEvent.click(screen.getByTestId('menu-header-close-button'));

    expect(screen.getByTestId('menu-header-close-button')).toBeDefined();
  });
});
