import {
  queries,
  Queries,
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ConfigContextProvider from 'providers/ConfigProvider';
import SettingsContextProvider from 'providers/SettingsProvider';
import AuthContextProvider from 'providers/AuthProvider';
import ToastsProvider from 'providers/ToastsProvider';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const WithAllProviders = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <ConfigContextProvider>
      <QueryClientProvider client={queryClient}>
        <SettingsContextProvider>
          <AuthContextProvider>
            <ToastsProvider>
              <MemoryRouter>{children}</MemoryRouter>
            </ToastsProvider>
          </AuthContextProvider>
        </SettingsContextProvider>
      </QueryClientProvider>
    </ConfigContextProvider>
  );
};

export const AllProvidersExceptRouter = ({ children }: PropsWithChildren): JSX.Element => {
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

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions,
  { route = '/' }: any = {},
) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: WithAllProviders, ...options });
};

function customRenderHook<
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>,
) {
  return renderHook(render, { wrapper: WithAllProviders, ...options });
}

// re-export @testing-library/react
export * from '@testing-library/react';

// override the render function
export { customRender as render };

// override the renderHook function
export { customRenderHook as renderHook };
