import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ErrorBoundary from 'components/Errors/ErrorBoundary';
import ErrorFallback from 'components/Errors/ErrorFallback';
import ConfigContextProvider from 'providers/ConfigProvider';
import SettingsContextProvider from 'providers/SettingsProvider';
import AxiosContextProvider from 'providers/AxiosProvider';
import { router } from 'components/Router/Router';
import Theme from 'components/Theme/Theme';
import AuthContextProvider from 'providers/AuthProvider';
import ToastsProvider from 'providers/ToastsProvider';

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
