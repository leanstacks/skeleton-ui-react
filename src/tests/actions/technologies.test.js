import { setTechnologies } from '../../actions/technologies';

import technologies from '../fixtures/technologies';

test('should setup setTechnologies action object', () => {
  const action = setTechnologies(technologies);

  expect(action).toEqual({
    type: 'SET_TECHNOLOGIES',
    technologies
  });
});