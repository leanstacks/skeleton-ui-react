import { Outlet } from 'react-router-dom';

import Page from 'components/Page/Page';
import Text from 'components/Text/Text';
import MenuNavLink from 'components/Menu/MenuNavLink';

/**
 * The `ComponentsPage` component renders the layout for the components page.
 * It provides an `Outlet` for displaying a variety of sub-pages containing
 * React component variations.
 * @returns {JSX.Element} JSX
 */
const ComponentsPage = (): JSX.Element => {
  return (
    <Page testId="page-components">
      <div className="container mx-auto my-4 min-h-[50vh]">
        <Text variant="heading1" className="mb-4 border-b border-neutral-500/50 pb-2">
          Components
        </Text>

        <div className="my-6 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div data-testid="page-components-menu">
            <MenuNavLink to="avatar" styleActive>
              Avatar
            </MenuNavLink>
            <MenuNavLink to="badge" styleActive>
              Badge
            </MenuNavLink>
            <MenuNavLink to="button" styleActive>
              Button
            </MenuNavLink>
            <MenuNavLink to="card" styleActive>
              Card
            </MenuNavLink>
            <MenuNavLink to="text" styleActive>
              Text
            </MenuNavLink>
          </div>
          <div className="md:col-span-3" data-testid="page-components-content">
            <Outlet />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ComponentsPage;
