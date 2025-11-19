it('has the expected number of pages', async () => {
  await page.goto('http://localhost:1234/css_table.html', {
    waitUntil: 'load',
  });
  expect(await page.$$('.page')).toHaveLength(22);
  expect(
    await page.$eval('.page:last-child', (page) => page.innerText),
  ).toContain('nine-hundred-ninety-nine');
});
