import React from 'react';
import { shallow } from 'enzyme';

import CurrentMoment from '../../components/CurrentMoment';

test('should render CurrentMoment correctly', () => {
  const wrapper =  shallow(<CurrentMoment />);
  expect(wrapper).toMatchSnapshot();
});

test('should render CurrentMoment with format correctly', () => {
  const wrapper = shallow(<CurrentMoment format='YYYY' />);
  expect(wrapper).toMatchSnapshot();
});