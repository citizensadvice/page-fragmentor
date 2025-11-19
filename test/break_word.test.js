import { test, expect } from '@playwright/test';

test('is five pages', async ({ page }) => {
  await page.goto('http://localhost:1234/break_word.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(5);
});
