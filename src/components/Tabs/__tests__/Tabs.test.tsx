import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';
import { TabProps } from '../Tab';
import { TabContentProps } from '../TabContent';

import Tabs from '../Tabs';

describe('Tabs', () => {
  const tabs: TabProps[] = [
    { label: 'One', testId: 'tab-one' },
    { label: 'Two', testId: 'tab-two' },
  ];
  const tabContents: TabContentProps[] = [
    {
      children: <div data-testid="tab-content-one"></div>,
    },
    {
      children: <div data-testid="tab-content-two"></div>,
    },
  ];

  it('should render successfully', async () => {
    // ARRANGE
    render(<Tabs tabs={tabs} tabContents={tabContents} />);
    await screen.findByTestId('tabs');

    // ASSERT
    expect(screen.getByTestId('tabs')).toBeDefined();
    expect(screen.getByTestId('tabs-tabs').children.length).toBe(tabs.length);
    expect(screen.getByTestId('tab-content-one')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<Tabs tabs={tabs} tabContents={tabContents} testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should show tab content when tab is clicked', async () => {
    // ARRANGE
    render(<Tabs tabs={tabs} tabContents={tabContents} />);
    await screen.findByTestId('tabs');

    // ACT
    await userEvent.click(screen.getByTestId('tab-two'));

    // ASSERT
    expect(screen.getByTestId('tab-content-two')).toBeDefined();
  });

  it('should render full width variant', async () => {
    // ARRANGE
    render(<Tabs tabs={tabs} tabContents={tabContents} variant="fullWidth" />);
    await screen.findByTestId('tabs');

    // ASSERT
    expect(screen.getByTestId('tabs')).toBeDefined();
    expect(screen.getByTestId('tabs-tabs').children.length).toBe(tabs.length);
    expect(screen.getByTestId('tab-content-one')).toBeDefined();
    expect(screen.getByTestId('tab-one').classList).toContain('flex-grow');
  });
});
