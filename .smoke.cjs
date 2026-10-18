const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push('PAGEERROR: ' + err.message));

  await page.goto('http://localhost:5180', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500); // let loader animation finish

  await page.screenshot({ path: '/tmp/shot-hero.png' });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.25));
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/shot-about.png' });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.55));
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/shot-work.png' });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/shot-contact.png' });

  console.log('ERRORS:', JSON.stringify(errors, null, 2));
  await browser.close();
})();
