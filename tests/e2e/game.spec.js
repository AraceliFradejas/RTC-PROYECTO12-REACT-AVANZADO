import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';
import { questions, authorNames } from '../../src/data/questions.js';
async function start(page, timed = false) {
  await page.goto('/');
  if (timed) await page.getByRole('radio', { name: /A contrarreloj/ }).check();
  await page.getByRole('button', { name: /Comenzar una nueva historia/ }).click();
}
async function current(page) {
  const text = await page.locator('blockquote').textContent();
  return questions.find(question => text.includes(question.quote));
}
test('partida completa, doble clic, repaso y borrado', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await start(page);
  for (let index = 0; index < 10; index++) {
    const question = await current(page);
    const choice = index === 0 ? (question.author === 'taylor' ? 'shakespeare' : 'taylor') : question.author;
    if (index === 1) await page.getByRole('button', { name: /Abrir una pista/ }).click();
    await page.getByRole('button', { name: new RegExp(authorNames[choice]) }).click({ clickCount: 2 });
    await expect(page.getByRole('heading', { name: index === 0 ? 'Esta vez, era otra pluma.' : 'Has acertado.' })).toBeVisible();
    await page.getByRole('button', { name: index === 9 ? /Leer mi resultado/ : /Siguiente fragmento/ }).click();
  }
  await expect(page).toHaveURL(/resultados/);
  await expect(page.locator('.stats')).toContainText('850');
  await expect(page.locator('.results-list > li')).toHaveCount(10);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.screenshot({ path: `docs/screenshots/resultados-${testInfo.project.name}.jpg`, fullPage: true, type: 'jpeg', quality: 85, scale: 'css' });
  await page.getByRole('button', { name: /Una segunda lectura · 1 error/ }).click();
  await expect(page.locator('.game-toolbar')).toContainText('Fragmento 1 / 1');
  const question = await current(page);
  await page.getByRole('button', { name: new RegExp(authorNames[question.author]) }).click();
  await page.getByRole('button', { name: /Leer mi resultado/ }).click();
  await expect(page.locator('.stats')).toContainText('100');
  await expect(page.getByRole('button', { name: /Una segunda lectura/ })).toHaveCount(0);
  await page.getByRole('link', { name: 'Borrar resultado y salir' }).click();
  await page.goto('/resultados');
  await expect(page.getByRole('heading', { name: 'Todavía quedan páginas por leer.' })).toBeVisible();
  expect(errors).toEqual([]);
});
test('el reloj vence, se detiene en la revelación y se limpia al salir', async ({ page }) => {
  await page.clock.install();
  await start(page, true);
  await expect(page.getByRole('timer')).toContainText('20 s');
  await page.clock.fastForward(21000);
  await expect(page.getByRole('heading', { name: 'Se acabó el tiempo.' })).toBeVisible();
  await expect(page.getByRole('timer')).toHaveCount(0);
  await page.getByRole('button', { name: /Siguiente fragmento/ }).click();
  await expect(page.getByRole('timer')).toContainText('20 s');
  await page.getByRole('link', { name: 'Abandonar partida' }).click();
  await page.clock.fastForward(25000);
  await page.getByRole('button', { name: /Comenzar una nueva historia/ }).click();
  await expect(page.locator('.game-toolbar')).toContainText('0 puntos');
});
test('la navegación no reinicia el tiempo y recargar borra la partida', async ({ page }) => {
  await page.clock.install();
  await start(page, true);
  await page.getByRole('link', { name: 'Cómo jugar', exact: true }).click();
  await page.clock.fastForward(21000);
  await page.getByRole('link', { name: 'El desafío', exact: true }).click();
  await page.getByRole('link', { name: 'Volver a ella' }).click();
  await expect(page.getByRole('heading', { name: 'Se acabó el tiempo.' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Tu historia aún no ha empezado.' })).toBeVisible();
});
test('rutas públicas, metadatos, teclado y anchura', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  for (const path of ['/', '/instrucciones', '/archivo', '/partida', '/resultados', '/no-existe']) {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (path === '/no-existe') await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow');
  }
});
test('el contenido editorial llega en HTML sin JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('/archivo');
  await expect(page.getByRole('heading', { name: 'La música también se lee.' })).toBeVisible();
  await expect(page.locator('.source-list li')).toHaveCount(10);
  await context.close();
});
test('diseño sin desbordamiento a 320, 768 y 1440 píxeles', async ({ page }) => {
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('button', { name: /Comenzar una nueva historia/ }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
