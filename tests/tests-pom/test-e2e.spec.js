import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('E2E Tests', () => {
  test('Complete purchase flow', async ({ page }) => {
    // Initialize page objects
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.navigateToLogin();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.expectProductsTitle();

    // Product selection and cart
    await productsPage.sortProducts('hilo');
    await productsPage.sortProducts('za');
    await productsPage.addToCart('test.allthethings()-t-shirt-(red)');
    await productsPage.addToCart('sauce-labs-fleece-jacket');
    await productsPage.addToCart('sauce-labs-bolt-t-shirt');
    await productsPage.getCartCount();
    
    // Cart verification and checkout
    await productsPage.goToCart();
    await cartPage.expectCartTitle();
    await cartPage.proceedToCheckout();

    // Checkout process
    await checkoutPage.expectCheckoutTitle('Your Information');
    await checkoutPage.fillShippingInfo('alex', 'alex', '12');
    await checkoutPage.expectCheckoutTitle('Overview');
    await checkoutPage.verifyOverviewPage();
    await checkoutPage.finishCheckout();
    await checkoutPage.expectOrderConfirmation();
    await checkoutPage.backToProducts();

    // Logout
    await productsPage.logout();
  });
});