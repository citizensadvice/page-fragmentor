import { test, expect } from '@playwright/test';

test('is three pages', async ({ page }) => {
  await page.goto('/text_node.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(3);
});
