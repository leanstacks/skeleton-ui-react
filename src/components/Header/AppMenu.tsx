import { useAuth } from 'hooks/useAuth';
import { useGetCurrentUser } from 'api/useGetCurrentUser';

import logo from './logo.png';
import SideMenu, { SideMenuProps } from 'components/Menu/SideMenu/SideMenu';
import MenuNavLink from 'components/Menu/MenuNavLink';
import Avatar from 'components/Icon/Avatar';
import MenuSeparator from 'components/Menu/MenuSeparator';

/**
 * Properties fro the `AppMenu` component.
 * @see {@see SideMenuProps}
 */
interface AppMenuProps extends Omit<SideMenuProps, 'headerContent'> {}

/**
 * The `AppMenu` component a `SideMenu` which contains application menu
 * items. The `AppMenu` is typically rendered at small media breakpoints.
 * @param {AppMenuProps} props - Component properties, `AppMenuProps`.
 * @returns {JSX.Element} JSX
 */
const AppMenu = ({ side = 'right', testId = 'menu-app', ...props }: AppMenuProps): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const { data: user } = useGetCurrentUser();

  const renderHeader = () => {
    if (isAuthenticated && user) {
      return (
        <div className="flex items-center">
          <Avatar value={user.name} className="me-2 rounded-full" />
          <div className="text-sm">{user.name}</div>
        </div>
      );
    } else {
      return <img src={logo} alt="Logo" height="32" width="32" />;
    }
  };

  return (
    <SideMenu side={side} testId={testId} headerContent={renderHeader()} {...props}>
      {isAuthenticated ? (
        <>
          <MenuNavLink to="/auth/signout" title="Sign Out" iconName="logout">
            Sign Out
          </MenuNavLink>
          <MenuSeparator />
          <MenuNavLink to="/app/settings" title="Settings" iconName="settings">
            Settings
          </MenuNavLink>
          <MenuSeparator />
          <MenuNavLink to="/app/components" title="Components" iconName="stacks">
            Components
          </MenuNavLink>
          <MenuSeparator />
          <MenuNavLink to="/app/users" title="Users" iconName="person_search">
            Users
          </MenuNavLink>
        </>
      ) : (
        <>
          <MenuNavLink to="/auth/signin" title="Sign In" iconName="login">
            Sign In
          </MenuNavLink>
          <MenuNavLink to="/auth/signin" title="Sign Up" iconName="person_add">
            Sign Up
          </MenuNavLink>
          <MenuSeparator />
          <MenuNavLink to="/app/components" title="Components" iconName="stacks">
            Components
          </MenuNavLink>
        </>
      )}
    </SideMenu>
  );
};

export default AppMenu;
