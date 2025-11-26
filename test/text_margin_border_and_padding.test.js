import { test, expect } from '@playwright/test';

test('is four pages', async ({ page }) => {
  await page.goto('http://localhost:1234/text_margin_border_and_padding.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(4);
});
