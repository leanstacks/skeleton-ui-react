import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ErrorBoundary from 'common/components/Errors/ErrorBoundary';
import ErrorFallback from 'common/components/Errors/ErrorFallback';
import ConfigContextProvider from 'common/providers/ConfigProvider';
import SettingsContextProvider from 'common/providers/SettingsProvider';
import AxiosContextProvider from 'common/providers/AxiosProvider';
import { router } from 'common/components/Router/Router';
import Theme from 'common/components/Theme/Theme';
import AuthContextProvider from 'common/providers/AuthProvider';
import ToastsProvider from 'common/providers/ToastsProvider';

/**
 * React Query `QueryClient` and configuration.
 * @see {@link https://tanstack.com/query/latest/docs/react/guides/important-defaults | Important Defaults}
 * @see {@link https://tanstack.com/query/latest/docs/react/reference/QueryClient | QueryClient}
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

/**
 * The application. The outermost component of the React application
 * hierarchy. Declares application-wide providers.
 * @returns {JSX.Element} JSX
 */
function App(): JSX.Element {
  return (
    <div id="app" data-testid="app">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <ConfigContextProvider>
          <QueryClientProvider client={queryClient}>
            <SettingsContextProvider>
              <Theme>
                <AuthContextProvider>
                  <AxiosContextProvider>
                    <ToastsProvider>
                      <RouterProvider router={router} />
                    </ToastsProvider>
                  </AxiosContextProvider>
                </AuthContextProvider>
              </Theme>
              <ReactQueryDevtools initialIsOpen={false} />
            </SettingsContextProvider>
          </QueryClientProvider>
        </ConfigContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
