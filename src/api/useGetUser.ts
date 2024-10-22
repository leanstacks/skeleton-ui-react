import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { useAxios } from 'hooks/useAxios';
import { useConfig } from 'hooks/useConfig';
import { QueryKeys } from 'utils/constants';

/**
 * The `Address` type.
 */
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

/**
 * The `Company` type.
 */
export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

/**
 * The `User` type.
 */
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

/**
 * The request properties for `useGetUser`.
 * @param {number} userId - A `User` identifier.
 */
interface UseGetUserProps {
  userId: number;
}

/**
 * An API hook which fetches a `User` by the identifier.
 * @param {UseGetUserProps} props - The hook properties.
 * @returns Returns a `UseQueryResult` with `User` data.
 */
export const useGetUser = ({ userId }: UseGetUserProps): UseQueryResult<User, Error> => {
  const axios = useAxios();
  const config = useConfig();

  const getUser = async (): Promise<User | null> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_URL_API}/users/${userId}`,
    });
    return response.data;
  };

  return useQuery({
    queryKey: [QueryKeys.Users, userId],
    queryFn: () => getUser(),
    enabled: !!userId,
  });
};
