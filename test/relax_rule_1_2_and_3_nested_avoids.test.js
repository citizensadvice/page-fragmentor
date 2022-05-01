it('is two pages', async () => {
  await page.goto('http://localhost:1234/relax_rule_1_2_and_3_nested_avoids.html', { waitUntil: 'load' });
  expect(await page.$$('.page')).toHaveLength(2);
});

it('does not break within the dl item', async () => {
  await page.goto('http://localhost:1234/relax_rule_1_2_and_3_nested_avoids.html', { waitUntil: 'load' });
  expect(await page.$eval('.page:nth-child(2)', (node) => node.innerText)).toMatch(/^5. Lorem ipsum/);
});
