import {
  render as renderWithoutWrapper,
  renderHook as renderHookWithoutWrapper,
} from '@testing-library/react';

import { act, renderHook, screen, waitFor } from 'test/test-utils';

import ToastsProvider, { useToasts } from 'providers/ToastsProvider';

describe('ToastsProvider', () => {
  it('should render successfully', async () => {
    renderWithoutWrapper(
      <ToastsProvider>
        <div data-testid="provider-toasts"></div>
      </ToastsProvider>,
    );

    await screen.findByTestId('provider-toasts');

    expect(screen.getByTestId('provider-toasts')).toBeDefined();
  });
});

describe('useToasts', () => {
  it('should return the context', async () => {
    const { result } = renderHook(() => useToasts());

    await waitFor(() => expect(result.current).not.toBeNull());

    expect(result.current).not.toBeNull();
    expect(Array.isArray(result.current.toasts)).toBe(true);
    expect(result.current.toasts.length).toBe(0);
    expect(typeof result.current.createToast).toBe('function');
    expect(typeof result.current.removeToast).toBe('function');
  });

  it('should create a toast', async () => {
    const { result } = renderHook(() => useToasts());
    await waitFor(() => expect(result.current).not.toBeNull());
    expect(result.current.toasts.length).toBe(0);

    act(() => result.current.createToast({ text: 'toast', isAutoDismiss: false }));

    await waitFor(() => expect(result.current.toasts.length).toBe(1));
  });

  it('should remove a toast', async () => {
    const { result } = renderHook(() => useToasts());
    await waitFor(() => expect(result.current).not.toBeNull());
    expect(result.current.toasts.length).toBe(0);

    act(() => result.current.createToast({ text: 'toast', isAutoDismiss: false }));
    await waitFor(() => expect(result.current.toasts.length).toBe(1));
    act(() => result.current.removeToast(result.current.toasts[0].id));

    await waitFor(() => expect(result.current.toasts.length).toBe(0));
  });

  it('should throw error when not within provider', async () => {
    expect(() => renderHookWithoutWrapper(() => useToasts())).toThrow(
      /useToasts hook must be used within/,
    );
  });
});
