import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText(
    'AI-Powered Translation Assistant'
  );
});

test('translates text and displays mocked result', async ({ page }) => {
  await page.route(
    'https://api.openai.com/v1/chat/completions',
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          choices: [{ message: { content: 'Texto traducido' } }]
        })
      });
    }
  );
  await page.goto('/');
  await page.getByPlaceholder('Enter text').fill('Hola mundo');
  await page.waitForTimeout(1200);
  await expect(page.getByText('Texto traducido')).toBeVisible();
});

test('shows loading indicator while translating', async ({ page }) => {
  await page.route(
    'https://api.openai.com/v1/chat/completions',
    async (route) => {
      await new Promise((r) => setTimeout(r, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          choices: [{ message: { content: 'Traducción' } }]
        })
      });
    }
  );
  await page.goto('/');
  await page.getByPlaceholder('Enter text').fill('Test');
  await page.waitForTimeout(100);
  await expect(page.getByText('Translating...')).toBeVisible();
  await page.waitForTimeout(1200);
  await expect(page.getByText('Traducción')).toBeVisible();
});
