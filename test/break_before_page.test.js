import { test, expect } from '@playwright/test';

test('is two pages', async ({ page }) => {
  await page.goto('http://localhost:1234/break_before_page.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(2);
});
