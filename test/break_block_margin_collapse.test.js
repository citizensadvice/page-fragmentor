import { test, expect } from '@playwright/test';

test('is three pages', async ({ page }) => {
  await page.goto('/break_block_margin_collapse.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(3);
});

test('the page breaks in the expected places', async ({ page }) => {
  await page.goto('/break_block_margin_collapse.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$$eval('.page', (nodes) =>
      nodes.map((node) => node.innerText.trim()),
    ),
  ).toEqual([
    expect.stringMatching(/^The margins should be collapsed/),
    expect.stringMatching(/^Lorem ipsum dolor sit amet/),
    expect.stringMatching(/^incididunt ut labore et dolore magna ali/),
  ]);
});
