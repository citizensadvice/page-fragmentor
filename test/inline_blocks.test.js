import { test, expect } from '@playwright/test';

test('is four pages', async ({ page }) => {
  await page.goto('http://localhost:1234/inline_blocks.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(4);
});

test('breaks the first page after 10 boxes', async ({ page }) => {
  await page.goto('http://localhost:1234/inline_blocks.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page:nth-child(1) span')).toHaveLength(10);
});

test('breaks the third page after 10 boxes', async ({ page }) => {
  await page.goto('http://localhost:1234/inline_blocks.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page:nth-child(3) span')).toHaveLength(10);
});
