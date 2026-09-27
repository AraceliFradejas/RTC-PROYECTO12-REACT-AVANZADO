import { test, expect } from '@playwright/test';
import { questions, authorNames } from '../../src/data/questions.js';

test('la puntuación y la pregunta se conservan al navegar durante la sesión', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Comenzar una nueva historia/ }).click();
  const firstQuote = await page.locator('blockquote').textContent();
  const question = questions.find(item => firstQuote.includes(item.quote));
  await page.getByRole('button', { name: new RegExp(authorNames[question.author]) }).click();
  await expect(page.locator('.game-toolbar')).toContainText('100 puntos');
  await page.getByRole('button', { name: /Siguiente fragmento/ }).click();
  const currentQuote = await page.locator('blockquote').textContent();
  for (const destination of ['Cómo jugar', 'El archivo', 'Mi cuaderno']) {
    await page.getByRole('link', { name: destination, exact: true }).click();
    await page.getByRole('link', { name: 'El desafío', exact: true }).click();
    await page.getByRole('link', { name: 'Volver a ella', exact: true }).click();
    await expect(page.locator('.game-toolbar')).toContainText('100 puntos');
    await expect(page.locator('.game-toolbar')).toContainText('Fragmento 2 / 10');
    await expect(page.locator('blockquote')).toHaveText(currentQuote);
  }
  await page.getByRole('link', { name: 'English (UK)', exact: true }).click();
  await expect(page.locator('.game-toolbar')).toContainText('100 points');
  await expect(page.locator('blockquote')).toHaveText(currentQuote);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Your story has not begun yet.' })).toBeVisible();
});
