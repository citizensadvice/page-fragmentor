import { test, expect } from '@playwright/test';

test('is four pages', async ({ page }) => {
  await page.goto('http://localhost:1234/inline_break_inside_avoid.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(2);
});

test('breaks within the inline block', async ({ page }) => {
  await page.goto('http://localhost:1234/inline_break_inside_avoid.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$eval('.page:nth-child(1) b', (node) => node.innerText),
  ).toEqual('Break within');
  expect(
    await page.$eval('.page:nth-child(2) b', (node) => node.innerText),
  ).toEqual('me is fine');
});
