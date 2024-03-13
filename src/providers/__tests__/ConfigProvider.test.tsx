import { renderHook as renderHookWithoutWrapper } from '@testing-library/react';

import { render, renderHook, screen, waitFor } from 'test/test-utils';

import ConfigContextProvider, { useConfig } from 'providers/ConfigProvider';

describe('ConfigProvider', () => {
  it('should render successfully', async () => {
    render(
      <ConfigContextProvider>
        <div data-testid="provider-config"></div>
      </ConfigContextProvider>,
    );

    await screen.findByTestId('provider-config');

    expect(screen.getByTestId('provider-config')).toBeDefined();
  });
});

describe.skip('ConfigProvider error', () => {
  const originalEnv = process.env;

  beforeAll(() => {
    process.env = { NODE_ENV: 'test', PUBLIC_URL: 'localhost' };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should throw configuration validation error', () => {
    function renderContextProvider() {
      render(
        <ConfigContextProvider>
          <div data-testid="provider-config"></div>
        </ConfigContextProvider>,
      );
    }

    expect(renderContextProvider).toThrow(/is a required field/);
  });
});

describe('useConfig', () => {
  it('should return the context', async () => {
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current).not.toBeNull());

    expect(result.current).toBeDefined();
    expect(result.current.REACT_APP_BUILD_ENV_CODE).toBe('test');
  });

  it('should throw error when not within provider', () => {
    expect(() => renderHookWithoutWrapper(() => useConfig())).toThrow(/hook must be used within/);
  });
});
