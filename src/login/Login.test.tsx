import { expect, test } from '@playwright/experimental-ct-react';
import { Login } from './Login';

test('interacting', async ({ page, mount }) => {
  const component = await mount(<Login />);
  await expect(page).toHaveURL('/');
  await component.getByLabel('Username').type('Admin');
  await component.getByLabel('Password').type('SecretPassword');
  await component.getByRole('button').click();
  await expect(page).toHaveURL('/dashboard');
});

test('keyboard navigation', async ({ page, mount }) => {
  const component = await mount(<Login />);
  await expect(page).toHaveURL('/');
  await component.type('Admin'); // username
  await component.press('Tab');
  await component.type('SecretPassword'); // password
  await component.press('Tab');
  await component.press('Enter'); // submit form
  await expect(page).toHaveURL('/dashboard');
});
