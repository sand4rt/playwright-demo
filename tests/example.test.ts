import { test, expect } from '@playwright/test';

test('search post and write a comment', async ({ page }) => {
  await page.goto('/');

  await test.step('search blog', async () => {
    await page.getByLabel('Zoeken', { exact: true }).type('hello world');
    await page.getByRole('button', { name: 'Zoeken' }).click();
  });
 
  await test.step('open blog post', async () => {
    await page
      .getByRole('heading', { level: 2 })
      .getByRole('link', { name: 'Hello world!' }).click();
  });

  await test.step('write comment', async () => {
    await page.getByLabel('Reactie *').type('Wat is dit een mooie leerzame presentatie!' + new Date().getTime());
    await page.getByLabel('Naam *').type('Playwright');
    await page.getByLabel('E-mail *').type('test@test.nl');
    await page.getByLabel('Site', { exact: true }).type('www.enqore.tech');
  });

  await test.step('check box',async () => {
          page.getByLabel(/site bewaren/i).check();
          expect(await page.getByLabel(/site bewaren/i).isChecked());
  });

  await test.step('place reaction ',async () => { 
    await page.getByText('Reactie plaatsen').click();
    await expect(page).toHaveURL(/.#comment-/);
  });
});

test('Same context blog Behaviour', async ({ page }) => {
  await page.goto('/');

  await test.step('search blog', async () => {
    await page.getByLabel('Zoeken', { exact: true }).type('hello world');
    await page.getByRole('button', { name: 'Zoeken' }).click();
  });
 
  await test.step('open blog post', async () => {
    await page
      .getByRole('heading', { level: 2 })
      .getByRole('link', { name: 'Hello world!' }).click();
  });

  await test.step('write comment', async () => {
    await page.getByLabel('Reactie *').type('Wat is dit een mooie leerzame presentatie!');
    await page.getByLabel('Naam *').type('Playwright');
    await page.getByLabel('E-mail *').type('test@test.nl');
    await page.getByLabel('Site', { exact: true }).type('www.enqore.tech');
  });

  await test.step('check box',async () => {
          page.getByLabel(/site bewaren/i).check();
          expect(await page.getByLabel(/site bewaren/i).isChecked());
  });

  await test.step('place reaction',async () => { 
    await page.getByText('Reactie plaatsen').click();
  });

  await test.step ('', async () => {
    await page.getByText('Dubbele reactie ontdekt: het lijkt erop dat je dit al hebt gezegd!').isVisible();
  });
});

test('login cookie', async ({ page }) => {
  await page.goto('/wp-admin/');
  
  await page.getByLabel('Gebruikersnaam of e-mailadres').type('Admini12');
  await page.getByLabel('Wachtwoord').type('PlayWrightTestSite2020!@');
  await page.getByRole('button', { name: 'Inloggen' }).click();
  await expect(page).toHaveTitle(/dashboard/i);
  await page.context().storageState({ path: 'storageState.json' });
});

test.describe('authenticated', () => {
  test.use({ storageState: 'storageState.json' });
  
  test('authorized', async ({ page }) => {
    await page.goto('/wp-admin/');
    await expect(page).toHaveTitle(/dashboard/i);
  });

  test('upload', async ({ page }) => {
// https://playwright.dev/docs/input#upload-files
  });
});
