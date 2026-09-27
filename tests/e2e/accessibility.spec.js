import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
test('accesibilidad y capturas de las pantallas', async ({ page }, testInfo) => {
  await mkdir('docs/screenshots', { recursive: true });
  for (const [path, name] of [['/', 'inicio'], ['/instrucciones', 'instrucciones'], ['/archivo', 'archivo']]) {
    await page.goto(path);
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations).toEqual([]);
    await page.screenshot({ path: `docs/screenshots/${name}-${testInfo.project.name}.jpg`, fullPage: true, type: 'jpeg', quality: 85, scale: 'css' });
  }
  await page.goto('/');
  await page.getByRole('button', { name: /Comenzar una nueva historia/ }).click();
  await expect(page.locator('#question-heading')).toBeFocused();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.screenshot({ path: `docs/screenshots/partida-${testInfo.project.name}.jpg`, fullPage: true, type: 'jpeg', quality: 85, scale: 'css' });
  await page.getByRole('button', { name: /Taylor Swift/ }).click();
  await expect(page.locator('#reveal-heading')).toBeFocused();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});
