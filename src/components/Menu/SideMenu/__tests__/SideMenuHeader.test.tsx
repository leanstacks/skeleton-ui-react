import { render, screen } from 'test/test-utils';
import userEvent from '@testing-library/user-event';

import SideMenuHeader from '../SideMenuHeader';

describe('SideMenuHeader', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <SideMenuHeader>
        <div data-testid="menu-header-content">Content</div>
      </SideMenuHeader>,
    );
    await screen.findByTestId('menu-header');

    // ASSERT
    expect(screen.getByTestId('menu-header')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(
      <SideMenuHeader testId="custom-testid">
        <div data-testid="menu-header-content">Content</div>
      </SideMenuHeader>,
    );
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(
      <SideMenuHeader className="custom-class">
        <div data-testid="menu-header-content">Content</div>
      </SideMenuHeader>,
    );
    await screen.findByTestId('menu-header');

    // ASSERT
    expect(screen.getByTestId('menu-header').classList).toContain('custom-class');
  });

  it('should render header content', async () => {
    // ARRANGE
    render(
      <SideMenuHeader className="custom-class">
        <div data-testid="menu-header-content">Content</div>
      </SideMenuHeader>,
    );
    await screen.findByTestId('menu-header-content');

    // ASSERT
    expect(screen.getByTestId('menu-header-content')).toBeDefined();
  });

  it('should call close function when close button clicked', async () => {
    // ARRANGE
    const mockClose = jest.fn();
    render(
      <SideMenuHeader close={mockClose}>
        <div data-testid="menu-header-content">Content</div>
      </SideMenuHeader>,
    );
    await screen.findByTestId('menu-header');

    // ACT
    await userEvent.click(screen.getByTestId('menu-header-close-button'));

    // ASSERT
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should do nothing when no close function and close button clicked', async () => {
    // ARRANGE
    render(
      <SideMenuHeader>
        <div data-testid="menu-header-content">Content</div>
      </SideMenuHeader>,
    );
    await screen.findByTestId('menu-header');

    // ACT
    await userEvent.click(screen.getByTestId('menu-header-close-button'));

    // ASSERT
    expect(screen.getByTestId('menu-header-close-button')).toBeDefined();
  });
});
