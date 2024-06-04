import { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import ConfigContextProvider from 'providers/ConfigProvider';
import SettingsContextProvider from 'providers/SettingsProvider';
import AuthContextProvider from 'providers/AuthProvider';
import ToastsProvider from 'providers/ToastsProvider';

import { queryClient } from './query-client';

/**
 * A React test wrapper. Wraps the component under test with a bespoke set
 * of React components, typically providers.
 *
 * This test wrapper includes all of the providers except the Router.
 *
 * This component is useful when you want to render your own router component
 * as part of the test. For example, to test that some specific navigation is
 * triggered.
 *
 * Example:
 * ```
 * render(
 *   <MemoryRouter>
 *     <Routes>
 *       <Route path="/" element={<MyForm />} />
 *       <Route path="/route/under/test" element={<div data-testid="test-navigation" />} />
 *     </Routes>
 *   </MemoryRouter>,
 *   { wrapper: AllProvidersExceptRouter },
 * );
 * ```
 * @param {PropsWithChildren} props - Component properties.
 * @returns {JSX.Element} JSX
 */
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
