it('is three pages', async () => {
  await page.goto('http://localhost:1234/fragmented_element_node.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(3);
});

it('first page is not fragmented', async () => {
  await page.goto('http://localhost:1234/fragmented_element_node.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$$('.page:nth-child(1) [data-fragmented-start="true"]'),
  ).toHaveLength(0);
  expect(
    await page.$$('.page:nth-child(1) [data-fragmented-end="true"]'),
  ).toHaveLength(0);
});

it('second page has a fragmented section', async () => {
  await page.goto('http://localhost:1234/fragmented_element_node.html', {
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
  ).toEqual(['div', 'section']);
});

it('third page section is fragmented end', async () => {
  await page.goto('http://localhost:1234/fragmented_element_node.html', {
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
  ).toEqual(['div', 'section']);
});
