import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';

import { Task } from '../api/useGetUserTasks';
import Icon from 'components/Icon/Icon';
import classNames from 'classnames';

/**
 * Properties for the `UserTaskListItem` React component.
 * @param {Task} task - A `Task` object.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface UserTaskListItemProps extends PropsWithClassName, PropsWithTestId {
  task: Task;
}

/**
 * The `UserTaskListItem` component renders a single `Task` item within the
 * `UserTaskList`.
 * @param {UserTaskListItemProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserTaskListItem = ({
  className,
  task,
  testId = 'user-task-list-item',
}: UserTaskListItemProps): JSX.Element => {
  return (
    <div className={className} data-testid={testId}>
      <div key={task.id} className="flex items-center gap-4 py-0.5">
        <Icon
          name={task.completed ? 'task_alt' : 'circle'}
          fill={0}
          className={classNames('text-lg', { 'text-green-600': task.completed })}
          testId={`${testId}-icon`}
        />
        <div>{task.title}</div>
      </div>
    </div>
  );
};

export default UserTaskListItem;
