import { test, expect } from '@playwright/test';

test('logout works', async ({ page }) => {
  // 1. OPEN site
  await page.goto('https://www.saucedemo.com/');

  // 2. LOGIN
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  // 3. OPEN MENU (☰ button)
  await page.locator('#react-burger-menu-btn').click();

  // 4. CLICK LOGOUT
  await page.getByText('Logout').click();

  // 5. ASSERT back to login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  // extra check (login button visible)
  await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
});
import { defineConfig } from '@playwright/test';

