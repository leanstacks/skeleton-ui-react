const moment = require.requireActual('moment');

const now = () => {
  return 0;
};
moment.now = now;

export default moment;
