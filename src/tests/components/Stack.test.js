import React from 'react';
import { shallow } from 'enzyme';

import { Stack } from '../../components/stacks/Stack';
import technologies from '../fixtures/technologies';

test('should render Stack correctly', () => {
  const wrapper = shallow(<Stack technologies={technologies} type="application" />);
  expect(wrapper).toMatchSnapshot();
});