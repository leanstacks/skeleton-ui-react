const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PREFERENCES':
      return action.preferences;
    case 'EDIT_PREFERENCES':
      return {
        ...state,
        ...action.updates
      };
    default:
      return state;
  };
};
