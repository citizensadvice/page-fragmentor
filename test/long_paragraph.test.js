import { test, expect } from '@playwright/test';

test('creates all pages', async ({ page }) => {
  await page.goto('/long_paragraph.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(9);
  expect(
    await page.$eval('.page:last-child', (page) => page.innerText),
  ).toContain('nine-hundred-ninety-nine');
});
