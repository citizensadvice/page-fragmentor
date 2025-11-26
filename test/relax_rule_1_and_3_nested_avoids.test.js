import { test, expect } from '@playwright/test';

test('is three pages', async ({ page }) => {
  await page.goto(
    'http://localhost:1234/relax_rule_1_and_3_nested_avoids.html',
    { waitUntil: 'load' },
  );
  expect(await page.$$('.page')).toHaveLength(3);
});

test('does not break before the headings', async ({ page }) => {
  await page.goto(
    'http://localhost:1234/relax_rule_1_and_3_nested_avoids.html',
    { waitUntil: 'load' },
  );
  expect(
    await page.$eval('.page:nth-child(2)', (node) => node.innerText),
  ).toMatch(/^Heading/);
});
