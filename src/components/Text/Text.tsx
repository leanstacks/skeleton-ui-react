import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export type TextVariant = 'heading1' | 'heading2' | 'heading3';

interface TextProps extends PropsWithChildren, PropsWithClassName, PropsWithTestId {
  variant?: TextVariant;
}

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
