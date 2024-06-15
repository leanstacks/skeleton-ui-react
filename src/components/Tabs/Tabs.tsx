import { PropsWithTestId } from '@leanstacks/react-common';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { toNumberBetween } from 'utils/numbers';
import { SearchParam } from 'utils/constants';
import Tab, { TabProps } from './Tab';
import TabContent, { TabContentProps } from './TabContent';

/**
 * The `TabVariant` describes variations of display behavior for `Tabs`.
 */
type TabVariant = 'fullWidth' | 'standard';

/**
 * Properties for the `Tabs` React component.
 * @param {TabProps[]} tabs - An array of `Tab` component properties.
 * @param {TabConent[]} tabContents - An array of `TabContent` component properties.
 * @param {TabVariant} [variant='standard'] -  Optional. The tab display behavior.
 * Default: `standard`.
 * @see {@link PropsWithTestId}
 */
interface TabsProps extends PropsWithTestId {
  tabs: Omit<TabProps, 'isActive' | 'onClick'>[];
  tabContents: TabContentProps[];
  variant?: TabVariant;
}

/**
 * The `Tabs` component is a wrapper for rendering tabbed content.
 *
 * Supply one to many `TabProps` objects in the `tabs` property describing each
 * `Tab` to render. Supply one to many `TabContentProps` objects in the `tabContents` property
 * describing each `TabContent` to render.
 *
 * The number of `tabs` and `tabContents` items should be equal. The order of each array
 * matters.  The first item in the `tabs` array should correspond to content in the first
 * item in the `tabContents` array and so on.
 *
 * *Example:*
 * ```
 * <Tabs
 *   tabs={[
 *     { label: 'List', testId: 'tab-list' },
 *     { label: 'Detail', testId: 'tab-detail' },
 *    ]}
 *    tabContents={[{ children: <MyList /> }, { children: <Outlet />, className: 'my-6' }]}
 * />
 * ```
 * @param {TabsProps} - Component properties
 * @returns {JSX.Element} JSX
 */
const Tabs = ({
  tabs,
  tabContents,
  testId = 'tabs',
  variant = 'standard',
}: TabsProps): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  // obtain activeTabIndex from query string
  const activeTabIndex = toNumberBetween(searchParams.get(SearchParam.tab), 0, tabs.length - 1, 0);

  /**
   * Set the active tab index.
   * @param {number} index - A tab index.
   */
  const setTab = (index: number = 0): void => {
    const tabIndex = toNumberBetween(index, 0, tabs.length - 1, 0);
    if (tabIndex !== activeTabIndex) {
      searchParams.set(SearchParam.tab, tabIndex.toString());
      setSearchParams(searchParams);
    }
  };

  return (
    <div data-testid={testId}>
      <div className="flex gap-4 border-b border-b-neutral-500/10" data-testid={`${testId}-tabs`}>
        {tabs.map(({ className, ...tabProps }, index) => (
          <Tab
            {...tabProps}
            className={classNames({ className, 'flex-grow': variant === 'fullWidth' })}
            isActive={activeTabIndex === index}
            onClick={() => setTab(index)}
            key={index}
          />
        ))}
      </div>
      <div data-testid={`${testId}-content`}>
        <TabContent {...tabContents[activeTabIndex]} />
      </div>
    </div>
  );
};

export default Tabs;
