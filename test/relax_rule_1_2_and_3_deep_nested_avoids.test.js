it('is two pages', async () => {
  await page.goto('http://localhost:1234/relax_rule_1_2_and_3_deep_nested_avoids.html', { waitUntil: 'load' });
  expect(await page.$$('.page')).toHaveLength(4);
});

it('starts with the correct text on each page', async () => {
  await page.goto('http://localhost:1234/relax_rule_1_2_and_3_deep_nested_avoids.html', { waitUntil: 'load' });
  expect(await page.$$eval('.page', (nodes) => nodes.map((node) => node.innerText.trim()))).toEqual([
    expect.stringMatching(/^Nam cursus/),
    expect.stringMatching(/^Nam cursus/),
    expect.stringMatching(/^Nam cursus/),
    expect.stringMatching(/^Nam cursus/),
  ]);
});
