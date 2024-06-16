import { PropsWithChildren } from 'react';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';

/**
 * Properties for the `TabContent` React  component.
 * @see {@link PropsWithChildren}
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
export interface TabContentProps extends PropsWithChildren, PropsWithClassName, PropsWithTestId {}

/**
 * The `TabContent` component renders a single block of tabbed content.
 *
 * A `TabContent` is typically not rendered outside of the `Tabs` component, but
 * rather the `TabContentProps` are supplied to the `Tabs` component. The `Tabs`
 * component renders one or more `TabContent` components.
 */
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
