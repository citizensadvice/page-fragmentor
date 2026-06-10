import { test, expect } from '@playwright/test';

test('is three pages', async ({ page }) => {
  await page.goto('/block_margin.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(3);
});
