import ApiSchemaRequired from './decorators/api-schema-required.js';
import StripXApiLevel from './decorators/strip-x-api-level.js';
import Reorder from './decorators/reorder.js';

export default function apiLevelPlugin() {
  return {
    id: 'sfti',
    decorators: {
      oas3: {
        'schema-required': ApiSchemaRequired,
        'strip-x-api-level': StripXApiLevel,
        'reorder': Reorder,
      },
    },
  };
}
