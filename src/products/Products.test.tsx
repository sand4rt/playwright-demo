import { expect, test } from "@playwright/experimental-ct-react";
import { Products } from "./Products";

test('http intercepting', async ({ page, mount }) => {
  await page.route('/api/v1/products.json', async (route) => {
		await route.fulfill({
			contentType: 'application/json',
			body: JSON.stringify(['Monitor', 'Desktop', 'Laptop']),
		});
	});

  const component = await mount(<Products />);

  const listitem = component.getByRole('listitem');
  await expect(listitem.nth(0)).toHaveText('Monitor');
  await expect(listitem.nth(1)).toHaveText('Desktop');
  await expect(listitem.nth(2)).toHaveText('Laptop');
  await expect(listitem).toHaveCount(3);
});