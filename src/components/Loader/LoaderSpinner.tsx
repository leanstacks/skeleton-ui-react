import classNames from 'classnames';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';

import Icon from 'components/Icon/Icon';

/**
 * Properties for the `LoaderSpinner` component.
 * @param {string} [iconClassName] - Optional. CSS class names for the icon.
 * @param {string} [iconName] - Optional. The icon name. Default: "Progress Activity".
 * @param {string} [text] - Optional. The loader text.
 * @param {string} [textClassName] - Optional. CSS class names for the text.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface LoaderSpinnerProps extends PropsWithClassName, PropsWithTestId {
  iconClassName?: string;
  iconName?: string;
  text?: string;
  textClassName?: string;
}

/**
 * The `LoaderSpinner` component renders an animated spinning loader icon with
 * optional accompanying text. Typically used when some foreground or background
 * process is occurring, usually interaction with an API.
 * @param {LoaderSpinnerProps} [props] - Component properties, `LoaderSpinnerProps`.
 * @returns {JSX.Element} JSX
 */
const LoaderSpinner = ({
  className,
  iconClassName,
  iconName = 'progress_activity',
  testId = 'loader-spinner',
  text,
  textClassName,
}: LoaderSpinnerProps): JSX.Element => {
  return (
    <div className={classNames('flex items-center', className)} data-testid={testId}>
      <Icon
        name={iconName}
        className={classNames('animate-spin', iconClassName)}
        testId={`${testId}-icon`}
      />
      {!!text && <div className={classNames('ms-2', textClassName)}>{text}</div>}
    </div>
  );
};

export default LoaderSpinner;
