import { test, expect } from '@playwright/test';
import { LoginPage } from './models/LoginPage';

test.describe('Login', () => {

  test('happy flow login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.load();
    await loginPage.login('Admini12', 'PlayWrightTestSite2020!@');
    await expect(page).toHaveTitle(/dashboard/i);
  });

  test('login incorrect username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.load();
    await loginPage.login('Admini', 'PlayWrightTestSite2020!@');
    await expect(page).not.toHaveTitle(/dashboard/i);
  });

  test('create login cookie', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.load();
    await loginPage.login('Admini12', 'PlayWrightTestSite2020!@');
    await expect(page).toHaveTitle(/dashboard/i);
    await page.context().storageState({ path: 'storageState.json' });
  });

  test.describe('use cookie', () => {
    test.use({ storageState: 'storageState.json' });

    test('login', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.load();
      await expect(page).toHaveTitle(/dashboard/i);
    });
  });
});