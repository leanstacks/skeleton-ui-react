import { render, screen } from 'test/test-utils';

import MenuNavLink from '../MenuNavLink';

describe('MenuNavLink', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<MenuNavLink to="/">LinkText</MenuNavLink>);
    await screen.findByTestId('menu-navlink');

    // ASSERT
    expect(screen.getByTestId('menu-navlink')).toBeDefined();
    expect(screen.getByTestId('menu-navlink').textContent).toBe('LinkText');
    expect(screen.getByTestId('menu-navlink').getAttribute('href')).toBe('/');
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<MenuNavLink to="/" testId="custom-menu-navlink" />);
    await screen.findByTestId('custom-menu-navlink');

    // ASSERT
    expect(screen.getByTestId('custom-menu-navlink')).toBeDefined();
  });

  it('should use custom classes when provided', async () => {
    // ARRANGE
    render(<MenuNavLink to="/" className="custom-class" />);
    await screen.findByTestId('menu-navlink');

    // ASSERT
    expect(screen.getByTestId('menu-navlink').classList).toContain('custom-class');
  });

  it('should render Icon when iconName provided', async () => {
    // ARRANGE
    render(<MenuNavLink to="/" iconName="circle" />);
    await screen.findByTestId('menu-navlink-icon');

    // ASSERT
    expect(screen.getByTestId('menu-navlink-icon')).toBeDefined();
    expect(screen.getByTestId('menu-navlink-icon').textContent).toBe('circle');
  });

  it('should not render Icon when iconName omitted', async () => {
    // ARRANGE
    render(<MenuNavLink to="/">LinkText</MenuNavLink>);
    await screen.findByTestId('menu-navlink');

    // ASSERT
    expect(screen.queryByTestId('menu-navlink-icon')).toBeNull();
  });

  it('should use custom icon classes when provided', async () => {
    // ARRANGE
    render(<MenuNavLink to="/" iconName="circle" iconClassName="custom-class" />);
    await screen.findByTestId('menu-navlink-icon');

    // ASSERT
    expect(screen.getByTestId('menu-navlink-icon')).toBeDefined();
    expect(screen.getByTestId('menu-navlink-icon').classList).toContain('custom-class');
  });

  it('should use active styles', async () => {
    // ARRANGE
    render(
      <MenuNavLink to="/" styleActive>
        LinkText
      </MenuNavLink>,
    );
    await screen.findByTestId('menu-navlink');

    // ASSERT
    expect(screen.getByTestId('menu-navlink')).toBeDefined();
    expect(screen.getByTestId('menu-navlink').classList).toContain('bg-neutral-500/10');
  });

  it('should only use active styles on active route', async () => {
    // ARRANGE
    render(
      <MenuNavLink to="/not/active" styleActive>
        LinkText
      </MenuNavLink>,
    );
    await screen.findByTestId('menu-navlink');

    // ASSERT
    expect(screen.getByTestId('menu-navlink')).toBeDefined();
    expect(screen.getByTestId('menu-navlink').classList).not.toContain('bg-neutral-500/10');
  });

  it('should use className function', async () => {
    // ARRANGE
    render(
      <MenuNavLink
        to="/"
        styleActive
        className={({ isActive }) => [isActive ? 'some-active-class' : ''].join(' ')}
      >
        LinkText
      </MenuNavLink>,
    );
    await screen.findByTestId('menu-navlink');

    // ASSERT
    expect(screen.getByTestId('menu-navlink')).toBeDefined();
    expect(screen.getByTestId('menu-navlink').classList).toContain('some-active-class');
  });
});
