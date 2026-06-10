import { test, expect } from '@playwright/test';

test('break word example', async ({ page }) => {
  await page.goto('/break_word.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(6);
});
