import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { useAxios } from 'hooks/useAxios';
import { useConfig } from 'hooks/useConfig';
import { Task } from 'pages/UsersPage/api/useGetUserTasks';
import { QueryKeys } from 'utils/constants';

interface UseGetTaskProps {
  taskId: number;
}

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
