import { test, expect } from '@playwright/test';

test('is two pages', async ({ page }) => {
  await page.goto('http://localhost:1234/break_inline_parent_margin.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(2);
});

test('second page breaks in the expected place', async ({ page }) => {
  await page.goto('http://localhost:1234/break_inline_parent_margin.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page:nth-child(1) p')).toHaveLength(4);
  expect(await page.$$('.page:nth-child(2) p')).toHaveLength(3);
  expect(
    await page.$eval('.page:nth-child(2)', (node) => node.innerText),
  ).toMatch(/^incididunt ut labore et dolore magna aliqua/);
});
