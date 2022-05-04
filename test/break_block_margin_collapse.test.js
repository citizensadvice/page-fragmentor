it('is three pages', async () => {
  await page.goto('http://localhost:1234/break_block_margin_collapse.html', { waitUntil: 'load' });
  expect(await page.$$('.page')).toHaveLength(3);
});

it('the page breaks in the expected places', async () => {
  await page.goto('http://localhost:1234/break_block_margin_collapse.html', { waitUntil: 'load' });
  expect(await page.$$eval('.page', (nodes) => nodes.map((node) => node.innerText.trim()))).toEqual([
    expect.stringMatching(/^The margins should be collapsed/),
    expect.stringMatching(/^Lorem ipsum dolor sit amet/),
    expect.stringMatching(/^quis nostrud exercitation ullamco laboris nisi ut/),
  ]);
});
