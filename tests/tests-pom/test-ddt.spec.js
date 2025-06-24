import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import testUsers from '../../tests/test-data/users.json';

test.describe('Data Driven Login Tests', () => {
  for (const testUser of testUsers.users) {
    test(`Login test - ${testUser.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      
      await loginPage.navigateToLogin();
      await loginPage.login(testUser.username, testUser.password);
      await productsPage.expectProductsTitle();
    });
  }
}); 