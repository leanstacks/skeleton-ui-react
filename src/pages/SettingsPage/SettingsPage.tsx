import { Outlet } from 'react-router-dom';

import { useGetUser } from 'api/useGetUser';
import Avatar from 'components/Icon/Avatar';
import LoaderSkeleton from 'components/Loader/LoaderSkeleton';
import MenuNavLink from 'components/Menu/MenuNavLink';

/**
 * The `SettingsPage` component renders the layout for the settings page. It
 * provides an `Outlet` for displaying settings sub-pages.
 * @returns {JSX.Element} JSX
 */
const SettingsPage = (): JSX.Element => {
  // REPLACE: Fetch the currently authenticated user
  const { data: user } = useGetUser({ userId: 1 });

  return (
    <div data-testid="page-settings" className="px-2 sm:px-8">
      <div className="container mx-auto my-4 min-h-[50vh]">
        {user ? (
          <div className="my-6 flex items-center gap-4" data-testid="page-settings-header">
            <Avatar value={user.name} className="size-12 rounded-full text-lg" />
            <div className="font-bold md:text-xl">
              {user.name} ({user.username})
            </div>
          </div>
        ) : (
          <div data-testid="page-settings-header-loader">
            <LoaderSkeleton className="h-16" />
          </div>
        )}
        <div className="my-6 grid gap-8 md:grid-cols-4">
          <div data-testid="page-settings-menu">
            <MenuNavLink to="appearance" iconName="brush" styleActive>
              Appearance
            </MenuNavLink>
          </div>
          <div className="md:col-span-3" data-testid="page-settings-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
