import { useParams } from 'react-router-dom';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

import { useGetUsers } from '../api/useGetUsers';
import UserListItem from './UserListItem';
import LoaderSkeleton from 'components/Loader/LoaderSkeleton';

interface UserListProps extends PropsWithClassName, PropsWithTestId {}

const UserList = ({ className, testId = 'list-users' }: UserListProps): JSX.Element => {
  const { userId } = useParams();
  const { data: users, error, isPending } = useGetUsers();

  return (
    <div
      className={classNames('flex max-h-48 flex-col overflow-y-auto md:max-h-full', className)}
      data-testid={testId}
    >
      {isPending && (
        <>
          <LoaderSkeleton className="my-2 h-6" />
          <LoaderSkeleton className="my-2 h-6" />
          <LoaderSkeleton className="my-2 h-6" />
          <LoaderSkeleton className="my-2 h-6" />
          <LoaderSkeleton className="my-2 h-6" />
        </>
      )}
      {users &&
        users.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            isActive={user.id === Number(userId)}
            testId={`list-item-user-${user.id}`}
          />
        ))}
      {!!error && <div className="text-red-600">{error.message}</div>}
    </div>
  );
};

export default UserList;
