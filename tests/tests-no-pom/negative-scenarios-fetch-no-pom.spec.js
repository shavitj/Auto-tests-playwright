import { test, expect } from '@playwright/test';

test.describe('Negative Login Scenarios with API Data', () => {
  
  test('Login tests with API users', async ({ request, page }) => {
    // Fetch users from the API using Playwright's request context
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    
    // Transform API users into test data format
    const testUsers = users.map(user => ({
      username: user.username,
      password: 'secret_sauce',
      description: `API User - ${user.name}`
    }));
    
    console.log(`Prepared ${testUsers.length} users for testing`);

    // Test each user
    for (const testUser of testUsers) {
      console.log(`Testing with user: ${testUser.description}`);
      
      await page.goto('https://www.saucedemo.com/');
      await page.locator('[data-test="username"]').fill(testUser.username);
      await page.locator('[data-test="password"]').fill(testUser.password);
      await page.locator('[data-test="login-button"]').click();
      await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
    }
  });
});
