import { test, expect } from '@playwright/test';

test('has the expected number of pages', async ({ page }) => {
  await page.goto('http://localhost:1234/table_with_caption.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(2);
});

test('breaks the table onto the second page', async ({ page }) => {
  await page.goto('http://localhost:1234/table_with_caption.html', {
    waitUntil: 'load',
  });
  expect(await page.$('.page:first-child caption')).toBeFalsy();
  expect(await page.$('.page:last-child caption')).toBeTruthy();
});
