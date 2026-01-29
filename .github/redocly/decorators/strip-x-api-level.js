/**
 * Removes the `x-api-level:` tag,
 * but leaves the node/structure completely intact.
 *
 * Options:
 *  - property: string (default ‘x-api-level’)
 */

export default function StripXApiLevel(options = {}) {
  const { property = 'x-api-level' } = options;

  return {
    any: {
      enter(node) {
        if (!node || typeof node !== 'object') return;
        if (!Object.prototype.hasOwnProperty.call(node, property)) return;

        delete node[property];
      },
    },
  };
}
