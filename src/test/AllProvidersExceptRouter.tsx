import { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import ConfigContextProvider from 'providers/ConfigProvider';
import SettingsContextProvider from 'providers/SettingsProvider';
import AuthContextProvider from 'providers/AuthProvider';
import ToastsProvider from 'providers/ToastsProvider';

import { queryClient } from './query-client';

const AllProvidersExceptRouter = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <ConfigContextProvider>
      <QueryClientProvider client={queryClient}>
        <SettingsContextProvider>
          <AuthContextProvider>
            <ToastsProvider>{children}</ToastsProvider>
          </AuthContextProvider>
        </SettingsContextProvider>
      </QueryClientProvider>
    </ConfigContextProvider>
  );
};

export default AllProvidersExceptRouter;
