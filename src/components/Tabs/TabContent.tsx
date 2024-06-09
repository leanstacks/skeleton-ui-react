import { PropsWithChildren } from 'react';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';

export interface TabContentProps extends PropsWithChildren, PropsWithClassName, PropsWithTestId {}

const TabContent = ({
  children,
  className,
  testId = 'tab-content',
}: TabContentProps): JSX.Element => {
  return (
    <div className={className} data-testid={testId}>
      {children}
    </div>
  );
};

export default TabContent;
