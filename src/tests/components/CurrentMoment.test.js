import React from 'react';
import { shallow } from 'enzyme';
import { DateTime, Settings } from 'luxon';

import CurrentMoment from '../../components/common/CurrentMoment';

beforeEach(() => {
  Settings.now = () => 0;
});

test('should render CurrentMoment correctly', () => {
  const wrapper = shallow(<CurrentMoment />);
  expect(wrapper).toMatchSnapshot();
});

test('should render CurrentMoment with format correctly', () => {
  const wrapper = shallow(<CurrentMoment format='YYYY' />);
  expect(wrapper).toMatchSnapshot();
});