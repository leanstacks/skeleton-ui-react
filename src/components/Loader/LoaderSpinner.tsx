import classNames from 'classnames';
import { BaseComponentProps } from '@leanstacks/react-common';

import FAIcon, { FAIconProps } from 'components/Icon/FAIcon';

/**
 * Properties for the `LoaderSpinner` component.
 * @param {string} [iconClassName] - Optional. CSS class names for the icon.
 * @param {string} [iconName] - Optional. The icon name. Default: "Progress Activity".
 * @param {string} [text] - Optional. The loader text.
 * @param {string} [textClassName] - Optional. CSS class names for the text.
 * @see {@link BaseComponentProps}
 */
interface LoaderSpinnerProps extends BaseComponentProps, Partial<Pick<FAIconProps, 'icon'>> {
  iconClassName?: string;
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
  icon = 'circleNotch',
  testId = 'loader-spinner',
  text,
  textClassName,
}: LoaderSpinnerProps): JSX.Element => {
  return (
    <div className={classNames('flex items-center', className)} data-testid={testId}>
      <FAIcon icon={icon} spin className={iconClassName} testId={`${testId}-icon`} />
      {!!text && <div className={classNames('ms-2', textClassName)}>{text}</div>}
    </div>
  );
};

export default LoaderSpinner;
