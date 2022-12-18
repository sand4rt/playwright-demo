import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' });

test.describe('Login', () => {
  test('create login cookie', async ({ page }) => {
    await page.goto('/wp-admin/');
    await page.getByLabel('Gebruikersnaam of e-mailadres').type('Admini12');
    await page.getByLabel('Wachtwoord').type('PlayWrightTestSite2020!@');
    await page.getByRole('button', { name: 'Inloggen' }).click();
    await expect(page).toHaveTitle(/dashboard/i);
    await page.context().storageState({ path: 'storageState.json' });
  });

  test.describe('use cookie', () => {
    test.use({ storageState: 'storageState.json' });

    test('login', async ({ page }) => {
      await page.goto('/wp-admin/');
      await expect(page).toHaveTitle(/dashboard/i);
    });
  });
});