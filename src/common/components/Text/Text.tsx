import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

/**
 * The variations of `Text` components.
 */
export type TextVariant = 'heading1' | 'heading2' | 'heading3';

/**
 * Properties for the `Text` React component.
 * @param {TextVariant} [variant] - Optional. The variant. Default: `none`
 * @see {@link PropsWithChildren}
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface TextProps extends PropsWithChildren, PropsWithClassName, PropsWithTestId {
  variant?: TextVariant;
}

/**
 * The `Text` component renders a block of text. The text is styled to match
 * the supplied `variant`.
 * @param {TextProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Text = ({ children, className, testId = 'text', variant }: TextProps): JSX.Element => {
  const getVariantClasses = (variant?: TextVariant): string => {
    switch (variant) {
      case 'heading1':
        return 'text-4xl';
      case 'heading2':
        return 'text-2xl';
      case 'heading3':
        return 'text-xl font-bold';
      default:
        return '';
    }
  };

  return (
    <div className={classNames(getVariantClasses(variant), className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default Text;
