import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  AlertVariant,
  Button,
  ButtonVariant,
  PropsWithClassName,
  PropsWithTestId,
} from '@leanstacks/react-common';
import classNames from 'classnames';

import { Task } from 'pages/UsersPage/api/useGetUserTasks';
import Text from 'common/components/Text/Text';
import { useGetTask } from '../api/useGetTask';
import { useDeleteTask } from '../api/useDeleteTask';
import { useGetUser } from 'common/api/useGetUser';
import { useToasts } from 'common/hooks/useToasts';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import LoaderSpinner from 'common/components/Loader/LoaderSpinner';
import Badge from 'common/components/Badge/Badge';
import FAIcon from 'common/components/Icon/FAIcon';
import TaskDeleteDialog from './TaskDeleteDialog';

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { createToast } = useToasts();

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

  const { mutate: deleteTask, isPending: isDeletePending, error: deleteError } = useDeleteTask();

  const doDelete = (task: Task) => {
    setIsDeleteDialogOpen(false);
    deleteTask(
      { task },
      {
        onSuccess: () => {
          createToast({
            text: `Deleted task ${task.id}`,
            isAutoDismiss: true,
          });
          navigate(-1);
        },
      },
    );
  };

  return (
    <div className={className} data-testid={testId}>
      <div className="mb-1 flex items-center gap-2 border-b border-neutral-500/10 pb-1">
        <FAIcon icon="listCheck" size="lg" />
        <Text variant="heading3">Task</Text>
        {isLoadingTask && <LoaderSpinner iconClassName="text-xl" />}
        {!!task && <div className="text-xl">{`#${task.id}`}</div>}
        <div className="ms-auto flex items-center gap-2">
          <FAIcon icon="pencil" className="px-2 py-1" />
          <Button
            variant={ButtonVariant.Text}
            title="Delete"
            onClick={() => setIsDeleteDialogOpen(true)}
            testId={`${testId}-button-delete`}
          >
            <FAIcon icon="trash" />
          </Button>
          <Button
            variant={ButtonVariant.Text}
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
          className="my-4 flex items-center gap-2 rounded-none"
          testId={`${testId}-alert-taskError`}
        >
          <FAIcon icon="circleExclamation" />
          {`Unable to retrieve task. Detail: ${taskError.message}`}
        </Alert>
      )}

      {userError && (
        <Alert
          variant={AlertVariant.Error}
          className="my-4 flex items-center gap-2 rounded-none"
          testId={`${testId}-alert-userError`}
        >
          <FAIcon icon="circleExclamation" />
          {`Unable to retrieve user. Detail: ${userError.message}`}
        </Alert>
      )}

      {deleteError && (
        <Alert
          variant={AlertVariant.Error}
          className="my-4 flex items-center gap-2 rounded-none"
          testId={`${testId}-alert-deleteError`}
        >
          <FAIcon icon="circleExclamation" />
          {`Unable to delete task. Detail: ${deleteError.message}`}
        </Alert>
      )}

      {(isLoadingTask || isDeletePending) && (
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

      {task && !isDeletePending && (
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

          <TaskDeleteDialog
            isOpen={isDeleteDialogOpen}
            onCancel={() => setIsDeleteDialogOpen(false)}
            onClose={() => setIsDeleteDialogOpen(false)}
            onDelete={() => doDelete(task)}
            task={task}
          />
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
