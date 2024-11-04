import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import filter from 'lodash/filter';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useGetUserTasks } from '../api/useGetUserTasks';
import Card, { CardProps } from 'common/components/Card/Card';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';

/**
 * Properties for the `UserTasksCard` React component.
 * @param {number} userId - A User identifier.
 * @see {@link CardProps}
 */
interface UserTasksCardProps extends CardProps {
  userId: number;
}

/**
 * The `UserTasksCard` component renders card which displays summary information
 * about a User's tasks.
 *
 * When clicked, navigates to the task details page for the User.
 * @param {UserTasksCardProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserTasksCard = ({
  className,
  userId,
  testId = 'card-user-tasks',
  ...props
}: UserTasksCardProps): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: tasks, error, isLoading } = useGetUserTasks({ userId });
  const incompleteTasks = filter(tasks, { completed: false });

  const tasksMessage = useMemo(() => {
    if (error) {
      return t('task.errors.fetchingList', { ns: 'users' });
    }

    if (incompleteTasks.length === 0) {
      return t('task.allComplete', { ns: 'users' });
    }

    return t('task.toComplete', { ns: 'users', count: incompleteTasks.length });
  }, [error, incompleteTasks, t]);

  return (
    <div onClick={() => navigate(`/app/users/${userId}/tasks?tab=1`)} data-testid={testId}>
      <Card
        className={classNames(
          'transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:cursor-pointer hover:bg-blue-600/10',
          className,
        )}
        testId={`${testId}-card`}
        {...props}
      >
        {isLoading ? (
          <div data-testid={`${testId}-loader`}>
            <LoaderSkeleton className="mb-2 h-7 w-20" />
            <LoaderSkeleton className="h-4" />
          </div>
        ) : (
          <div>
            <div className="text-xl font-bold capitalize">{t('task.tasks', { ns: 'users' })}</div>
            <div data-testid={`${testId}-message`}>{tasksMessage}</div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserTasksCard;
