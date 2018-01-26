let DateScalar;

module.exports = () => [DateScalar];
/**
 * TODO: fix this scalar currently returning the following error
 * Error: Expected a value of type "Date" but received: Wed Dec 13 2017 03:59:24 GMT-0500 (EST)
 */
DateScalar = `
  scalar Date
`;
