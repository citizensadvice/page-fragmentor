import { test, expect } from '@playwright/test';

test('is two pages', async ({ page }) => {
  await page.goto('/relax_rule_3.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(2);
});
