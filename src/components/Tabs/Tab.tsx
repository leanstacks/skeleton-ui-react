import { PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `Tab` React component.
 * @param {boolean} [isActive=false] - Optional. Indicates if this tab is the
 * active tab.
 * @param {string} label - The tab label.
 * @param {function} [onClick] - Optional. A function to be invoked when the
 * tab is clicked.
 * @see {@link PropsWithTestId}
 */
export interface TabProps extends PropsWithTestId {
  isActive?: boolean;
  label: string;
  onClick?: () => void;
}

/**
 * The `Tab` component renders a single tab for the display of tabbed content.
 *
 * A `Tab` is typically not rendered outside of the `Tabs` component, but rather
 * the `TabProps` are supplied to the `Tabs` component so that the `Tabs` component
 * may render one or more `Tab` components.
 *
 * @param {TabProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Tab = ({ isActive = false, label, onClick, testId = 'tab' }: TabProps): JSX.Element => {
  /**
   * Handle tab click events.
   */
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div
      className={classNames(
        'flex w-full cursor-pointer items-center justify-center px-2 py-1 text-sm font-bold uppercase',
        {
          'border-b-2 border-b-blue-300 dark:border-b-blue-600': isActive,
        },
        {
          'border-b-2 border-transparent': !isActive,
        },
      )}
      onClick={handleClick}
      data-testid={testId}
    >
      {label}
    </div>
  );
};

export default Tab;
