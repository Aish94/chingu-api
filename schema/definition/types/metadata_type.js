let MetadataType;
let MetadataSourceEnum;
let JSONScalar;

module.exports = () => [MetadataType, MetadataSourceEnum, JSONScalar];

JSONScalar = require('../scalars/json_scalar');
MetadataSourceEnum = require('../enums/metadata_source_enum');

MetadataType = `
  type Metadata {
    id: ID!
    metadata: JSON!
    metadata_source: _MetadataSource!
  }
`;
