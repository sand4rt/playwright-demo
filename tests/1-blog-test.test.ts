import { test, expect } from '@playwright/test';

test('write a comment', async ({ page }) => {
  await page.goto('/');

  await test.step('search blog', async () => {
    await expect.soft(page).toHaveTitle('PlayWright Test – Gewoon een of andere WordPress website');
    await page.getByLabel('Zoeken', { exact: true }).type('hello world');
    await page.getByRole('button', { name: 'Zoeken' }).click();
    await expect(page.locator('h1[class="page-title"]').first()).toHaveText('Zoekresultaten voor: hello world');
  });

  await test.step('open blog post', async () => {
    await page
      .getByRole('heading', { level: 2 })
      .getByRole('link', { name: 'Hello world!' }).click();
      await expect(page).toHaveURL('/uncategorized/hello-world/');
  });

  await test.step('write comment', async () => {
    await page.getByLabel('Reactie *').type('Wat is dit een mooie leerzame presentatie!' + new Date().getTime());
    await page.getByLabel('Naam *').type('Playwright');
    await page.getByLabel('E-mail *').type('test@test.nl');
    await page.getByLabel('Site', { exact: true }).type('www.enqore.tech');
  });

  await test.step('check box', async () => {
    await page.getByLabel(/site bewaren/i).check();
    expect(await page.getByLabel(/site bewaren/i).isChecked());
  });

  await test.step('place reaction ', async () => {
    await page.getByText('Reactie plaatsen').click();
    await expect(page).toHaveURL(/.#comment-/);
  });
});

test('write same comment', async ({ page }) => {
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

  await test.step('check box', async () => {
    await page.getByLabel(/site bewaren/i).check();
    expect(await page.getByLabel(/site bewaren/i).isChecked());
  });

  await test.step('place reaction', async () => {
    await page.getByText('Reactie plaatsen').click();
  });

  await test.step('', async () => {
    await page.getByText('Dubbele reactie ontdekt: het lijkt erop dat je dit al hebt gezegd!').isVisible();
  });
});


