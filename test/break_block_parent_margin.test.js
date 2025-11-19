it('is two pages', async () => {
  await page.goto('http://localhost:1234/break_block_parent_margin.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(2);
});

it('second page breaks in the expected place', async () => {
  await page.goto('http://localhost:1234/break_block_parent_margin.html', {
    waitUntil: 'load',
  });
  expect(
    await page.$eval('.page:nth-child(2)', (node) => node.innerText),
  ).toMatch(/^Seven/);
});
