import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import mockAxios from 'axios';

import { 
  setTechnologies,
  startSetTechnologies
} from '../../actions/technologies';

import technologies from '../fixtures/technologies';

const defaultState = {
  technologies: []
};
const createMockStore = configureMockStore([thunk]);

test('should setup setTechnologies action object', () => {
  const action = setTechnologies(technologies);

  expect(action).toEqual({
    type: 'SET_TECHNOLOGIES',
    technologies
  });
});

test('should fetch technologies from API', (done) => {
  const store = createMockStore(defaultState);
  mockAxios.request.mockImplementationOnce(() => 
    Promise.resolve({
      data: technologies
    })
  );

  store.dispatch(startSetTechnologies()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_TECHNOLOGIES',
      technologies
    });

    done();
  });
});