import { useMutation, useQueryClient } from '@tanstack/react-query';
import reject from 'lodash/reject';

import { QueryKeys } from 'common/utils/constants';
import { Task } from 'pages/UsersPage/api/useGetUserTasks';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';

/**
 * The `useDeleteTask` mutation function variables.
 */
export type DeleteTaskVariables = {
  task: Task;
};

/**
 * An API hook which deletes a single `Task`. Returns a `UseMutationResult`
 * object whose `mutate` attribute is a function to delete a `Task`.
 *
 * When successful, the hook updates cached `Task` query data.
 *
 * @returns Returns a `UseMutationResult`.
 */
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const config = useConfig();
  const axios = useAxios();

  /**
   * Delete a `Task`.
   * @param {DeleteTaskVariables} variables - The mutation function variables.
   */
  const deleteTask = async ({ task }: DeleteTaskVariables): Promise<void> => {
    // throw new Error('Failed');
    await axios.request({
      method: 'delete',
      url: `${config.VITE_BASE_URL_API}/todos/${task.id}`,
    });
  };

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<Task[]>(
        [QueryKeys.Tasks, { userId: variables.task.userId }],
        (cachedTasks) => (cachedTasks ? [...reject(cachedTasks, { id: variables.task.id })] : []),
      );
    },
  });
};
