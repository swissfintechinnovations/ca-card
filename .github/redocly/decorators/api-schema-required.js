/**
 * Redocly Decorator: api-level/schema-required
 *
 * Transforms only schema objects (including component schemas, inline schemas, schemas in requests/responses, etc.)
 * Rule:
 *  - properties.<prop>.x-required: 2  => in Level 2, <prop> must be in schema.required
 *  - in Level 1, <prop> must NOT be in schema.required
 *
 * Options:
 *  - level: 1 | 2  (required)
 *  - marker: string (default: ‘x-required’)
 *  - markerLevel: number (default: 2)
 *  - stripMarker: boolean (default: true) => removes marker property after application
 */

export default function ApiSchemaRequired(options = {}) {
  const {
    level,
    marker = 'x-required',
    markerLevel = 2,
    stripMarker = true,
  } = options;

  if (level !== 1 && level !== 2) {
    throw new Error(`[sfti/schema-required] option "level" must be 1 or 2, got: ${level}`);
  }

  function normalizeRequired(schema) {
    if (!schema.required) return [];
    if (!Array.isArray(schema.required)) return [];
    return Array.from(new Set(schema.required.filter((x) => typeof x === 'string')));
  }

  function isLevelRequired(propSchema) {
    if (!propSchema || typeof propSchema !== 'object') return false;
    const v = propSchema[marker];
    if (v === undefined || v === null) return false;
    return Number(v) === Number(markerLevel);
  }

  function maybeStripMarker(propSchema) {
    if (!stripMarker) return;
    if (propSchema && typeof propSchema === 'object' && Object.prototype.hasOwnProperty.call(propSchema, marker)) {
      delete propSchema[marker];
    }
  }

  return {
    Schema: {
      leave(schema) {
        if (!schema || typeof schema !== 'object') return;

        const props = schema.properties;
        if (!props || typeof props !== 'object') return;

        const flagged = [];
        for (const [propName, propSchema] of Object.entries(props)) {
          if (isLevelRequired(propSchema)) {
            flagged.push(propName);
          }
        }

        if (flagged.length === 0) return;

        const req = normalizeRequired(schema);

        if (level === 2) {
          for (const p of flagged) req.push(p);
          schema.required = Array.from(new Set(req));
        } else {
          const setFlagged = new Set(flagged);
          const next = req.filter((p) => !setFlagged.has(p));
          if (next.length > 0) schema.required = next;
          else delete schema.required;
        }

        for (const p of flagged) {
          maybeStripMarker(props[p]);
        }
      },
    },
  };
}
