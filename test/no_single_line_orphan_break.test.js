it('is two pages', async () => {
  await page.goto('http://localhost:1234/no_single_line_orphan_break.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(2);
});

it('has the correct text on each page', async () => {
  await page.goto('http://localhost:1234/no_single_line_orphan_break.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$$eval('.page', (nodes) =>
      nodes.map((node) => node.innerText.trim()),
    ),
  ).toEqual(['No break within this div', 'No break within this either']);
});
