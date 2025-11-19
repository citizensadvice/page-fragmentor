import { test, expect } from '@playwright/test';

test('has the expected number of pages', async ({ page }) => {
  await page.goto('http://localhost:1234/orphans.html', { waitUntil: 'load' });
  expect(await page.$$('.page')).toHaveLength(4);
});

test('breaks the second paragraph onto a new page', async ({ page }) => {
  await page.goto('http://localhost:1234/orphans.html', { waitUntil: 'load' });
  expect(await page.$$('.page:first-child p')).toHaveLength(1);
  expect(await page.$$('.page:nth-child(2) p')).toHaveLength(1);
});

test('breaks the 4th paragraph with 5 orphans', async ({ page }) => {
  await page.goto('http://localhost:1234/orphans.html', { waitUntil: 'load' });
  expect(
    await page.$eval('.page:nth-child(4) p', (node) => node.innerText),
  ).toMatch(/^ultricies nisl risus nec tellus./);
});
