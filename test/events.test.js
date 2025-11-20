import { test, expect } from '@playwright/test';

test('fires create-page events', async ({ page }) => {
  await page.addInitScript(() => {
    window.addEventListener('create-page', (e) => {
      window.createPageEvents = window.createPageEvents || [];
      window.createPageEvents.push(e);
    });
  });
  await page.goto('http://localhost:1234/the_machine_stops.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$$eval('.page', (pages) =>
      pages.map(
        (page, index) => window.createPageEvents[index].target === page,
      ),
    ),
  ).toEqual(Array(41).fill(true));
});

test('fires before-fragmenation events', async ({ page }) => {
  await page.addInitScript(() => {
    window.addEventListener('before-fragmentation', (e) => {
      window.beforeFragmentationEvents = window.beforeFragmentationEvents || [];
      window.beforeFragmentationEvents.push(e);
    });
  });
  await page.goto('http://localhost:1234/the_machine_stops.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$$eval('.page', (pages) =>
      pages
        .slice(0, -1)
        .map(
          (page, index) =>
            window.beforeFragmentationEvents[index].target === page &&
            window.beforeFragmentationEvents[index].detail instanceof Range,
        ),
    ),
  ).toEqual(Array(40).fill(true));
});

test('fires after-fragmenation events', async ({ page }) => {
  await page.addInitScript(() => {
    window.addEventListener('after-fragmentation', (e) => {
      window.afterFragmentationEvents = window.afterFragmentationEvents || [];
      window.afterFragmentationEvents.push(e);
    });
  });
  await page.goto('http://localhost:1234/the_machine_stops.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$$eval('.page', (pages) =>
      pages
        .slice(0, -1)
        .map(
          (page, index) =>
            window.afterFragmentationEvents[index].target === page &&
            window.afterFragmentationEvents[index].detail instanceof
              DocumentFragment,
        ),
    ),
  ).toEqual(Array(40).fill(true));
});

test('fires the fragmenation-finished event', async ({ page }) => {
  await page.addInitScript(() => {
    window.addEventListener('fragmentation-finished', (e) => {
      window.fragmenationFinishedEvents =
        window.fragmentationFinishedEvents || [];
      window.fragmenationFinishedEvents.push(e);
    });
  });
  await page.goto('http://localhost:1234/the_machine_stops.html', {
    waitUntil: 'load',
  });
  expect(
    await page.evaluate(() => window.fragmenationFinishedEvents.length === 1),
  ).toEqual(true);
});
