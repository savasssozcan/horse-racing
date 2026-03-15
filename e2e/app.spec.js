import { test, expect } from '@playwright/test';

test.describe('Horse Racing App', () => {
  test('loads and shows header with buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /GENERATE PROGRAM/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /START/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /RESET/i })).toBeVisible();
  });

  test('generate program creates horse list and program', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /GENERATE PROGRAM/i })).toBeEnabled();
    await page.getByRole('button', { name: /GENERATE PROGRAM/i }).click();

    await expect(page.getByText('Horse List', { exact: true }).first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Program', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Results', { exact: true }).first()).toBeVisible();

    await expect(page.getByText(/1ST Lap - 1200m/)).toBeVisible();
    await expect(page.getByText(/6TH Lap - 2200m/)).toBeVisible();

    const horseListEmpty = page.getByText(/Click GENERATE PROGRAM to create horses/);
    await expect(horseListEmpty).toBeHidden();
  });

  test('start button is enabled after generating program', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /GENERATE PROGRAM/i }).click();
    await expect(page.getByText(/1ST Lap - 1200m/)).toBeVisible({ timeout: 15000 });

    const startBtn = page.getByRole('button', { name: /^START$/i });
    await expect(startBtn).toBeEnabled();
  });

  test('race runs and results appear', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /GENERATE PROGRAM/i }).click();
    await expect(page.getByText(/1ST Lap - 1200m/)).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /^START$/i }).click();

    await expect(page.getByText('FINISH')).toBeVisible({ timeout: 5000 });

    const firstResultRound = page.locator('.panel--results .result-round').first();
    await expect(firstResultRound).toBeVisible({ timeout: 25000 });
    await expect(firstResultRound).toContainText(/1ST Lap - 1200m/);
  });

  test('pause and resume race', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /GENERATE PROGRAM/i }).click();
    await expect(page.getByText(/1ST Lap - 1200m/)).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /^START$/i }).click();
    await expect(page.getByText('FINISH')).toBeVisible({ timeout: 5000 });

    await page.getByRole('button', { name: /PAUSE/i }).click();
    await expect(page.getByRole('button', { name: /CONTINUE/i })).toBeVisible();

    await page.getByRole('button', { name: /CONTINUE/i }).click();
    await expect(page.getByRole('button', { name: /PAUSE/i })).toBeVisible({ timeout: 3000 });
  });

  test('reset returns to default state', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /GENERATE PROGRAM/i }).click();
    await expect(page.getByText(/1ST Lap - 1200m/)).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: /RESET/i })).toBeEnabled();

    await page.getByRole('button', { name: /RESET/i }).click();

    await expect(page.getByRole('button', { name: /GENERATE PROGRAM/i })).toBeEnabled();
    await expect(page.getByRole('button', { name: /^START$/i })).toBeDisabled();
    await expect(page.getByRole('button', { name: /RESET/i })).toBeDisabled();
    await expect(page.getByText(/Click GENERATE PROGRAM to create horses/i)).toBeVisible();
  });
});
