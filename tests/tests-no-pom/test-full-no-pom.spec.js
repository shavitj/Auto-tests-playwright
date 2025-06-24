import { test, expect } from '@playwright/test';

test.describe('Login Tests for Different User Types', () => {
  const users = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
  ];

  for (const user of users) {
    test(`Test login with '${user}'`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.locator('[data-test="username"]').fill(user);
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(page.locator('[data-test="title"]')).toContainText('Products');
    });
  }
});