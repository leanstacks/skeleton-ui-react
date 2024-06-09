import { PropsWithTestId } from '@leanstacks/react-common';
import { useSearchParams } from 'react-router-dom';

import { toNumberBetween } from 'utils/numbers';
import { SearchParam } from 'utils/constants';
import Tab, { TabProps } from './Tab';
import TabContent, { TabContentProps } from './TabContent';

interface TabsProps extends PropsWithTestId {
  tabs: Omit<TabProps, 'isActive' | 'onClick'>[];
  tabContents: TabContentProps[];
}

const Tabs = ({ tabs, tabContents, testId = 'tabs' }: TabsProps): JSX.Element => {
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
        {tabs.map((tabProps, index) => (
          <Tab
            {...tabProps}
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
