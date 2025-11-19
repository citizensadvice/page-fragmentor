const rNamedSize =
  /^(A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger|landscape|portrait)(?:\s+(landscape|portrait)$)?/i;

const SIZES = {
  a5: ['148mm', '210mm'],
  a4: ['210mm', '297mm'],
  a3: ['297mm', '420mm'],
  b5: ['176mm', '250mm'],
  b4: ['250mm', '353mm'],
  'jis-b5': ['182mm', '257mm'],
  'jis-b4': ['257mm', '364mm'],
  letter: ['8.5in', '11in'],
  legal: ['8.5in', '14in'],
  ledger: ['11in', '17in'],
};

// https://www.w3.org/TR/css-page-3/#page-size-prop
export function parsePageSize(size) {
  size = size.trim().toLowerCase(); // eslint-disable-line no-param-reassign
  if (!size || size === 'auto') {
    return SIZES.a4;
  }
  const match = rNamedSize.exec(size);
  if (!match) {
    const parts = size.split(/\s+/);
    if (parts.length === 1) {
      parts.push(parts[0]);
    }
    return parts;
  }
  let [, namedSize, orientation] = match;
  if (['portrait', 'landscape'].includes(namedSize)) {
    orientation = namedSize;
    namedSize = 'a4';
  }
  const matchedSize = [...SIZES[namedSize]];
  if (orientation === 'landscape') {
    matchedSize.reverse();
  }
  return matchedSize;
}
