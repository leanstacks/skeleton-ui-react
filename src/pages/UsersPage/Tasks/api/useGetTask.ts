import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { Task } from 'pages/UsersPage/api/useGetUserTasks';
import { QueryKeys } from 'common/utils/constants';

/**
 * Properties for the `useGetTask` hook.
 * @param {number} taskId - A `Task` identifier.
 */
interface UseGetTaskProps {
  taskId: number;
}

/**
 * An API hook which fetches a single `Task` object by the identifier attribute.
 * @param {UseGetTaskProps} props - Hook properties.
 * @returns Returns a `UseQueryResult` with `Task` data.
 */
export const useGetTask = ({ taskId }: UseGetTaskProps): UseQueryResult<Task> => {
  const axios = useAxios();
  const config = useConfig();

  const getTask = async (): Promise<Task> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_URL_API}/todos/${taskId}`,
    });

    return response.data;
  };

  return useQuery({
    queryKey: [QueryKeys.Tasks, taskId],
    queryFn: () => getTask(),
    enabled: !!taskId,
  });
};
