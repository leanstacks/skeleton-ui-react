import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { useParams } from 'react-router-dom';
import filter from 'lodash/filter';

import { useGetUserTasks } from '../api/useGetUserTasks';
import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';
import LoaderSkeleton from 'components/Loader/LoaderSkeleton';
import UserTaskListItem from './UserTaskListItem';

/**
 * Propeties for the `UserTaskList` React component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface UserTaskListProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `UserTaskList` component renders the list of `Task` objects assigned
 * to a specific `User`.  Tasks are organized by completion status.
 * @param {UserTaskListProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserTaskList = ({ className, testId = 'user-task-list' }: UserTaskListProps): JSX.Element => {
  const { userId } = useParams();
  const { data: tasks, error, isPending } = useGetUserTasks({ userId: Number(userId) });

  const incompleteTasks = filter(tasks, { completed: false });
  const completeTasks = filter(tasks, { completed: true });

  return (
    <div className={className} data-testid={testId}>
      <div className="mb-1 flex items-center gap-1 border-b border-neutral-500/10 pb-1">
        <Icon name="checklist" fill={0} />
        <Text variant="heading3">Tasks</Text>
      </div>

      <div>
        {isPending && (
          <>
            <LoaderSkeleton className="my-3 h-6 w-16" />
            <LoaderSkeleton className="my-3 h-4 w-80" />
            <LoaderSkeleton className="my-3 h-4 w-80" />
            <LoaderSkeleton className="my-3 h-4 w-80" />
            <LoaderSkeleton className="my-3 h-4 w-80" />
            <LoaderSkeleton className="my-3 h-4 w-80" />
          </>
        )}
        {!!tasks && (
          <div>
            <div className="mb-8">
              <div className="font-bold">To Do</div>
              {incompleteTasks.map((task) => (
                <UserTaskListItem key={task.id} task={task} />
              ))}
            </div>

            <div className="mb-8">
              <div className="font-bold">Complete</div>
              {completeTasks.map((task) => (
                <UserTaskListItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}
        {!!error && <div className="text-red-600">{error.message}</div>}
      </div>
    </div>
  );
};

export default UserTaskList;
