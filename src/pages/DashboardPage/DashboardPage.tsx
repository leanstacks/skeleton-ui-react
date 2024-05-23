import { useGetUser } from 'api/useGetUser';
import LoaderSkeleton from 'components/Loader/LoaderSkeleton';
import Page from 'components/Page/Page';

/**
 * The `DashboardPage` component renders the content of the landing page
 * for authenticated users.
 * @returns {JSX.Element} JSX
 */
const DashboardPage = (): JSX.Element => {
  const { data: user } = useGetUser({ userId: 1 });

  return (
    <Page testId="page-dashboard">
      <div className="container mx-auto min-h-[50vh]">
        <div className="my-4 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="col-span-2">
            {user ? (
              <h1 className="text-xl">
                Welcome <span data-testid="user-display-name">{user.name}</span>
              </h1>
            ) : (
              <LoaderSkeleton className="h-7" testId="page-dashboard-loader" />
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default DashboardPage;
