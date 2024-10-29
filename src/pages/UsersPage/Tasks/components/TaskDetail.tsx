import {
  Alert,
  AlertVariant,
  Button,
  ButtonVariant,
  PropsWithClassName,
  PropsWithTestId,
} from '@leanstacks/react-common';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import Text from 'components/Text/Text';
import { useGetTask } from '../api/useGetTask';
import LoaderSkeleton from 'components/Loader/LoaderSkeleton';
import { useGetUser } from 'api/useGetUser';
import LoaderSpinner from 'components/Loader/LoaderSpinner';
import Badge from 'components/Badge/Badge';
import FAIcon from 'components/Icon/FAIcon';

/**
 * Properties for the `TaskDetail` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface TaskDetailProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `TaskDetail` component displays the attributes of a single `Task`.
 * Provides buttons and navigation to perform actions on the Task.
 * @param {TaskDetailProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const TaskDetail = ({ className, testId = 'task-detail' }: TaskDetailProps): JSX.Element => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const {
    data: task,
    error: taskError,
    isLoading: isLoadingTask,
  } = useGetTask({ taskId: Number(taskId) });
  const {
    data: user,
    error: userError,
    isLoading: isLoadingUser,
  } = useGetUser({ userId: Number(task?.userId) });

  return (
    <div className={className} data-testid={testId}>
      <div className="mb-1 flex items-center gap-2 border-b border-neutral-500/10 pb-1">
        <FAIcon icon="listCheck" size="lg" />
        <Text variant="heading3">Task</Text>
        {isLoadingTask && <LoaderSpinner iconClassName="text-xl" />}
        {!!task && <div className="text-xl">{`#${task.id}`}</div>}
        <div className="ms-auto flex items-center gap-2">
          <FAIcon icon="pencil" className="px-2 py-1" />
          <FAIcon icon="trash" className="px-2 py-1" />
          <Button
            variant={ButtonVariant.Text}
            className=""
            title="Close"
            onClick={() => navigate(-1)}
            testId={`${testId}-button-close`}
          >
            <FAIcon icon="xmark" />
          </Button>
        </div>
      </div>

      {taskError && (
        <Alert
          variant={AlertVariant.Error}
          className="mb-4 flex items-center gap-2 rounded-none"
          testId={`${testId}-alert-taskError`}
        >
          <FAIcon icon="circleExclamation" />
          {taskError.message}
        </Alert>
      )}

      {userError && (
        <Alert
          variant={AlertVariant.Error}
          className="mb-4 flex items-center gap-2 rounded-none"
          testId={`${testId}-alert-userError`}
        >
          <FAIcon icon="circleExclamation" />
          {userError.message}
        </Alert>
      )}

      {isLoadingTask && (
        <div data-testid={`${testId}-loader`}>
          <div className="mt-4">
            <LoaderSkeleton className="mb-2 h-4 w-12" />
            <LoaderSkeleton className="h-5 w-80" />
          </div>
          <div className="mt-4">
            <LoaderSkeleton className="mb-2 h-4 w-12" />
            <LoaderSkeleton className="h-5 w-80" />
          </div>
          <div className="mt-4">
            <LoaderSkeleton className="mb-2 h-4 w-12" />
            <LoaderSkeleton className="h-5 w-80" />
          </div>
        </div>
      )}

      {task && (
        <div data-testid={`${testId}-task`}>
          <div className="mt-4">
            <div className="text-xs font-bold uppercase">Title</div>
            <div className="text-lg" data-testid={`${testId}-task-title`}>
              {task.title}
            </div>
          </div>

          <div className="mt-4">
            <div className="text-xs font-bold uppercase">Assignee</div>
            <div>
              {isLoadingUser && <LoaderSkeleton className="h-4 w-40" testId="loader-user" />}
              {user && <span data-testid={`${testId}-task-user-name`}>{user.name}</span>}
            </div>
          </div>

          <div className="mt-4">
            <div className="text-xs font-bold uppercase">Status</div>
            <Badge
              className={classNames('inline', { '!bg-blue-600': task.completed })}
              testId={`${testId}-task-status`}
            >
              {task.completed ? 'COMPLETE' : 'INCOMPLETE'}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
