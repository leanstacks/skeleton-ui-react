import { useQueryClient, useMutation } from '@tanstack/react-query';
import find from 'lodash/find';

import { User } from 'api/useGetUser';
import { UserTokens } from 'api/useGetUserTokens';
import { useAxios } from 'providers/AxiosProvider';
import { QueryKeys, StorageKeys } from 'utils/constants';
import storage from 'utils/storage';

export const useSignIn = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const signIn = async (email: string): Promise<User> => {
    const response = await axios.request<User[]>({
      url: `/users`,
    });
    const user = find(response.data, { email });
    console.log(`user:${JSON.stringify(user)}`);
    if (user) {
      const tokens: UserTokens = { id_token: btoa(JSON.stringify(user)) };
      storage.setItem(StorageKeys.UserTokens, JSON.stringify(tokens));
      return user;
    } else {
      throw new Error('Authentication failed.');
    }
  };

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserTokens] });
      queryClient.setQueryData([QueryKeys.User, data.id], data);
      queryClient.setQueryData([QueryKeys.User, 'current'], data);
    },
  });
};
