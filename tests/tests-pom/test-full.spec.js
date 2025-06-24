import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

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
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      
      await loginPage.navigateToLogin();
      await loginPage.login(user, 'secret_sauce');
      await productsPage.expectProductsTitle();
    });
  }
}); 