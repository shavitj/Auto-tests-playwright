import { test, expect } from '@playwright/test';
import testUsers from '../test-data/users.json';

test.describe('Data Driven Login Tests', () => {
  
  for (const testUser of testUsers.users) {
    test(`Login test - ${testUser.description}`, async ({ page }) => {
      // Log test data being used (helpful for debugging)
      console.log(`Testing with user: ${testUser.username}`);
      
      // Navigate to the application
      await page.goto('https://www.saucedemo.com/');
      
      // Perform login
      await page.locator('[data-test="username"]').fill(testUser.username);
      await page.locator('[data-test="password"]').fill(testUser.password);
      await page.locator('[data-test="login-button"]').click();
      
      // Verify successful login
      await expect(page.locator('[data-test="title"]')).toContainText('Products');
    });
  }
}); 