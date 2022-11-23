import { expect, test, devices } from '@playwright/experimental-ct-react';
import { App } from './App';

test.describe('dark mode', () => {
  test.use({ colorScheme: 'dark' });

  test('visual', async ({ mount }) => {
    const component = await mount(<App />);
    await expect(component).toHaveScreenshot();
  });
});

test.describe('mobile', () => {
  test.use({ viewport: devices['iPhone 11'].viewport });

  test('visual', async ({ mount }) => {
    const component = await mount(<App />);
    await expect(component).toHaveScreenshot();
  });
});
