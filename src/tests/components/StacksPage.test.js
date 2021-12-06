import React from 'react';
import { shallow } from 'enzyme';

import StacksPage from '../../components/stacks/StacksPage';

test('should render StacksPage correctly', () => {
  const wrapper = shallow(<StacksPage />);
  expect(wrapper).toMatchSnapshot();
});