import { test, expect } from '@playwright/test';

test('is two pages', async ({ page }) => {
  await page.goto(
    'http://localhost:1234/oversized_last_headers_and_footers.html',
    { waitUntil: 'load' },
  );
  expect(await page.$$('.page')).toHaveLength(2);
});

test('has no content on last page', async ({ page }) => {
  await page.goto(
    'http://localhost:1234/oversized_last_headers_and_footers.html',
    { waitUntil: 'load' },
  );

  expect(
    await page.$eval(
      '.page:last-child .page-content',
      (node) => node.innerText,
    ),
  ).toEqual('');
});

test('has headers and footers only on last page', async ({ page }) => {
  await page.goto(
    'http://localhost:1234/oversized_last_headers_and_footers.html',
    { waitUntil: 'load' },
  );

  expect(
    await page.$eval('.page:first-child', (node) => node.innerText),
  ).not.toContain('Header');
  expect(
    await page.$eval('.page:nth-child(2)', (node) => node.innerText),
  ).toContain('Header');

  expect(
    await page.$eval('.page:first-child', (node) => node.innerText),
  ).not.toContain('Footer');
  expect(
    await page.$eval('.page:nth-child(2)', (node) => node.innerText),
  ).toContain('Footer');
});
