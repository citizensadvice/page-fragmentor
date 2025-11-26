import { test, expect } from '@playwright/test';

test('has the expected number of pages', async ({ page }) => {
  await page.goto('http://localhost:1234/reversed_ordered_list.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(5);
});

test('sets the list start', async ({ page }) => {
  await page.goto('http://localhost:1234/reversed_ordered_list.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$$eval('.page ol', (els) => els.map((el) => el.start)),
  ).toEqual([154, 119, 85, 49, 14]);
});
