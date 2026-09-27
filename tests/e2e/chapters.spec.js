import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { questions } from '../../src/data/questions.js';
import { eras } from '../../src/data/eras.js';

test('cuatro obras, descubrimiento, favorito, filtros y vaciado', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('radio', { name: /La obra oculta/ }).check();
  await page.getByRole('button', { name: /Comenzar una nueva historia/ }).click();
  await expect(page.locator('.answer-option')).toHaveCount(4);
  const quote = await page.locator('blockquote').textContent();
  const question = questions.find(item => quote.includes(item.quote));
  await page.getByRole('button', { name: new RegExp(question.work.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }).click();
  await expect(page.getByRole('heading', { name: 'Has acertado.' })).toBeVisible();
  await page.getByRole('button', { name: /Guardar en mi cuaderno/ }).click();
  await page.getByRole('link', { name: /Mi cuaderno/, exact: false }).first().click();
  await expect(page.locator('.notebook-summary')).toContainText('1 de 10 obras descubiertas');
  await expect(page.locator('.discovery-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Guardadas', exact: true }).click();
  await page.getByRole('searchbox').fill('nada-que-encontrar');
  await expect(page.locator('.discovery-card')).toHaveCount(0);
  await page.getByRole('searchbox').fill('');
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.screenshot({ path: `docs/screenshots/cuaderno-${testInfo.project.name}.jpg`, fullPage: true, type: 'jpeg', quality: 85, scale: 'css' });
  await page.getByRole('button', { name: 'Vaciar mi cuaderno', exact: true }).click();
  await page.getByRole('button', { name: 'Sí, vaciar mi cuaderno', exact: true }).click();
  await expect(page.locator('.notebook-summary')).toContainText('0 de 10');
});

test('cronología completa, navegación bilingüe, sello e historial', async ({ page }, testInfo) => {
  await page.goto('/en');
  await page.getByRole('radio', { name: /The thread of eras/ }).check();
  await page.getByRole('button', { name: /Begin a new story/ }).click();
  await expect(page).toHaveURL(/\/en\/timeline$/);
  await expect(page.locator('.era-list li')).toHaveCount(6);
  const original = await page.locator('.era-title h2').allTextContents();
  await page.getByRole('link', { name: 'Español', exact: true }).click();
  expect(await page.locator('.era-title h2').allTextContents()).toEqual(original);
  const target = original.toSorted((a, b) => eras.find(item => item.title === a).year - eras.find(item => item.title === b).year);
  for (let index = 0; index < target.length; index++) {
    let current = (await page.locator('.era-title h2').allTextContents()).indexOf(target[index]);
    while (current > index) {
      await page.getByRole('button', { name: `Subir ${target[index]}`, exact: true }).click();
      current--;
    }
  }
  await page.getByRole('button', { name: /Comprobar el orden/ }).click();
  await expect(page.getByRole('heading', { name: 'Cada era, en su lugar.' })).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.screenshot({ path: `docs/screenshots/cronologia-${testInfo.project.name}.jpg`, fullPage: true, type: 'jpeg', quality: 85, scale: 'css' });
  await page.getByRole('link', { name: /Ver mi recorrido/ }).click();
  await expect(page.locator('.reading-stamp.earned')).toContainText(['Archivista']);
  await expect(page.locator('.session-history li')).toHaveCount(1);
  await page.getByRole('link', { name: 'English (UK)', exact: true }).click();
  await expect(page.locator('.session-history li')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('.session-history li')).toHaveCount(0);
});

test('La obra oculta termina y repasa conservando cuatro alternativas', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('radio', { name: /The hidden work/ }).check();
  await page.getByRole('button', { name: /Begin a new story/ }).click();
  for (let index = 0; index < 10; index++) {
    await expect(page.locator('.answer-option')).toHaveCount(4);
    const quote = await page.locator('blockquote').textContent();
    const question = questions.find(item => quote.includes(item.quote));
    const options = page.locator('.answer-option');
    if (index === 0) {
      const labels = await options.locator('strong').allTextContents();
      await options.nth(labels.findIndex(label => label !== question.work)).click();
    } else {
      const labels = await options.locator('strong').allTextContents();
      await options.nth(labels.indexOf(question.work)).click();
    }
    await page.getByRole('button', { name: index === 9 ? /Read my result/ : /Next excerpt/ }).click();
  }
  await expect(page.locator('.stats')).toContainText('900');
  await expect(page.locator('.results-list li').first()).toContainText('You chose');
  await page.getByRole('button', { name: /A second reading · 1 mistake/ }).click();
  await expect(page.locator('.answer-option')).toHaveCount(4);
  await expect(page.locator('.game-toolbar')).toContainText('Excerpt 1 / 1');
});
