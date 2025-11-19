import { test, expect } from '@playwright/test';

test('has the expected number of pages', async ({ page }) => {
  await page.goto('http://localhost:1234/letter_template.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(2);
});

test('breaks in the expected place', async ({ page }) => {
  await page.goto('http://localhost:1234/letter_template.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$eval('.page:nth-child(2)', (node) =>
      node.innerText.trim().replace(/\s+/g, ' '),
    ),
  ).toEqual('Yours sincerely Ade Visor @copyright 2020 Citizens Advice');
});
