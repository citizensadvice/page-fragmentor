import { test, expect } from '@playwright/test';

test('has the expected number of pages', async ({ page }) => {
  await page.goto('http://localhost:1234/letter_template_with_tables.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(6);
});
