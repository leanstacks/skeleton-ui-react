import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { useParams } from 'react-router-dom';

import { useGetUser } from 'api/useGetUser';
import Text from 'components/Text/Text';
import LoaderSkeleton from 'components/Loader/LoaderSkeleton';
import Icon from 'components/Icon/Icon';
import UserTasks from './UserTasks';

/**
 * Properties for the `UserDetail` React component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface UserDetailProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `UserDetail` component renders the detailed attributes of a `User`
 * object.
 * @param {UserDetailProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserDetail = ({ className, testId = 'user-detail' }: UserDetailProps): JSX.Element => {
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
        <div>
          <Text variant="heading2" className="mb-2">
            {user.name}
          </Text>

          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm opacity-75">
            <div className="flex items-center gap-1">
              <Icon name="mail" fill={0} className="text-sm" />
              {user.email}
            </div>
            <div className="flex items-center gap-1">
              <Icon name="call" fill={0} className="text-sm" />
              {user.phone}
            </div>
            <div className="flex items-center gap-1">
              <Icon name="language" fill={0} className="text-sm" />
              {user.website}
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <div className="mb-1 flex items-center gap-1 border-b border-neutral-500/10 pb-1">
                <Icon name="storefront" fill={0} />
                <Text variant="heading3">Company</Text>
              </div>
              <div className="font-bold">{user.company.name}</div>
              <div>{user.company.catchPhrase}</div>
              <div>{user.company.bs}</div>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-1 border-b border-neutral-500/10 pb-1">
                <Icon name="location_on" fill={0} />
                <Text variant="heading3">Address</Text>
              </div>
              <div>{user.address.street}</div>
              <div>{user.address.suite}</div>
              <div>{user.address.city}</div>
              <div>{user.address.zipcode}</div>
            </div>
          </div>

          <UserTasks userId={user.id} />
        </div>
      )}
      {!!error && <div className="text-red-600">{error.message}</div>}
    </div>
  );
};

export default UserDetail;
