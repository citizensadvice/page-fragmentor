import { test, expect } from '@playwright/test';

test('is four pages', async ({ page }) => {
  await page.goto('http://localhost:1234/text_with_inline.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(4);
});

test('breaks the second page with the text', async ({ page }) => {
  await page.goto('http://localhost:1234/text_with_inline.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$eval('.page:nth-child(2)', (node) => node.innerText),
  ).toContain('malesuada tellus ultricies');
});

test('breaks the fourth page before the span', async ({ page }) => {
  await page.goto('http://localhost:1234/text_with_inline.html', {
    waitUntil: 'load',
  });
  expect(await page.$('.page:nth-child(3) p > span')).toBeFalsy();
  expect(await page.$('.page:nth-child(4) p > span')).toBeTruthy();
});
