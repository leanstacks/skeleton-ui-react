import { useEffect } from 'react';
import { ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { animated, useSpring } from '@react-spring/web';

import { ToastDetail } from 'providers/ToastsContext';
import { useConfig } from 'hooks/useConfig';

import Button from 'components/Button/Button';
import FAIcon from 'components/Icon/FAIcon';

/**
 * Properties for the `Toast` component.
 * @param {function} dismiss - A function called when the `Toast` dismisses.
 * @param {ToastDetail} toast - The `Toast`.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface ToastProps extends PropsWithClassName, PropsWithTestId {
  dismiss: () => void;
  toast: ToastDetail;
}

/**
 * The `Toast` component renders a small, dismissible message to the user.
 *
 * Toast messages are typically used to inform the user of something that
 * happened in the background such as saving information. Or they are
 * used when some adverse action happens, such as an error.
 * @param {ToastProps} props - Component properties, `ToastProps`.
 * @returns {JSX.Element} JSX
 */
const Toast = ({ className, dismiss, testId = 'toast', toast }: ToastProps): JSX.Element => {
  const config = useConfig();

  const [springs, api] = useSpring(() => ({
    from: { opacity: 1, x: 0 },
  }));

  const doDismiss = (): void => {
    api.start({
      to: { opacity: 0, x: -1000 },
      onRest: () => {
        dismiss();
      },
    });
  };

  useEffect(() => {
    if (toast.isAutoDismiss) {
      const dismissInterval = setInterval(() => {
        const dismissAt = dayjs(toast.createdAt).add(
          config.VITE_TOAST_AUTO_DISMISS_MILLIS,
          'millisecond',
        );
        if (dayjs().isAfter(dismissAt)) {
          doDismiss();
        }
      }, 500);

      return () => clearInterval(dismissInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, config.VITE_TOAST_AUTO_DISMISS_MILLIS]);

  return (
    <animated.div
      className={classNames('max-w-sm rounded bg-neutral-200 dark:bg-neutral-600', className)}
      data-testid={testId}
      style={{ ...springs }}
    >
      <div className="flex min-h-12 items-center p-2">
        <div className="grow text-sm" data-testid={`${testId}-text`}>
          {toast.text}
        </div>
        <Button
          variant={ButtonVariant.Text}
          className="!p-0"
          onClick={() => doDismiss()}
          data-testid={`${testId}-button-dismiss`}
        >
          <FAIcon icon="circleXmark" size="xl" testId={`${testId}-icon-dismiss`} />
        </Button>
      </div>
    </animated.div>
  );
};

export default Toast;
