import { test, expect } from '@playwright/test';

test('sort products low to high', async ({ page }) => {
  // 1. OPEN website
  await page.goto('https://www.saucedemo.com/');

  // 2. LOGIN
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  // 3. CHANGE SORT (Low → High)
  await page.selectOption('.product_sort_container', 'lohi');

  // 4. GET ALL PRICES
  const prices = await page.locator('.inventory_item_price').allTextContents();

  // 5. CLEAN PRICES (remove $ sign)
  const numericPrices = prices.map(price => Number(price.replace('$', '')));

  console.log('Prices:', numericPrices);

  // 6. ASSERT FIRST PRICE IS THE LOWEST
  const sortedPrices = [...numericPrices].sort((a, b) => a - b);

  expect(numericPrices[0]).toBe(sortedPrices[0]);
});