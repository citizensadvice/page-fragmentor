it('is three pages', async () => {
  await page.goto('http://localhost:1234/fragmented_element_node.html', { waitUntil: 'load' });
  expect(await page.$$('.page')).toHaveLength(3);
});

it('first page section is not fragmented', async () => {
  await page.goto('http://localhost:1234/fragmented_element_node.html', { waitUntil: 'load' });
  expect(await page.$eval('.page:nth-child(1) section', (node) => node.dataset.fragmentedStart)).toEqual(undefined);
  expect(await page.$eval('.page:nth-child(1) section', (node) => node.dataset.fragmentedEnd)).toEqual(undefined);
});

it('second page first section is not fragmented', async () => {
  await page.goto('http://localhost:1234/fragmented_element_node.html', { waitUntil: 'load' });
  expect(await page.$eval('.page:nth-child(2) section:nth-child(1)', (node) => node.dataset.fragmentedStart)).toEqual(undefined);
  expect(await page.$eval('.page:nth-child(2) section:nth-child(1)', (node) => node.dataset.fragmentedEnd)).toEqual(undefined);
});

it('second page second section container is fragmented start', async () => {
  await page.goto('http://localhost:1234/fragmented_element_node.html', { waitUntil: 'load' });
  expect(await page.$eval('.page:nth-child(2) section:nth-child(2)', (node) => node.dataset.fragmentedStart)).toEqual('true');
  expect(await page.$eval('.page:nth-child(2) section:nth-child(2)', (node) => node.dataset.fragmentedEnd)).toEqual(undefined);
});

it('third page section is fragmented end', async () => {
  await page.goto('http://localhost:1234/fragmented_text_node.html', { waitUntil: 'load' });
  expect(await page.$eval('.page:nth-child(3) section:first-child', (node) => node.dataset.fragmentedStart)).toEqual(undefined);
  expect(await page.$eval('.page:nth-child(3) section:first-child', (node) => node.dataset.fragmentedEnd)).toEqual('true');
});
