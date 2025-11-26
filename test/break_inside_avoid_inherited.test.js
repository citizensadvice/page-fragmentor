import { test, expect } from '@playwright/test';

test('is two pages', async ({ page }) => {
  await page.goto('http://localhost:1234/break_inside_avoid_inherited.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(3);
});

test('does not break within the text block', async ({ page }) => {
  await page.goto('http://localhost:1234/break_inside_avoid_inherited.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$eval('.page:nth-child(2) p', (node) => node.innerText),
  ).toMatch(/^Lorem ipsum/);
  expect(
    await page.$eval('.page:nth-child(3) p', (node) => node.innerText),
  ).toMatch(/^Lorem ipsum/);
});

test('does break between siblings', async ({ page }) => {
  await page.goto('http://localhost:1234/break_inside_avoid_inherited.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page:nth-child(3) p')).toHaveLength(2);
});
