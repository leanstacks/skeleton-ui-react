import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { Outlet, useParams } from 'react-router-dom';

import { useGetUser } from 'common/api/useGetUser';
import Text from 'common/components/Text/Text';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import Avatar from 'common/components/Icon/Avatar';
import FAIcon from 'common/components/Icon/FAIcon';

/**
 * Properties for the `UserDetailLayout` React component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface UserDetailLayoutProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `UserDetailLayout` component renders a layout for the display of
 * the detailed attributes of a `User` object.
 * @param {UserDetailLayoutProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserDetailLayout = ({
  className,
  testId = 'layout-user-detail',
}: UserDetailLayoutProps): JSX.Element => {
  const { userId } = useParams();
  const { data: user, error, isPending } = useGetUser({ userId: Number(userId) });

  return (
    <div className={className} data-testid={testId}>
      {isPending && (
        <>
          <LoaderSkeleton className="mb-8 h-8 w-64" />
          <div className="mb-3 flex flex-wrap gap-4">
            <LoaderSkeleton className="mb-2 h-3 w-32" />
            <LoaderSkeleton className="mb-2 h-3 w-32" />
            <LoaderSkeleton className="mb-2 h-3 w-32" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <LoaderSkeleton className="mb-2 h-24 w-64" />
            <LoaderSkeleton className="mb-2 h-24 w-64" />
          </div>
        </>
      )}
      {!!user && (
        <div data-testid={`${testId}-user`}>
          <div className="flex items-center gap-2">
            <Avatar value={user.name} className="rounded-full" />
            <Text variant="heading2" className="">
              {user.name}
            </Text>
          </div>

          <div className="mb-8 mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm opacity-75">
            <div className="flex items-center gap-1">
              <FAIcon icon="envelope" />
              {user.email}
            </div>
            <div className="flex items-center gap-1">
              <FAIcon icon="phone" />
              {user.phone}
            </div>
            <div className="flex items-center gap-1">
              <FAIcon icon="link" />
              {user.website}
            </div>
          </div>

          <Outlet />
        </div>
      )}
      {!!error && (
        <div className="text-red-600" data-testid={`${testId}-error`}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default UserDetailLayout;
