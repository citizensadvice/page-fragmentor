it('is three pages', async () => {
  await page.goto('http://localhost:1234/relax_rule_1_2_3_and_4_nested_avoids.html', { waitUntil: 'load' });
  expect(await page.$$('.page')).toHaveLength(2);
});

it('breaks before the headings', async () => {
  await page.goto('http://localhost:1234/relax_rule_1_2_3_and_4_nested_avoids.html', { waitUntil: 'load' });
  expect(await page.$eval('.page:nth-child(2)', (node) => node.innerText)).toMatch(/^zero/);
});
