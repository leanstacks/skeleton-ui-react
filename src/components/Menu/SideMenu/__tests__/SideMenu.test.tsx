import { render, screen } from 'test/test-utils';
import userEvent from '@testing-library/user-event';

import SideMenu from '../SideMenu';

describe('SideMenu', () => {
  it('should render successfully', async () => {
    render(<SideMenu />);

    await screen.findByTestId('menu-side');

    expect(screen.getByTestId('menu-side')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<SideMenu testId="custom-testid" />);

    await screen.findByTestId('custom-testid');

    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use custom className', async () => {
    render(<SideMenu className="custom-class" />);

    await screen.findByTestId('menu-side');

    expect(screen.getByTestId('menu-side').classList).toContain('custom-class');
  });

  it('should render headerContent', async () => {
    render(
      <SideMenu headerContent={<div data-testid="custom-header-content">HeaderContent</div>} />,
    );

    await screen.findByTestId('custom-header-content');

    expect(screen.getByTestId('custom-header-content')).toBeDefined();
    expect(screen.getByText('HeaderContent')).toBeDefined();
  });

  it('should render menu content', async () => {
    render(
      <SideMenu>
        <div data-testid="custom-menu-content">MenuContent</div>
      </SideMenu>,
    );

    await screen.findByTestId('custom-menu-content');

    expect(screen.getByTestId('custom-menu-content')).toBeDefined();
    expect(screen.getByText('MenuContent')).toBeDefined();
  });

  it('should render left side by default', async () => {
    render(<SideMenu />);

    await screen.findByTestId('menu-side');

    expect(screen.getByTestId('menu-side')).toBeDefined();
    expect(screen.getByTestId('menu-side').classList).toContain('justify-start');
    expect(screen.getByTestId('menu-side-content').classList).toContain('rounded-r-lg');
    expect(screen.getByTestId('menu-side-content').classList).toContain('border-r');
  });

  it('should render left side', async () => {
    render(<SideMenu side="left" />);

    await screen.findByTestId('menu-side');

    expect(screen.getByTestId('menu-side')).toBeDefined();
    expect(screen.getByTestId('menu-side').classList).toContain('justify-start');
    expect(screen.getByTestId('menu-side-content').classList).toContain('rounded-r-lg');
    expect(screen.getByTestId('menu-side-content').classList).toContain('border-r');
  });

  it('should render right side', async () => {
    render(<SideMenu side="right" />);

    await screen.findByTestId('menu-side');

    expect(screen.getByTestId('menu-side')).toBeDefined();
    expect(screen.getByTestId('menu-side').classList).toContain('justify-end');
    expect(screen.getByTestId('menu-side-content').classList).toContain('rounded-l-lg');
    expect(screen.getByTestId('menu-side-content').classList).toContain('border-l');
  });

  it('should call close function when backdrop clicked', async () => {
    const mockClose = jest.fn();
    render(<SideMenu close={mockClose} />);

    await screen.findByTestId('menu-side');

    await userEvent.click(screen.getByTestId('menu-side-backdrop'));

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should call close function when body clicked', async () => {
    const mockClose = jest.fn();
    render(<SideMenu close={mockClose}>Body</SideMenu>);

    await screen.findByText('Body');

    await userEvent.click(screen.getByText('Body'));

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
