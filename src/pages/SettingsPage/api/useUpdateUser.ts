import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAxios } from 'providers/AxiosProvider';
import { User } from 'api/useGetUser';
import { QueryKeys } from 'utils/constants';

/**
 * The  `UpdatableUser` interface describes the portion of the `User`
 * which may be updated.
 * @see {@link User}
 */
export interface UpdatableUser extends Pick<User, 'id'>, Partial<Omit<User, 'id'>> {}

/**
 * An API hook which updates `User` atributes.
 * @returns Returns a `UseMutationResult` which facilitates the API
 * integration and related events.
 */
export const useUpdateUser = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const updateUser = async (user: UpdatableUser): Promise<User> => {
    const response = await axios.request({
      method: 'put',
      url: `/users/${user.id}`,
      data: user,
    });
    return response.data;
  };

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData([QueryKeys.User, 'current'], data);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
    },
  });
};
