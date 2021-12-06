const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_TECHNOLOGIES':
      return action.technologies;
    default:
      return state;
  };
};
