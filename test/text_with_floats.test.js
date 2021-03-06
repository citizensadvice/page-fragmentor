it('is three pages', async () => {
  await page.goto('http://localhost:1234/text_with_floats.html', { waitUntil: 'load' });
  expect(await page.$$('.page')).toHaveLength(3);
});

it('it breaks on the images', async () => {
  await page.goto('http://localhost:1234/text_with_floats.html', { waitUntil: 'load' });
  expect(await page.$eval('.page:nth-child(2) .page-content p:first-child', (node) => node.firstChild.nodeName)).toEqual('IMG');
  expect(await page.$eval('.page:nth-child(3) .page-content p:first-child', (node) => node.firstChild.nodeName)).toEqual('IMG');
});
