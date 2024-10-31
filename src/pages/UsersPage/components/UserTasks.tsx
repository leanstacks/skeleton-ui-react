import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

import { useGetUserTasks } from '../api/useGetUserTasks';
import FAIcon from 'common/components/Icon/FAIcon';
import Text from 'common/components/Text/Text';
import Link from 'common/components/Link/Link';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import Badge from 'common/components/Badge/Badge';

/**
 * Properties for the `UserTasks` component.
 * @param {number} userId - A `User` identifier.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface UserTasksProps extends PropsWithClassName, PropsWithTestId {
  userId: number;
}

/**
 * The `UserTasks` component renders a block which displays the first
 * few `Task` objects assigned to a `User` and a link to view the
 * full list of `Task` objects for that `User`.
 * @param {UserTasksProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserTasks = ({ className, testId = 'user-tasks', userId }: UserTasksProps): JSX.Element => {
  const { data: tasks, error, isPending } = useGetUserTasks({ userId });

  return (
    <div className={className} data-testid={testId}>
      <div className="mb-1 flex items-center gap-2 border-b border-neutral-500/10 pb-1">
        <FAIcon icon="listCheck" size="lg" />
        <Text variant="heading3">Tasks</Text>
        {!!tasks && (
          <Badge className="self-start" testId={`${testId}-badge-task-count`}>
            {tasks.length}
          </Badge>
        )}
      </div>

      <div className="mb-2">
        {isPending && (
          <>
            <LoaderSkeleton className="my-3 h-4 w-80" />
            <LoaderSkeleton className="my-3 h-4 w-80" />
            <LoaderSkeleton className="my-3 h-4 w-80" />
          </>
        )}
        {!!tasks &&
          tasks.slice(0, 3).map((task) => (
            <div key={task.id} className="flex items-center gap-4 py-0.5">
              <FAIcon
                icon={task.completed ? 'circleCheck' : 'circleRegular'}
                className={classNames({ 'text-green-600': task.completed })}
              />
              <div>{task.title}</div>
            </div>
          ))}
        {!!error && (
          <div className="text-red-600" data-testid={`${testId}-error`}>
            {error.message}
          </div>
        )}
      </div>

      <Link to="tasks?tab=1" title={`View all tasks for this user`} className="text-sm">
        View all
      </Link>
    </div>
  );
};

export default UserTasks;
