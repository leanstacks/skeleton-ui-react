import { useGetCurrentUser } from 'api/useGetCurrentUser';
import LoaderSkeleton from 'components/Loader/LoaderSkeleton';

/**
 * The `DashboardPage` component renders the content of the landing page
 * for authenticated users.
 * @returns {JSX.Element} JSX
 */
const DashboardPage = (): JSX.Element => {
  const { data: user } = useGetCurrentUser({ enabled: true });

  return (
    <div data-testid="page-dashboard" className="px-2 sm:px-8">
      <div className="container mx-auto min-h-[50vh]">
        <div className="my-4 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="col-span-2">
            {!!user ? (
              <h1 className="text-xl">
                Welcome <span data-testid="user-display-name">{user.name}</span>
              </h1>
            ) : (
              <LoaderSkeleton className="h-7" testId="page-dashboard-loader" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
