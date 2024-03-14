import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { useAxios } from 'providers/AxiosProvider';
import { QueryKeys } from 'utils/constants';

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
};

interface UseGetUserProps {
  userId: number;
}

export const useGetUser = ({ userId }: UseGetUserProps): UseQueryResult<User, Error> => {
  const axios = useAxios();

  const getUser = async (id: number): Promise<User | null> => {
    const response = await axios.request({
      url: `/users/${id}`,
    });
    return response.data;
  };

  return useQuery({
    queryKey: [QueryKeys.User, userId],
    queryFn: () => getUser(userId),
  });
};
