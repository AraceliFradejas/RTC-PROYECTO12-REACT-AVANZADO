import { createServer } from 'vite';
import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const server = await createServer({ server: { host: '127.0.0.1', port: 4175, strictPort: true } });
await server.listen();
const browser = await chromium.launch(existsSync(chrome) ? { executablePath: chrome } : {});
try {
  const page = await browser.newPage();
  page.on('pageerror', error => console.error(error.message));
  page.on('console', message => { if (message.type() === 'error') console.error(message.text()); });
  await page.addInitScript(() => {
    window.renderCounts = {};
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
      supportsFiber: true, renderers: new Map(), inject(renderer) { this.renderers.set(1, renderer); return 1; }, onCommitFiberUnmount() {},
      onCommitFiberRoot(_id, root) {
        function visit(fiber) {
          if (!fiber) return;
          const name = fiber.type?.name || fiber.type?.type?.name;
          if (['Game', 'Timer', 'QuestionCard'].includes(name) && (fiber.flags & 1)) {
            window.renderCounts[name] = (window.renderCounts[name] || 0) + 1;
          }
          visit(fiber.child); visit(fiber.sibling);
        }
        visit(root.current);
      },
    };
  });
  await page.clock.install();
  await page.goto('http://127.0.0.1:4175');
  await page.getByRole('radio', { name: /A contrarreloj/ }).check();
  await page.getByRole('button', { name: /Comenzar una nueva historia/ }).click();
  await page.getByRole('timer').waitFor();
  const before = await page.evaluate(() => ({ ...window.renderCounts }));
  for (let i = 0; i < 3; i++) await page.clock.runFor(1000);
  const after = await page.evaluate(() => ({ ...window.renderCounts }));
  assert.equal(after.Game, before.Game);
  assert.equal(after.QuestionCard, before.QuestionCard);
  assert.ok(after.Timer > before.Timer);
  console.log(JSON.stringify({ before, after, result: 'Tres segundos de reloj sin renderizar Game ni QuestionCard.' }, null, 2));
} finally { await browser.close(); await server.close(); }
