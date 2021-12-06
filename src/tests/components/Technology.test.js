import React from 'react';
import { shallow } from 'enzyme';

import Technology from '../../components/stacks/Technology';

import technologies from '../fixtures/technologies';

test('should render Technology correctly', () => {
  const wrapper = shallow(<Technology technology={technologies[0]} />);
  expect(wrapper).toMatchSnapshot();
});