import { ToastDetail } from 'providers/ToastsProvider';

export const toastFixture: ToastDetail = {
  id: 'toast1',
  text: 'Toast text',
  isAutoDismiss: false,
  createdAt: '2024-01-17T12:17:09.733Z',
};

export const toastFixture2: ToastDetail = {
  id: 'toast2',
  text: 'Toast text two',
  isAutoDismiss: false,
  createdAt: '2024-01-17T12:18:09.733Z',
};

export const toastsFixture: ToastDetail[] = [toastFixture, toastFixture2];
