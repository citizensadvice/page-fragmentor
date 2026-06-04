import { test, expect } from '@playwright/test';

test('is two pages', async ({ page }) => {
  await page.goto('/relax_rule_1_2_3_and_4.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(2);
});
