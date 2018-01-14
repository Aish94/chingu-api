let MetadataType;
let JSONScalar;

module.exports = () => [MetadataType, JSONScalar];

JSONScalar = require('../scalars/json_scalar');

MetadataType = `
  type Metadata {
    id: ID!
    metadata: JSON!
    metadata_source: String!
  }
`;
