import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Negative Login Scenarios with API Data', () => {
  test('Login tests with API users', async ({ request, page }) => {
    const loginPage = new LoginPage(page);
    
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
      
      await loginPage.navigateToLogin();
      await loginPage.login(testUser.username, testUser.password);
      await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
    }
  });
}); 