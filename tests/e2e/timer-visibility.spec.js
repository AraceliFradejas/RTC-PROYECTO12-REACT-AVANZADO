import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('el reloj sigue visible al responder y avisa antes de agotarse', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install();
  await page.clock.pauseAt(new Date());
  for (const challenge of ['voices', 'works']) {
    await page.goto('/');
    await page.locator(`input[name="challenge"][value="${challenge}"]`).check();
    await page.getByRole('radio', { name: /A contrarreloj/ }).check();
    await page.getByRole('button', { name: /Comenzar una nueva historia/ }).click();
    const timer = page.getByRole('timer');
    await expect(timer).toContainText('20 s');
    await page.locator('.answer-option').last().scrollIntoViewIfNeeded();
    await expect(timer).toBeInViewport({ ratio: 1 });
    await page.clock.runFor(15000);
    await expect(timer).toContainText('05 s');
    await expect(page.getByRole('status')).toHaveText('Últimos 5 segundos');
    await expect(page.locator('.timer-track > span')).toHaveAttribute('style', /scaleX\(0\.25\)/);
    await page.screenshot({ path: `docs/screenshots/reloj-${challenge}-${testInfo.project.name}.jpg`, type: 'jpeg', quality: 85, scale: 'css' });
    await page.getByRole('link', { name: 'English (UK)', exact: true }).click();
    await expect(timer).toContainText('05 s');
    await expect(page.getByRole('status')).toHaveText('Last 5 seconds');
    await page.locator('.answer-option').last().click();
    await expect(timer).toHaveCount(0);
    await page.getByRole('button', { name: /Next excerpt/ }).click();
    await expect(timer).toContainText('20 s');
    await page.clock.runFor(20000);
    await expect(page.getByRole('heading', { name: /Time is up/ })).toBeVisible();
    await expect(timer).toHaveCount(0);
  }
});

test('el panel contrarreloj es accesible', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('radio', { name: /Against the clock/ }).check();
  await page.getByRole('button', { name: /Begin a new story/ }).click();
  await expect(page.getByRole('timer')).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});
