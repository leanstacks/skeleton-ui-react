import React from 'react';
import { shallow } from 'enzyme';

import BusyIndicator from '../../components/common/BusyIndicator';

test('should render BusyIndicator correctly', () => {
  const wrapper = shallow(<BusyIndicator />);
  expect(wrapper).toMatchSnapshot();
});