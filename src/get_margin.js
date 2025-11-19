function getMeasurement(style, prop) {
  return parseFloat(style.getPropertyValue(prop)) || 0;
}

function collapseMargins(style) {
  return (
    !getMeasurement(style, 'padding-bottom') &&
    !getMeasurement(style, 'border-bottom-width') &&
    !style.display.includes('inline') &&
    style.overflow === 'visible' &&
    style.float === 'none'
  );
}

function collapsedMargins(margins) {
  return Math.max(
    0,
    Math.max(0, ...margins.filter((v) => v >= 0)) +
      Math.min(0, ...margins.filter((v) => v < 0)),
  );
}

/**
 * Calculate the space required by margins, padding and border of the ancestor elements
 */
export function getMargin(node, root, includeInner) {
  let bottom = 0;
  let cursor = node.parentNode;
  let style =
    node.nodeType === Node.ELEMENT_NODE
      ? window.getComputedStyle(node)
      : { getPropertyValue: () => 0 };
  let margins = [getMeasurement(style, 'margin-bottom')];

  if (includeInner) {
    bottom += getMeasurement(style, 'padding-bottom');
    bottom += getMeasurement(style, 'border-bottom-width');
  }

  while (cursor && !cursor.contains(root)) {
    style = window.getComputedStyle(cursor);
    if (collapseMargins(style)) {
      margins.push(getMeasurement(style, 'margin-bottom'));
    } else {
      bottom += collapsedMargins(margins);
      margins = [getMeasurement(style, 'margin-bottom')];
      bottom += getMeasurement(style, 'padding-bottom');
      bottom += getMeasurement(style, 'border-bottom-width');
    }
    cursor = cursor.parentNode;
  }
  bottom += collapsedMargins(margins);
  return bottom;
}
