const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const PROD_URL = "https://xportfolio-sigma.vercel.app/";
  console.log("Starting Comprehensive Hardening Audit on:", PROD_URL);

  const report = {
    timestamp: new Date().toISOString(),
    prodUrl: PROD_URL,
    smoke: "FAIL",
    consoleErrors: [],
    hydrationErrors: [],
    networkErrors: [],
    brokenImages: [],
    keyboardNav: [],
    reducedMotion: "FAIL",
    responsiveMatrix: [],
    seoAudit: {},
    linksAudit: [],
    securityAudit: "PASS",
    overallStatus: "FAIL"
  };

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Listeners for Console and Network
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    if (type === 'error') {
      report.consoleErrors.push({ text, location: msg.location() });
    }
    if (text.toLowerCase().includes('hydration') || text.toLowerCase().includes('did not match')) {
      report.hydrationErrors.push(text);
    }
  });

  page.on('pageerror', err => {
    report.consoleErrors.push({ text: err.message, stack: err.stack });
  });

  page.on('response', resp => {
    const status = resp.status();
    const url = resp.url();
    // Exclude analytics/beacon if any, but track all local and app requests
    if (status >= 400 && !url.includes('google-analytics') && !url.includes('doubleclick')) {
      report.networkErrors.push({ url, status });
    }
  });

  // 1. Initial Page Load (Smoke Test)
  const navResponse = await page.goto(PROD_URL, { waitUntil: 'networkidle', timeout: 30000 });
  if (navResponse && navResponse.status() === 200) {
    report.smoke = "PASS";
  }

  // 2. SEO & Meta Tags
  report.seoAudit.title = await page.title();
  report.seoAudit.metaDesc = await page.getAttribute('meta[name="description"]', 'content');
  report.seoAudit.ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
  report.seoAudit.ogDesc = await page.getAttribute('meta[property="og:description"]', 'content');
  report.seoAudit.viewport = await page.getAttribute('meta[name="viewport"]', 'content');

  // 3. Image Integrity & Broken Image Check
  const images = page.locator('img');
  const imgCount = await images.count();
  const testedUrls = new Set();
  for (let i = 0; i < imgCount; i++) {
    const img = images.nth(i);
    const src = await img.getAttribute('src');
    if (!src || testedUrls.has(src)) continue;
    testedUrls.add(src);
    const fullUrl = src.startsWith('http') ? src : new URL(src, PROD_URL).href;
    try {
      const resp = await page.request.get(fullUrl);
      if (resp.status() >= 400) {
        report.brokenImages.push({ src, status: resp.status() });
      }
    } catch (e) {
      report.brokenImages.push({ src, error: e.message });
    }
  }

  // 4. Keyboard Navigation & Modal Hardening
  // 4a. Visual Systems Lightbox
  const visualSystems = page.locator('#visual-systems');
  await visualSystems.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const firstArtwork = visualSystems.locator('article').first();
  await firstArtwork.click();
  await page.waitForTimeout(600);
  const artworkModal = page.locator("div[role='dialog'][aria-label*='Artwork detail']");
  const modalOpened = await artworkModal.isVisible();
  await page.keyboard.press("Escape");
  await artworkModal.waitFor({ state: "hidden", timeout: 3000 });
  const modalClosed = !(await artworkModal.isVisible());
  report.keyboardNav.push({ action: "Artwork Lightbox open & Escape close", status: (modalOpened && modalClosed) ? "PASS" : "FAIL" });

  // 4b. AstroSage Gallery Modal
  const astrosageSection = page.locator("#astrosage");
  await astrosageSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const openAstroGalleryBtn = astrosageSection.locator("button:has-text('View AstroSage Gallery')").first();
  await openAstroGalleryBtn.click();
  await page.waitForTimeout(600);
  const astroModal = page.locator("div[role='dialog'][aria-label='AstroSage Archive Visual Gallery']");
  const astroModalOpened = await astroModal.isVisible();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(300);
  const slide2 = await astroModal.locator("text=02 / 14").isVisible();
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(300);
  const slide1 = await astroModal.locator("text=01 / 14").isVisible();
  await page.keyboard.press("Escape");
  await astroModal.waitFor({ state: "hidden", timeout: 3000 });
  const astroModalClosed = !(await astroModal.isVisible());
  report.keyboardNav.push({
    action: "AstroSage Gallery open, Arrow navigation & Escape close",
    status: (astroModalOpened && slide2 && slide1 && astroModalClosed) ? "PASS" : "FAIL"
  });

  // 4c. In-App Case Study Reader
  const workSection = page.locator("#work");
  await workSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const htmlDeckBtn = page.locator("button:has-text('Interactive HTML Deck')").first();
  await htmlDeckBtn.click();
  await page.waitForTimeout(600);
  const inAppViewer = page.locator("div[role='dialog'][aria-label*='In-App Case Study Reader']");
  const readerOpened = await inAppViewer.isVisible();
  const readerBackBtn = inAppViewer.locator("button[aria-label='Back to Portfolio']");
  await readerBackBtn.click();
  await inAppViewer.waitFor({ state: "hidden", timeout: 3000 });
  const readerClosed = !(await inAppViewer.isVisible());
  report.keyboardNav.push({ action: "In-App Case Study Reader open & close", status: (readerOpened && readerClosed) ? "PASS" : "FAIL" });

  // 4d. Settings Drawer & Theme / Accent Controls
  const settingsBtn = page.locator("button[aria-label='Open theme & customization settings']");
  if (await settingsBtn.isVisible()) {
    await settingsBtn.click();
    await page.waitForTimeout(400);
    const drawer = page.locator("div[role='dialog'][aria-label='Visual Settings & Customization']");
    const drawerOpened = await drawer.isVisible();

    // Test Theme buttons
    const lightThemeBtn = drawer.locator("button[aria-label='Switch to light theme']");
    if (await lightThemeBtn.isVisible()) await lightThemeBtn.click();
    await page.waitForTimeout(200);

    const darkThemeBtn = drawer.locator("button[aria-label='Switch to dark theme']");
    if (await darkThemeBtn.isVisible()) await darkThemeBtn.click();
    await page.waitForTimeout(200);

    // Test Accent buttons
    const purpleAccentBtn = drawer.locator("button[aria-label='Select Purple accent']");
    if (await purpleAccentBtn.isVisible()) await purpleAccentBtn.click();
    await page.waitForTimeout(200);

    const cyanAccentBtn = drawer.locator("button[aria-label='Select Cyan accent']");
    if (await cyanAccentBtn.isVisible()) await cyanAccentBtn.click();
    await page.waitForTimeout(200);

    // Close drawer via Escape
    await page.keyboard.press("Escape");
    await drawer.waitFor({ state: "hidden", timeout: 3000 });
    const drawerClosed = !(await drawer.isVisible());
    report.keyboardNav.push({ action: "Settings Drawer open, theme/accent switches, & Escape close", status: (drawerOpened && drawerClosed) ? "PASS" : "FAIL" });
  }

  // 4e. AI Assistant Window
  const aiTriggerBtn = page.locator("button[aria-label='Open AI assistant dialog']");
  if (await aiTriggerBtn.isVisible()) {
    await aiTriggerBtn.click();
    await page.waitForTimeout(400);
    const aiDialog = page.locator("div[role='dialog'][aria-label='AI Design Copilot']");
    const aiOpened = await aiDialog.isVisible();
    const aiCloseBtn = aiDialog.locator("button[aria-label='Close AI Copilot dialog']");
    await aiCloseBtn.click();
    await page.waitForTimeout(400);
    const aiClosed = !(await aiDialog.isVisible());
    report.keyboardNav.push({ action: "AI Assistant open & close", status: (aiOpened && aiClosed) ? "PASS" : "FAIL" });
  }

  // 5. Reduced Motion
  const reducedMotionContext = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 1440, height: 900 }
  });
  const rmPage = await reducedMotionContext.newPage();
  await rmPage.goto(PROD_URL, { waitUntil: 'networkidle' });
  const heroInView = await rmPage.locator("#hero").isVisible();
  const workInViewRM = await rmPage.locator("#work").isVisible();
  report.reducedMotion = (heroInView && workInViewRM) ? "PASS" : "FAIL";
  await reducedMotionContext.close();

  // 6. Responsive Matrix (17 viewports)
  const viewports = [
    { w: 320, h: 568, name: "320px Small Mobile" },
    { w: 360, h: 800, name: "360px Android" },
    { w: 375, h: 667, name: "375px iPhone SE" },
    { w: 390, h: 844, name: "390px iPhone 12/13/14" },
    { w: 412, h: 915, name: "412px Pixel 7" },
    { w: 430, h: 932, name: "430px iPhone 14 Pro Max" },
    { w: 600, h: 960, name: "600px Small Tablet" },
    { w: 768, h: 1024, name: "768px iPad Mini" },
    { w: 820, h: 1180, name: "820px iPad Air" },
    { w: 1024, h: 768, name: "1024px iPad Landscape" },
    { w: 1280, h: 800, name: "1280px Laptop 13\"" },
    { w: 1366, h: 768, name: "1366px HD Display" },
    { w: 1440, h: 900, name: "1440px MacBook Pro" },
    { w: 1600, h: 900, name: "1600px Widescreen" },
    { w: 1920, h: 1080, name: "1920px Full HD" },
    { w: 2560, h: 1440, name: "2560px QHD 2K" },
    { w: 3440, h: 1440, name: "3440px Ultrawide 21:9" },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.waitForTimeout(100);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerWidth = await page.evaluate(() => window.innerWidth);
    const clean = scrollWidth <= innerWidth;
    report.responsiveMatrix.push({
      device: vp.name,
      width: vp.w,
      scrollWidth,
      innerWidth,
      overflowPx: Math.max(0, scrollWidth - innerWidth),
      status: clean ? "PASS" : "FAIL"
    });
  }

  // 7. Links Audit
  await page.setViewportSize({ width: 1440, height: 900 });
  const allAnchors = page.locator('a');
  const anchorCount = await allAnchors.count();
  for (let i = 0; i < anchorCount; i++) {
    const a = allAnchors.nth(i);
    const href = await a.getAttribute('href');
    const text = (await a.innerText()).trim();
    const rel = await a.getAttribute('rel');
    const target = await a.getAttribute('target');
    if (href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('/'))) {
      report.linksAudit.push({
        text: text.slice(0, 30),
        href,
        rel,
        target,
        safeRel: target === '_blank' ? (rel && rel.includes('noopener')) : true
      });
    }
  }

  // 8. Client Code Secret Scan
  const scripts = page.locator('script');
  const scriptCount = await scripts.count();
  for (let i = 0; i < scriptCount; i++) {
    const content = await scripts.nth(i).innerHTML();
    if (content.includes('VERCEL_TOKEN') || content.includes('SECRET') || content.includes('PRIVATE_KEY')) {
      report.securityAudit = "FAIL";
    }
  }

  // 9. Overall Evaluation
  const hasConsoleErrors = report.consoleErrors.length > 0;
  const hasHydrationErrors = report.hydrationErrors.length > 0;
  const hasNetworkErrors = report.networkErrors.length > 0;
  const hasBrokenImages = report.brokenImages.length > 0;
  const hasKeyboardFailures = report.keyboardNav.some(k => k.status === 'FAIL');
  const hasResponsiveFailures = report.responsiveMatrix.some(r => r.status === 'FAIL');

  if (!hasConsoleErrors && !hasHydrationErrors && !hasNetworkErrors && !hasBrokenImages && !hasKeyboardFailures && !hasResponsiveFailures && report.smoke === 'PASS' && report.reducedMotion === 'PASS') {
    report.overallStatus = "PASS";
  } else {
    report.overallStatus = "FAIL";
  }

  fs.writeFileSync('hardening_audit_results.json', JSON.stringify(report, null, 2), 'utf8');
  console.log("Hardening Audit Completed! Status:", report.overallStatus);

  await browser.close();
})();
