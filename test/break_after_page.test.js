import { test, expect } from '@playwright/test';

test('is three pages', async ({ page }) => {
  await page.goto('http://localhost:1234/break_after_page.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(3);
});
