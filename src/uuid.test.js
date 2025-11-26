import test from 'node:test';
import assert from 'node:assert';
import { uuid } from './uuid.js';

test('generates a uuidv4', () => {
  assert.match(
    uuid(),
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
  );
});

test('generates unique uuids', () => {
  assert.notEqual(uuid(), uuid());
});
