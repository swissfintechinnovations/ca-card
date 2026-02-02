
export default function reorder(config = {}) {
  const schemasEnabled = config?.schemas ?? false;
  const rootEnabled = config?.root ?? false;
  const parametersEnabled = config?.parameters ?? false;

  if (schemasEnabled) {
    return sortSchemaProperties(config?.schemas);
  }
  if (rootEnabled) {
    return sortRoot(config?.root);
  }
  if (parametersEnabled) {
    return sortParameters(config?.parameters);
  }

}

/**
 * Reorders schema.properties:
 * - required properties first (alphabetical)
 * - then optional properties (alphabetical)
 * Also sorts schema.required alphabetically.
 */
function sortSchemaProperties(/* options */) {
  return {
    Schema: {
      leave(schema) {
        if (!schema || typeof schema !== 'object') return;
        if (!schema.properties || typeof schema.properties !== 'object') return;

        const props = schema.properties;
        const propNames = Object.keys(props);

        // Normalize required -> array of strings
        const required = Array.isArray(schema.required)
          ? schema.required.filter((x) => typeof x === 'string')
          : [];

        // Sort required list itself (nice + stable)
        const requiredSorted = [...new Set(required)].sort((a, b) => a.localeCompare(b));
        if (requiredSorted.length) schema.required = requiredSorted;

        const requiredSet = new Set(requiredSorted);

        // Only order names that actually exist in properties
        const requiredInProps = propNames
          .filter((name) => requiredSet.has(name))
          .sort((a, b) => a.localeCompare(b));

        const optional = propNames
          .filter((name) => !requiredSet.has(name))
          .sort((a, b) => a.localeCompare(b));

        const orderedNames = [...requiredInProps, ...optional];

        // Rebuild properties object in the desired order
        const orderedProps = {};
        for (const name of orderedNames) orderedProps[name] = props[name];

        schema.properties = orderedProps;
      },
    },
  };
}
