import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' });

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

  test('delete all uploaded files', async ({ page }) => {
    await page.goto('/wp-admin/upload.php');
    await page.locator('#cb-select-all-1').check();
    await page.locator('#bulk-action-selector-top').selectOption('delete');
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#doaction').click();
  });


  test('upload multiple files', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept());
    await page.goto('/wp-admin/media-new.php');
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      await page.getByRole('button', { name: 'Bestanden selecteren' }).click(),
    ]);
    await fileChooser.setFiles(['./upload/Red_rose.jpg', './upload/Enqore.png', './upload/Red_rose.jpg']);

    await page.goto('/wp-admin/upload.php');   
    await page.locator('#cb-select-all-1').check();
    await page.locator('#bulk-action-selector-top').selectOption('delete');
    await page.locator('#doaction').click();
    });
  });
