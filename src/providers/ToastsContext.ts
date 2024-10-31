import { createContext } from 'react';

/**
 * Describes the attributes of a single Toast.
 */
export interface ToastDetail {
  id: string;
  text: string;
  createdAt: string;
  isAutoDismiss: boolean;
}

/**
 * A DTO type which describes the attributes to create a new Toast.
 */
export type CreateToastDTO = Pick<ToastDetail, 'text' | 'isAutoDismiss'>;

/**
 * The `value` provided by the `ToastsContext`.
 */
export interface ToastsContextValue {
  toasts: ToastDetail[];
  createToast: (toast: CreateToastDTO) => void;
  removeToast: (id: string) => void;
}

/**
 * The `ToastsContext` instance.
 */
export const ToastsContext = createContext<ToastsContextValue | undefined>(undefined);
