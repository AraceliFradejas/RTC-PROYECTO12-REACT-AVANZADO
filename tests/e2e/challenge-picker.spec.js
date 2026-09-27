import { test, expect } from '@playwright/test';

test('el botón de empezar permanece a la vista al elegir capítulo en móvil', async ({ page }, testInfo) => {
  for (const width of [320, 390, 700]) {
    await page.setViewportSize({ width, height: 664 });
    for (const path of ['/', '/en']) {
      await page.goto(path);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const start = page.locator('.entry-actions button');
      for (const value of ['voices', 'works', 'eras']) {
        const option = page.locator(`input[name="challenge"][value="${value}"]`);
        await option.locator('xpath=ancestor::label').scrollIntoViewIfNeeded();
        await option.check();
        await expect(option).toBeChecked();
        await expect(start).toBeInViewport({ ratio: 1 });
        const card = await option.locator('xpath=ancestor::label').boundingBox();
        const action = await start.boundingBox();
        if (testInfo.project.name === 'mobile' && width === 390 && value === 'works') {
          await page.screenshot({ path: `docs/screenshots/selector-iphone13-${path === '/' ? 'es' : 'en'}.jpg`, type: 'jpeg', quality: 85, scale: 'css' });
        }
        expect(card.y + card.height).toBeLessThanOrEqual(action.y);
      }
      await start.click();
      await expect(page).toHaveURL(/\/(cronologia|timeline)$/);
    }
  }
});
