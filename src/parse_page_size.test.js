import test, { suite } from 'node:test';
import assert from 'node:assert';
import { parsePageSize } from './parse_page_size.js';

suite('no value', () => {
  test('parses an empty string to A4 portrait', () => {
    assert.deepEqual(parsePageSize(''), ['210mm', '297mm']);
  });

  test('parses a whitespace string to A4 portrait', () => {
    assert.deepEqual(parsePageSize(' '), ['210mm', '297mm']);
  });
});

suite('auto', () => {
  test('parses auto to A4 portrait', () => {
    assert.deepEqual(parsePageSize('auto'), ['210mm', '297mm']);
  });
});

suite('named sizes', () => {
  test('parses "portrait" to A4 portrait', () => {
    assert.deepEqual(parsePageSize('auto'), ['210mm', '297mm']);
  });

  test('parses "landscape" to A4 landscape', () => {
    assert.deepEqual(parsePageSize('landscape'), ['297mm', '210mm']);
  });

  test('parses "A4" to A4 portrait', () => {
    assert.deepEqual(parsePageSize('A4'), ['210mm', '297mm']);
  });

  test('parses "A4 portrait" to A4 portrait', () => {
    assert.deepEqual(parsePageSize('A4 portrait'), ['210mm', '297mm']);
  });

  test('parses " A4 portrait" to A4 portait', () => {
    assert.deepEqual(parsePageSize(' A4 portrait'), ['210mm', '297mm']);
  });

  test('parses "A4  portrait" to A4 portait', () => {
    assert.deepEqual(parsePageSize(' A4 portrait'), ['210mm', '297mm']);
  });

  test('parses "A4 landscape" to A4 landscape', () => {
    assert.deepEqual(parsePageSize('A4 landscape'), ['297mm', '210mm']);
  });

  test('parses "A5" to A5 portrait', () => {
    assert.deepEqual(parsePageSize('A5'), ['148mm', '210mm']);
  });

  test('parses "A5 landscape" to A5 landscape', () => {
    assert.deepEqual(parsePageSize('A5 landscape'), ['210mm', '148mm']);
  });

  test('parses "A3" to A3 portrait', () => {
    assert.deepEqual(parsePageSize('A3'), ['297mm', '420mm']);
  });

  test('parses "B5" to B5 portrait', () => {
    assert.deepEqual(parsePageSize('B5'), ['176mm', '250mm']);
  });

  test('parses "B4" to B4 portrait', () => {
    assert.deepEqual(parsePageSize('B4'), ['250mm', '353mm']);
  });

  test('parses "JIS-B5" to JIS-B5 portrait', () => {
    assert.deepEqual(parsePageSize('JIS-B5'), ['182mm', '257mm']);
  });

  test('parses "JIS-B4" to JIS-B4 portrait', () => {
    assert.deepEqual(parsePageSize('JIS-B4'), ['257mm', '364mm']);
  });

  test('parses "letter" to letter portrait', () => {
    assert.deepEqual(parsePageSize('letter'), ['8.5in', '11in']);
  });

  test('parses "legal" to legal portrait', () => {
    assert.deepEqual(parsePageSize('legal'), ['8.5in', '14in']);
  });

  test('parses "ledger" to ledger portrait', () => {
    assert.deepEqual(parsePageSize('ledger'), ['11in', '17in']);
  });
});

suite('two lengths', () => {
  test('parses to an array', () => {
    assert.deepEqual(parsePageSize('14cm 15cm'), ['14cm', '15cm']);
  });

  test('parses with extra white space', () => {
    assert.deepEqual(parsePageSize('14cm  15cm'), ['14cm', '15cm']);
  });
});

suite('one length', () => {
  test('parses to an array', () => {
    assert.deepEqual(parsePageSize('14cm'), ['14cm', '14cm']);
  });
});
