import { test, expect } from '@playwright/test';

test('has the expected number of pages', async ({ page }) => {
  await page.goto('/the_machine_stops.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(42);
  const lastPageText = await page.$eval(
    '.page:last-child',
    (element) => element.innerText,
  );
  expect(lastPageText).toContain('Copyright ©1947 E.M. Forster');
});

test('sets the total pages', async ({ page }) => {
  await page.goto('/the_machine_stops.html', {
    waitUntil: 'load',
  });

  expect(await page.$eval('body', (el) => el.dataset.pageCount)).toEqual('42');
  expect(
    await page.$eval('body', (el) => el.style.getPropertyValue('--page-count')),
  ).toEqual('42');
});

test('sets the page numbers', async ({ page }) => {
  await page.goto('/the_machine_stops.html', {
    waitUntil: 'load',
  });
  const pageNumbers = Array(43)
    .fill()
    .map((_, i) => String(i))
    .slice(1);

  expect(
    await page.$$eval('.page', (els) => els.map((el) => el.dataset.pageNumber)),
  ).toEqual(pageNumbers);
  expect(
    await page.$$eval('.page', (els) =>
      els.map((el) => el.style.getPropertyValue('--page-number')),
    ),
  ).toEqual(pageNumbers);
});
