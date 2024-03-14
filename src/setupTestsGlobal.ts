// runs before all test suites
// see: https://jestjs.io/docs/configuration#globalsetup-string

export {};

module.exports = async () => {
  process.env.TZ = 'UTC';
};
