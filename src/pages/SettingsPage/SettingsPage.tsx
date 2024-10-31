import { Outlet } from 'react-router-dom';

import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import Avatar from 'common/components/Icon/Avatar';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import MenuNavLink from 'common/components/Menu/MenuNavLink';
import Page from 'common/components/Page/Page';

/**
 * The `SettingsPage` component renders the layout for the settings page. It
 * provides an `Outlet` for displaying settings sub-pages.
 * @returns {JSX.Element} JSX
 */
const SettingsPage = (): JSX.Element => {
  const { data: user } = useGetCurrentUser();

  return (
    <Page testId="page-settings">
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
        <div className="my-6 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div data-testid="page-settings-menu">
            <MenuNavLink to="appearance" icon="paintbrush" styleActive>
              Appearance
            </MenuNavLink>
          </div>
          <div className="md:col-span-3" data-testid="page-settings-content">
            <Outlet />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SettingsPage;
