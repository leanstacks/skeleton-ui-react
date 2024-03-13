import { render, screen } from 'test/test-utils';
import userEvent from '@testing-library/user-event';

import SideMenu from '../SideMenu/SideMenu';

import MenuButton from '../MenuButton';

describe('MenuButton', () => {
  it('should render successfully', async () => {
    render(<MenuButton Menu={SideMenu} />);

    await screen.findByTestId('button-menu');

    expect(screen.getByTestId('button-menu')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<MenuButton Menu={SideMenu} testId="custom-testid" />);

    await screen.findByTestId('custom-testid');

    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use custom className', async () => {
    render(<MenuButton Menu={SideMenu} className="custom-class" />);

    await screen.findByTestId('button-menu');

    expect(screen.getByTestId('button-menu').classList).toContain('custom-class');
  });

  it('should not render Menu until clicked', async () => {
    render(<MenuButton Menu={SideMenu} />);

    await screen.findByTestId('button-menu');

    expect(screen.getByTestId('button-menu')).toBeDefined();
    expect(screen.queryByTestId('menu-side')).toBeNull();
  });

  it('should not render Menu when clicked', async () => {
    render(<MenuButton Menu={SideMenu} />);

    await screen.findByTestId('button-menu');
    await userEvent.click(screen.getByTestId('button-menu'));

    expect(screen.getByTestId('menu-side')).toBeDefined();
  });

  it('should not render Menu after close function called', async () => {
    render(<MenuButton Menu={SideMenu} />);

    await screen.findByTestId('button-menu');
    await userEvent.click(screen.getByTestId('button-menu'));

    // expect Menu to be rendered after clicking MenuButton
    expect(screen.getByTestId('menu-side')).toBeDefined();

    // click the MenuCloseButton on the rendered Menu
    await userEvent.click(screen.getByTestId('menu-side-header-close-button'));

    // expect Menu NOT to be rendered
    expect(screen.queryByTestId('menu-side')).toBeNull();
  });
});
