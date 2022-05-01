import { breakPointGenerator } from './generators/break_point_generator';
import { ruleDisablerGenerator } from './generators/rule_disabler_generator';

/**
 * Returns the range overflowing an element
 */
export function getOverflowingRange(root) {
  const breakPointIterator = breakPointGenerator(root);

  const breakPoints = [];
  let overflowing = false;
  for (const breakPoint of breakPointIterator) {
    // Always use the first forced breakpoint
    if (!overflowing && breakPoint.force && !breakPoint.overflowing) {
      const range = breakPoint.range();
      if (range) {
        return range;
      }
    }

    if (!overflowing && breakPoint.overflowing) {
      overflowing = true;

      // Find the last useable breakpoint
      // Retrying with relaxed rules
      // https://www.w3.org/TR/css-break-3/#unforced-breaks
      for (const disableRules of ruleDisablerGenerator(breakPoints)) {
        console.log(disableRules);
        for (const previousBreakPoint of breakPoints) {
          const range = previousBreakPoint.range(disableRules);
          if (range) {
            return range;
          }
        }
      }
    }

    if (!overflowing) {
      breakPoints.unshift(breakPoint);
    } else {
      // No valid break point found.  We are overflowing
      // Use the next break point with any result
      const range = breakPoint.range({ disableRules: [1, 3, 4], avoidDepth: Infinity });
      if (range) {
        return range;
      }
    }
  }

  return null;
}
