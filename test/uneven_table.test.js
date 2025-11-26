import { test, expect } from '@playwright/test';

test('has the expected number of pages', async ({ page }) => {
  await page.goto('http://localhost:1234/uneven_table.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(24);
  expect(
    await page.$eval('.page:last-child', (page) => page.innerText),
  ).toContain('nine-hundred-ninety-nine');
});

test('copies thead', async ({ page }) => {
  await page.goto('http://localhost:1234/uneven_table.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page table > thead')).toHaveLength(24);
});
