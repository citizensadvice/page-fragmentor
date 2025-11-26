function* depths(breakPoints) {
  // The node rules are the same cached instance on every breakpoint
  const max = breakPoints[0].nodeRules.maxDepth();
  for (let i = 0; i <= max; i += 1) {
    yield i;
  }
}

/**
 * Yields rule disabling settings
 * See https://www.w3.org/TR/css-break-3/#unforced-breaks
 */
export function* ruleDisablerGenerator(breakPoints) {
  // No rule disabling
  yield { disableRules: [] };

  yield { disableRules: [3] };

  for (const avoidDepth of depths(breakPoints)) {
    yield { disableRules: [3], avoidDepth };

    // Also relax break-before and break-after
    // While progressively relaxing more avoid rules
    yield { disableRules: [1, 3], avoidDepth };

    // Also relax break-inside on line boxes
    yield { disableRules: [1, 3, 4], avoidDepth };
  }
}
