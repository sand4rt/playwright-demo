import { expect, test } from '@playwright/experimental-ct-react';
import { Counter } from './Counter';

test('render', async ({ mount }) => {
  const component = await mount(<Counter initialCount={100} />);
  await expect(component).toContainText('100');
});

test('interacting', async ({ mount }) => {
  const component = await mount(<Counter />);

  await component.click();
  await expect(component).toContainText('1');
  await component.click();
  await expect(component).toContainText('2');
  await component.click();
  await expect(component).toContainText('3');
});