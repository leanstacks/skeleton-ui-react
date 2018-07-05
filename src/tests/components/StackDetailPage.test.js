import React from 'react';
import { shallow } from 'enzyme';

import { StackDetailPage } from '../../components/StackDetailPage';
import technologies from '../fixtures/technologies';

test('should render StackDetailPage correctly', () => {
  const wrapper =  shallow(<StackDetailPage technologies={technologies} stackType="application" />);
  expect(wrapper).toMatchSnapshot();
});

test('should not render Techology when absent', () => {
  const wrapper =  shallow(<StackDetailPage technologies={technologies} stackType="application" />);
  expect(wrapper.find('Technology').exists()).toBe(false);
});

test('should render Technology when present', () => {
  const wrapper =  shallow(<StackDetailPage technologies={technologies} stackType="application" technology={technologies[0]} />);
  expect(wrapper.find('Technology').exists()).toBe(true);
});