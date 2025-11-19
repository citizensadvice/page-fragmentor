import { test, expect } from '@playwright/test';

test('has the expected number of pages', async ({ page }) => {
  await page.goto('http://localhost:1234/widows.html', { waitUntil: 'load' });
  expect(await page.$$('.page')).toHaveLength(3);
});

test('breaks the second paragraph onto a new page', async ({ page }) => {
  await page.goto('http://localhost:1234/widows.html', { waitUntil: 'load' });
  expect(
    await page.$eval('.page:nth-child(2) p', (node) => node.innerText),
  ).toMatch(/^ante magna pellentesque lectus/);
});
