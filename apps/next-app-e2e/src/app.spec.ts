import { expect, test } from '@playwright/test';

test('should start page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Welcome to next-app/);
});
