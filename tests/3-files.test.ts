import { test, expect } from '@playwright/test';

test.describe('download', () => {
  test.use({ storageState: 'storageState.json'});

  test('create text file', async ({ page }) => {
    await page.goto("/wp-admin/export.php");
    await page.getByLabel('Locaties').click();
    const [ download ] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Exportbestand downloaden' }).click(),
    ]);
    await download.saveAs('./downloads/locations.xml');
  });
});

test.describe('upload', () => {
  test.use({ storageState: 'storageState.json'});

  test('upload single file', async ({ page }) => {
    await page.goto('/wp-admin/media-new.php');
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      await page.getByRole('button', { name: 'Bestanden selecteren' }).click(),
    ]);
    await fileChooser.setFiles('./upload/Enqore.png');
    await expect(page.getByText('Enqore')).toBeVisible();
  });

  test('delete upload file', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept());
    await page.goto('/wp-admin/upload.php');
    await page.getByRole('checkbox' , { name: 'Enqore'}).click();
    await page.getByRole('button', { name: 'Permanent verwijderen' }).click();
  });

  test('upload multiple files', async ({ page }) => {
    await page.goto('/wp-admin/media-new.php');
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      await page.getByRole('button', { name: 'Bestanden selecteren' }).click(),
    ]);
    await fileChooser.setFiles(['./upload/Red_rose.jpg', './upload/Red_rose.jpg']);
  });
});
