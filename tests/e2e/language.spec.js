import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { questions, authorNames } from '../../src/data/questions.js';
import english from '../../src/i18n/en.json' with { type: 'json' };

test('cambiar idioma conserva modo, partida, pista y plazo', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
  await page.getByRole('radio', { name: /A contrarreloj/ }).check();
  await page.getByRole('link', { name: 'English (UK)', exact: true }).click();
  await expect(page.getByRole('radio', { name: /Against the clock/ })).toBeChecked();
  await page.getByRole('button', { name: /Begin a new story/ }).click();
  await expect(page).toHaveURL(/\/en\/game$/);
  const quote = await page.locator('blockquote').textContent();
  const question = questions.find(item => quote.includes(item.quote));
  await page.clock.fastForward(5000);
  await page.getByRole('button', { name: /Reveal a hint/ }).click();
  await expect(page.locator('.hint-text')).toContainText(english[question.hint]);
  await page.getByRole('link', { name: 'Español', exact: true }).click();
  await expect(page.locator('.hint-text')).toContainText(question.hint);
  await expect(page.getByRole('timer')).toContainText('15 s');
  await expect(page.locator('blockquote')).toHaveText(quote);
  await page.clock.fastForward(15000);
  await expect(page.getByRole('heading', { name: 'Se acabó el tiempo.' })).toBeVisible();
  await page.getByRole('link', { name: 'English (UK)', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Time is up.' })).toBeVisible();
  await expect(page.locator('.revelation')).toContainText(english[question.explanation]);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-GB');
});

test('partida completa y repaso en inglés con resultado conservado al cambiar', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/en');
  await page.getByRole('button', { name: /Begin a new story/ }).click();
  for (let index = 0; index < 10; index++) {
    const quote = await page.locator('blockquote').textContent();
    const question = questions.find(item => quote.includes(item.quote));
    const choice = index === 0 ? (question.author === 'taylor' ? 'shakespeare' : 'taylor') : question.author;
    await page.getByRole('button', { name: new RegExp(authorNames[choice]) }).click();
    await expect(page.locator('.revelation')).toContainText(english[question.credits]);
    await page.getByRole('button', { name: index === 9 ? /Read my result/ : /Next excerpt/ }).click();
  }
  await expect(page).toHaveURL(/\/en\/results$/);
  await expect(page.locator('.stats')).toContainText('900');
  await page.getByRole('link', { name: 'Español', exact: true }).click();
  await expect(page.locator('.stats')).toContainText('900');
  await page.getByRole('link', { name: 'English (UK)', exact: true }).click();
  await page.getByRole('button', { name: /A second reading · 1 mistake/ }).click();
  await expect(page.locator('.game-toolbar')).toContainText('Excerpt 1 / 1');
  expect(errors).toEqual([]);
});

test('rutas inglesas, footer académico, metadatos y accesibilidad', async ({ page }, testInfo) => {
  for (const path of ['/en', '/en/how-to-play', '/en/archive', '/en/game', '/en/results', '/en/no-existe']) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-GB');
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_GB');
    await expect(page.locator('footer')).toContainText('Rock The Code master’s programme');
    await expect(page.locator('footer')).not.toContainText('Proyecto académico');
    await expect(page.locator('footer').getByRole('link', { name: 'The Power Tech School' })).toHaveAttribute('href', 'https://thepower.education/thepowermba/tech');
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.goto('/en');
  await page.screenshot({ path: `docs/screenshots/inicio-en-${testInfo.project.name}.jpg`, fullPage: true, type: 'jpeg', quality: 85, scale: 'css' });
  await page.getByRole('link', { name: 'Español', exact: true }).click();
  await expect(page.locator('footer')).toContainText('Proyecto académico del máster Rock The Code de');
});

test('las páginas en inglés se sirven sin JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const path of ['/en', '/en/how-to-play', '/en/archive']) {
    await page.goto(`http://127.0.0.1:4173${path}`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-GB');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('footer')).toContainText('Rock The Code master’s programme');
    await expect(page.getByRole('link', { name: 'Español', exact: true })).toHaveAttribute('href', path === '/en' ? '/' : path === '/en/archive' ? '/archivo' : '/instrucciones');
  }
  await expect(page.locator('.source-list')).toContainText('Songwriters:');
  await context.close();
});
