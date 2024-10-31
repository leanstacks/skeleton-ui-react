import { useTranslation } from 'react-i18next';

import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import Page from 'common/components/Page/Page';
import UserTasksCard from 'pages/UsersPage/components/UserTasksCard';

/**
 * The `DashboardPage` component renders the content of the landing page
 * for authenticated users.
 * @returns {JSX.Element} JSX
 */
const DashboardPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { data: user } = useGetCurrentUser();

  return (
    <Page testId="page-dashboard">
      <div className="container mx-auto min-h-[50vh]">
        <div className="my-4 grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-8">
          <div className="col-span-2">
            {user ? (
              <h1 className="text-xl">
                <span>{t('welcome', { ns: 'common' })}</span>{' '}
                <span data-testid="user-display-name">{user.name}</span>
              </h1>
            ) : (
              <LoaderSkeleton className="h-7" testId="page-dashboard-loader" />
            )}
          </div>

          {user && <UserTasksCard userId={user.id} />}
        </div>
      </div>
    </Page>
  );
};

export default DashboardPage;
