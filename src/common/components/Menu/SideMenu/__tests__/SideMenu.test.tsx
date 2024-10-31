import { describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test/test-utils';
import userEvent from '@testing-library/user-event';

import SideMenu from '../SideMenu';

describe('SideMenu', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<SideMenu />);
    await screen.findByTestId('menu-side');

    // ASSERT
    expect(screen.getByTestId('menu-side')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<SideMenu testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<SideMenu className="custom-class" />);
    await screen.findByTestId('menu-side');

    // ASSERT
    expect(screen.getByTestId('menu-side').classList).toContain('custom-class');
  });

  it('should render headerContent', async () => {
    // ARRANGE
    render(
      <SideMenu headerContent={<div data-testid="custom-header-content">HeaderContent</div>} />,
    );
    await screen.findByTestId('custom-header-content');

    // ASSERT
    expect(screen.getByTestId('custom-header-content')).toBeDefined();
    expect(screen.getByText('HeaderContent')).toBeDefined();
  });

  it('should render menu content', async () => {
    // ARRANGE
    render(
      <SideMenu>
        <div data-testid="custom-menu-content">MenuContent</div>
      </SideMenu>,
    );
    await screen.findByTestId('custom-menu-content');

    // ASSERT
    expect(screen.getByTestId('custom-menu-content')).toBeDefined();
    expect(screen.getByText('MenuContent')).toBeDefined();
  });

  it('should render left side by default', async () => {
    // ARRANGE
    render(<SideMenu />);
    await screen.findByTestId('menu-side');

    // ASSERT
    expect(screen.getByTestId('menu-side')).toBeDefined();
    expect(screen.getByTestId('menu-side').classList).toContain('justify-start');
    expect(screen.getByTestId('menu-side-content').classList).toContain('rounded-r-lg');
    expect(screen.getByTestId('menu-side-content').classList).toContain('border-r');
  });

  it('should render left side', async () => {
    // ARRANGE
    render(<SideMenu side="left" />);
    await screen.findByTestId('menu-side');

    // ASSERT
    expect(screen.getByTestId('menu-side')).toBeDefined();
    expect(screen.getByTestId('menu-side').classList).toContain('justify-start');
    expect(screen.getByTestId('menu-side-content').classList).toContain('rounded-r-lg');
    expect(screen.getByTestId('menu-side-content').classList).toContain('border-r');
  });

  it('should render right side', async () => {
    // ARRANGE
    render(<SideMenu side="right" />);
    await screen.findByTestId('menu-side');

    // ASSERT
    expect(screen.getByTestId('menu-side')).toBeDefined();
    expect(screen.getByTestId('menu-side').classList).toContain('justify-end');
    expect(screen.getByTestId('menu-side-content').classList).toContain('rounded-l-lg');
    expect(screen.getByTestId('menu-side-content').classList).toContain('border-l');
  });

  it('should call close function when backdrop clicked', async () => {
    // ARRANGE
    const mockClose = vi.fn();
    render(<SideMenu close={mockClose} />);
    await screen.findByTestId('menu-side');

    // ACT
    await userEvent.click(screen.getByTestId('menu-side-backdrop'));

    // ASSERT
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should call close function when body clicked', async () => {
    // ARRANGE
    const mockClose = vi.fn();
    render(<SideMenu close={mockClose}>Body</SideMenu>);
    await screen.findByText('Body');

    // ACT
    await userEvent.click(screen.getByText('Body'));

    // ASSERT
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
