let Base;

module.exports = () => [Base];

Base = `
  type Query {
    dummy: Boolean
  }

  type Mutation {
    dummy: Boolean
  }

  type Meta {
    count: Int
  }
`;
