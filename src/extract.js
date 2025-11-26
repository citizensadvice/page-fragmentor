import { TableExtractor } from './extractors/table_extractor.js';
import { ListExtractor } from './extractors/list_extractor.js';
import { FragmentedExtractor } from './extractors/fragmented_extractor.js';

/**
 * Extract a range
 * If the range is part of a table
 *   - Clone headers
 *   - Switch the table to a fixed layout
 */
export function extract(range) {
  const extractors = [
    new TableExtractor(),
    new ListExtractor(),
    new FragmentedExtractor(),
  ];
  extractors.forEach((extractor) => extractor.before(range));
  const contents = range.extractContents();
  extractors.forEach((extractor) => extractor.after(contents));
  return contents;
}
