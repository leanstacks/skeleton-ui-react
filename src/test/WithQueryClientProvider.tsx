import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './query-client';

/**
 * A React test wrapper. Wraps the component under test with a bespoke set
 * of React components, typically providers.
 *
 * Wraps the component with the React Query `QueryClientProvider` and a router,
 * but nothing more. Removes other providers to minimize side effects on the
 * component under test.
 * @param {PropsWithChildren} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const WithQueryClientProvider = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

export default WithQueryClientProvider;
