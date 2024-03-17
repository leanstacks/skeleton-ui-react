import { Outlet } from 'react-router-dom';

import Page from 'components/Page/Page';
import Text from 'components/Text/Text';
import UserList from './components/UserList';

/**
 * The `UsersPage` component renders the layout for the users page. It
 * displays a list of selectable users. Renders the details of a selected
 * `User`.
 * @returns {JSX.Element} JSX
 */
const UsersPage = (): JSX.Element => {
  return (
    <Page testId="page-users">
      <div className="min-h-[50vh container mx-auto my-4">
        <Text variant="heading1" className="mb-4 border-b border-neutral-500/50 pb-2">
          Users
        </Text>

        <div className="my-6 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <UserList />
          </div>
          <div className="md:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default UsersPage;
