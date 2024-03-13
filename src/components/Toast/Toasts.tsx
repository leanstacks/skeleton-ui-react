import { PropsWithTestId } from '@leanstacks/react-common';

import { useToasts } from 'providers/ToastsProvider';

import Toast from './Toast';

/**
 * Properties for the `Toasts` component.
 * @see {@link PropsWithTestId}
 */
interface ToastsProps extends PropsWithTestId {}

/**
 * The `Toasts` component renders a container for a list of `Toast`
 * components.
 * @param {ToastsProps} props - Component properties, `ToastsProps`.
 * @returns {JSX.Element} JSX
 */
const Toasts = ({ testId = 'toasts' }: ToastsProps): JSX.Element => {
  const { removeToast, toasts } = useToasts();

  return (
    <div className="fixed inset-x-0 bottom-0 left-0 z-[9999]" data-testid={testId}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          dismiss={() => removeToast(toast.id)}
          className="mx-8 mb-4"
          testId={`toast-${toast.id}`}
        />
      ))}
    </div>
  );
};

export default Toasts;
