import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('arrastra eras con ratón o gesto táctil y conserva el orden entre idiomas', async ({ page, context }, testInfo) => {
  await page.goto('/cronologia');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: /Preparar mi cronología/ }).click();
  const titles = page.locator('.era-list h2');
  const original = await titles.allTextContents();
  await page.locator('.era-list').evaluate(element => element.scrollIntoView({ block: 'start' }));
  const first = await page.locator('.era-drag').first().boundingBox();
  const third = await page.locator('.era-list li').nth(2).boundingBox();
  const from = { x: first.x + first.width / 2, y: first.y + first.height / 2 };
  const to = { x: from.x, y: third.y + third.height / 2 };
  if (testInfo.project.name === 'mobile') {
    const client = await context.newCDPSession(page);
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [from] });
    for (let step = 1; step <= 12; step++) {
      await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: from.x, y: from.y + (to.y - from.y) * step / 12 }] });
    }
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await client.detach();
  } else {
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    await page.mouse.move(from.x, from.y + 10);
    await page.mouse.move(to.x, to.y, { steps: 12 });
    await page.mouse.up();
  }
  const reordered = [original[1], original[2], original[0], ...original.slice(3)];
  await expect(titles).toHaveText(reordered);
  // El sensor suprime clics residuales durante 50 ms después de soltar.
  await page.waitForTimeout(60);
  await page.getByRole('link', { name: 'English (UK)', exact: true }).click();
  await expect(titles).toHaveText(reordered);
  await expect(page.locator('.era-instructions')).toContainText('Drag from');
  const handle = page.getByRole('button', { name: `Drag ${original[0]}`, exact: true });
  await handle.focus();
  await page.keyboard.press('Space', { delay: 60 });
  await expect(handle).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('ArrowUp');
  await expect(page.getByRole('status').filter({ hasText: `${original[0]}, position 2 of 6.` })).toHaveCount(1);
  await page.keyboard.press('Escape', { delay: 60 });
  await expect(handle).not.toHaveAttribute('aria-pressed', 'true');
  await expect(titles).toHaveText(reordered);
  await handle.focus();
  await page.keyboard.press('Space', { delay: 60 });
  await expect(handle).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('ArrowUp');
  await expect(page.getByRole('status').filter({ hasText: `${original[0]}, position 2 of 6.` })).toHaveCount(1);
  await page.keyboard.press('Space', { delay: 60 });
  await expect(titles).toHaveText([original[1], original[0], original[2], ...original.slice(3)]);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.screenshot({ path: `docs/screenshots/arrastre-eras-${testInfo.project.name}.jpg`, fullPage: true, type: 'jpeg', quality: 85, scale: 'css' });
});
