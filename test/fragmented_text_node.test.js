import { test, expect } from '@playwright/test';

test('is three pages', async ({ page }) => {
  await page.goto('http://localhost:1234/fragmented_text_node.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(3);
});

test('first page is not fragmented', async ({ page }) => {
  await page.goto('http://localhost:1234/fragmented_text_node.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$$('.page:nth-child(1) [data-fragmented-start="true"]'),
  ).toHaveLength(0);
  expect(
    await page.$$('.page:nth-child(1) [data-fragmented-end="true"]'),
  ).toHaveLength(0);
});

test('second page has a fragmented section', async ({ page }) => {
  await page.goto('http://localhost:1234/fragmented_text_node.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$$('.page:nth-child(2) [data-fragmented-end="true"]'),
  ).toHaveLength(0);
  expect(
    await page.$$eval(
      '.page:nth-child(2) [data-fragmented-start="true"]',
      (nodes) => nodes.map((node) => node.nodeName.toLowerCase()),
    ),
  ).toEqual(['section', 'p']);
});

test('third page section is fragmented end', async ({ page }) => {
  await page.goto('http://localhost:1234/fragmented_text_node.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$$('.page:nth-child(3) [data-fragmented-start="true"]'),
  ).toHaveLength(0);
  expect(
    await page.$$eval(
      '.page:nth-child(3) [data-fragmented-end="true"]',
      (nodes) => nodes.map((node) => node.nodeName.toLowerCase()),
    ),
  ).toEqual(['section', 'p']);
});
