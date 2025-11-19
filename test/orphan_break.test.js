import { test, expect } from '@playwright/test';

test('is two pages', async ({ page }) => {
  await page.goto('http://localhost:1234/orphan_break.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(3);
});

test('has the correct text on each page', async ({ page }) => {
  await page.goto('http://localhost:1234/orphan_break.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$$eval('.page', (nodes) =>
      nodes.map((node) => node.innerText.trim()),
    ),
  ).toEqual([
    'No break within this div',
    'Break within this',
    'Even if it looks a bit silly',
  ]);
});
