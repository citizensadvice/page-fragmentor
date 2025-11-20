import { test, expect } from '@playwright/test';

test('is two pages', async ({ page }) => {
  await page.goto('http://localhost:1234/break_inside_avoid.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(2);
});

test('does not break within the text block', async ({ page }) => {
  await page.goto('http://localhost:1234/break_inside_avoid.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$eval('.page:nth-child(2) p', (node) => node.innerText),
  ).toMatch(/^Lorem ipsum/);
});
