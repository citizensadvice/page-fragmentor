import { test, expect } from '@playwright/test';

test('is two pages', async ({ page }) => {
  await page.goto('http://localhost:1234/break_inside_avoid_blocks.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(2);
});

test('does not break between the div blocks', async ({ page }) => {
  await page.goto('http://localhost:1234/break_inside_avoid_blocks.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page:nth-child(1) .block')).toHaveLength(0);
  expect(await page.$$('.page:nth-child(2) .block')).toHaveLength(3);
});
