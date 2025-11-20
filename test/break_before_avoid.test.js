import { test, expect } from '@playwright/test';

test('is two pages', async ({ page }) => {
  await page.goto('http://localhost:1234/break_before_avoid.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(2);
});

test('breaks within the text block', async ({ page }) => {
  await page.goto('http://localhost:1234/break_before_avoid.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$eval('.page:nth-child(2) p', (node) => node.innerText),
  ).toMatch(/^Vestibulum quis lacus nec purus gravida placerat eu ac urna/);
});
