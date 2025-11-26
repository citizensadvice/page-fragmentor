import { test, expect } from '@playwright/test';

test('generates footers', async ({ page }) => {
  await page.goto('http://localhost:1234/footers.html', { waitUntil: 'load' });

  // Safari handles white space differently
  expect(
    await page.$$eval('.page .page-footer', (nodes) =>
      nodes.map((node) => node.innerText.trim().replace(/\s+/g, ' ')),
    ),
  ).toEqual([
    'First Odd Page',
    'Even Page',
    'Odd Page',
    'Even Page',
    'Odd Page',
    'Even Last Page',
  ]);
});
