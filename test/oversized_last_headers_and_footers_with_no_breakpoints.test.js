import { test, expect } from '@playwright/test';

test('is one page', async ({ page }) => {
  await page.goto(
    'http://localhost:1234/oversized_last_headers_and_footers_with_no_breakpoints.html',
    { waitUntil: 'load' },
  );
  expect(await page.$$('.page')).toHaveLength(1);
});

test('has headers and footers', async ({ page }) => {
  await page.goto(
    'http://localhost:1234/oversized_last_headers_and_footers_with_no_breakpoints.html',
    { waitUntil: 'load' },
  );

  expect(await page.$eval('.page', (node) => node.innerText)).toContain(
    'Header',
  );
  expect(await page.$eval('.page', (node) => node.innerText)).toContain(
    'Footer',
  );
});
