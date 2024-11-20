import { ComponentPropsWithoutRef } from 'react';

import { Task } from 'pages/UsersPage/api/useGetUserTasks';
import Dialog from 'common/components/Dialog/Dialog';
import DialogHeading from 'common/components/Dialog/DialogHeading';
import DialogContent from 'common/components/Dialog/DialogContent';
import Divider from 'common/components/Dialog/Divider';
import DialogButtons from 'common/components/Dialog/DialogButtons';
import DialogButton from 'common/components/Dialog/DialogButton';

/**
 * Properties for the `TaskDeleteDialog` component.
 * @param {function} onCancel - A function called when the cancel button is clicked.
 * @param {function} onDelete - A function called when the delete button is clicked.
 * @param {Task} task - The `Task` being deleted.
 * @see {@link Dialog}
 */
interface TaskDeleteDialogProps extends ComponentPropsWithoutRef<typeof Dialog> {
  onCancel: () => void;
  onDelete: () => void;
  task: Task;
}

/**
 * The `TaskDeleteDialog` renders a dialog prompting the user for deletion
 * confirmation of a `Task`.
 * @param {TaskDeleteDialog} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const TaskDeleteDialog = ({
  onCancel,
  onDelete,
  task,
  ...dialogProps
}: TaskDeleteDialogProps): JSX.Element => {
  return (
    <Dialog {...dialogProps}>
      <DialogHeading>Are you sure?</DialogHeading>
      <DialogContent>
        Deleting task <span className="text-neutral-500">{task.title}</span> is permanent.
      </DialogContent>
      <Divider />
      <DialogButtons>
        <DialogButton onClick={() => onCancel()}>Cancel</DialogButton>
        <DialogButton onClick={() => onDelete()} variant="danger">
          Delete
        </DialogButton>
      </DialogButtons>
    </Dialog>
  );
};

export default TaskDeleteDialog;
