import technologiesReducer from '../../reducers/technologies';

import technologies from '../fixtures/technologies';

test('should setup default technologies state', () => {
  const state = technologiesReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual([]);
});

test('should set technologies to value', () => {
  const currentState = [];
  const action = {
    type: 'SET_TECHNOLOGIES',
    technologies
  };
  const state = technologiesReducer(currentState, action);

  expect(state).toEqual(technologies);
});