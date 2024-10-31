import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { useParams } from 'react-router-dom';

import { useGetUser } from 'api/useGetUser';
import Text from 'components/Text/Text';
import LoaderSkeleton from 'components/Loader/LoaderSkeleton';
import FAIcon from 'components/Icon/FAIcon';
import UserTasks from './UserTasks';

/**
 * Properties for the `UserDetail` React component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface UserDetailProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `UserDetail` component renders the detailed attributes of a `User` object.
 * @param {UserDetailLayoutProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserDetail = ({ className, testId = 'user-detail' }: UserDetailProps): JSX.Element => {
  const { userId } = useParams();
  const { data: user, error, isPending } = useGetUser({ userId: Number(userId) });

  return (
    <div className={className} data-testid={testId}>
      {isPending && (
        <>
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <LoaderSkeleton className="mb-2 h-24 w-64" />
            <LoaderSkeleton className="mb-2 h-24 w-64" />
          </div>
          <LoaderSkeleton className="mb-2 h-24" />
        </>
      )}
      {!!user && (
        <div data-testid={`${testId}-user`}>
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <div className="mb-1 flex items-center gap-2 border-b border-neutral-500/10 pb-1">
                <FAIcon icon="building" />
                <Text variant="heading3">Company</Text>
              </div>
              <div className="font-bold">{user.company.name}</div>
              <div>{user.company.catchPhrase}</div>
              <div>{user.company.bs}</div>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2 border-b border-neutral-500/10 pb-1">
                <FAIcon icon="mapLocationDot" />
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
      {!!error && (
        <div className="text-red-600" data-testid={`${testId}-error`}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default UserDetail;
