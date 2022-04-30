it('is two pages', async () => {
  await page.goto('http://localhost:1234/orphan_break.html', { waitUntil: 'load' });
  expect(await page.$$('.page')).toHaveLength(3);
});

it('has the correct text on each page', async () => {
  await page.goto('http://localhost:1234/orphan_break.html', { waitUntil: 'load' });
  expect(await page.$$eval('.page', (nodes) => nodes.map((node) => node.innerText.trim()))).toEqual([
    'No break within this div',
    'Break within this',
    'Even if it looks a bit silly',
  ]);
});
