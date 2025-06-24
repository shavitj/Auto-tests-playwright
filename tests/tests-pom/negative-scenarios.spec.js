import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Negative Login Scenarios', () => {
  test('locked out user scenario', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

  test('incorrect credentials scenario', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('abc', 'secret_sauce');
    await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });

  test('empty username scenario', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('', 'secret_sauce');
    await loginPage.expectErrorMessage('Epic sadface: Username is required');
  });

  test('empty password scenario', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('standard_user', '');
    await loginPage.expectErrorMessage('Epic sadface: Password is required');
  });
}); 