import { test, expect } from '@playwright/test';

test('is one page', async ({ page }) => {
  await page.goto('http://localhost:1234/disable_line_box_breaking.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(1);
});
