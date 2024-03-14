import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { User } from 'api/useGetUser';

interface UserListItemProps extends PropsWithClassName, PropsWithTestId {
  user: User;
  isActive?: boolean;
}

const UserListItem = ({
  className,
  isActive = false,
  testId = 'list-item-user',
  user,
}: UserListItemProps): JSX.Element => {
  const navigate = useNavigate();

  const doClick = () => {
    navigate(`${user.id}`);
  };

  return (
    <div
      className={classNames(
        'flex min-h-16 items-center border-b-2 border-b-neutral-500/10 px-2 py-1.5 hover:cursor-pointer hover:border-b-blue-300 hover:dark:border-b-blue-600',
        { 'border-b-blue-300 dark:border-b-blue-600': isActive },
        className,
      )}
      onClick={() => doClick()}
      data-testid={testId}
    >
      <div className="flex flex-col">
        <div>{user.name}</div>
        <div className="text-xs opacity-50">{user.email}</div>
      </div>
    </div>
  );
};

export default UserListItem;
