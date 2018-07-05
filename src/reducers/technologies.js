const defaultState = {
  technologies: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_TECHNOLOGIES':
      return {
        technologies: action.technologies
      };
    default:
      return state;
  };
};
