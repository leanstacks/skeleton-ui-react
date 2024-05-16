import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { User } from 'api/useGetUser';

import { useAxios } from 'providers/AxiosProvider';
import { useConfig } from 'providers/ConfigProvider';
import { QueryKeys } from 'utils/constants';

/**
 * An API hook which fetches a collection of `User` objects.
 * @returns Returns a `UseQueryResult` with `User` collection data.
 */
export const useGetUsers = (): UseQueryResult<User[], Error> => {
  const axios = useAxios();
  const config = useConfig();

  const getUsers = async (): Promise<User[]> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_URL_API}/users`,
    });
    return response.data;
  };

  return useQuery({
    queryKey: [QueryKeys.Users],
    queryFn: () => getUsers(),
  });
};
