const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const auditReport = {
    timestamp: new Date().toISOString(),
    targetUrl: "https://xportfolio-sigma.vercel.app/",
    httpStatus: null,
    finalUrl: null,
    pageTitle: null,
    consoleErrors: [],
    networkErrors: [],
    stringAudit: {},
    graphicsCards: [],
    responsiveMatrix: [],
    recruiterJourney: [],
    overallVerdict: "PENDING"
  };

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      auditReport.consoleErrors.push(msg.text());
    }
  });

  page.on('response', resp => {
    if (resp.status() >= 400) {
      auditReport.networkErrors.push({ url: resp.url(), status: resp.status() });
    }
  });

  console.log("Navigating to production site: https://xportfolio-sigma.vercel.app/ ...");
  const response = await page.goto("https://xportfolio-sigma.vercel.app/", {
    waitUntil: "networkidle",
    timeout: 60000
  });

  auditReport.httpStatus = response.status();
  auditReport.finalUrl = page.url();
  auditReport.pageTitle = await page.title();

  // Scroll through entire page to trigger lazy loading / framer-motion components
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 80);
    });
  });
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const fullHtml = await page.content();
  const fullText = await page.innerText('body');
  const upperText = fullText.toUpperCase();

  // Save live DOM and Text for reference
  fs.writeFileSync('live_rendered_body.txt', fullText, 'utf8');

  // Exact String Audit
  const checkStrings = [
    // Forbidden
    { key: "FORBIDDEN_91_4_SUS_Usability", str: "91.4 SUS Usability", forbidden: true },
    { key: "FORBIDDEN_99_2_Accuracy", str: "99.2% Accuracy", forbidden: true },
    { key: "FORBIDDEN_42m_day", str: "42m/day", forbidden: true },
    { key: "FORBIDDEN_100K_Bodies", str: "100K+ Bodies", forbidden: true },
    { key: "FORBIDDEN_80ms_Sync_Standalone", str: "80ms Sync", forbidden: true, checkExclude: "Sub-80ms Sync Target" },
    { key: "FORBIDDEN_Product_Design_UX_UI_2026", str: "Product Design · UX · UI 2026", forbidden: true },
    // Required
    { key: "REQUIRED_Target_SUS_Benchmark", str: "Target SUS Benchmark", forbidden: false },
    { key: "REQUIRED_91_4", str: "91.4", forbidden: false },
    { key: "REQUIRED_Target_SUS_Benchmark_91_4", str: "Target SUS Benchmark • 91.4", forbidden: false },
    { key: "REQUIRED_Clinical_AI_Concept", str: "Clinical AI Concept", forbidden: false },
    { key: "REQUIRED_WCAG_AA_Compliance", str: "WCAG AA Compliance", forbidden: false },
    { key: "REQUIRED_Clinical_AI_Concept_WCAG_AA_Compliance", str: "Clinical AI Concept • WCAG AA Compliance", forbidden: false },
    { key: "REQUIRED_Sub_80ms_Sync_Target", str: "Sub-80ms Sync Target", forbidden: false },
    { key: "REQUIRED_Orbital_Telemetry_Real_time_Sync", str: "Orbital Telemetry • Real-time Sync", forbidden: false }
  ];

  for (const item of checkStrings) {
    let presentInText = false;
    let presentInHtml = false;

    if (item.checkExclude) {
      const strippedText = fullText.replace(new RegExp(item.checkExclude, 'g'), '');
      const strippedHtml = fullHtml.replace(new RegExp(item.checkExclude, 'g'), '');
      presentInText = strippedText.includes(item.str);
      presentInHtml = strippedHtml.includes(item.str);
    } else {
      presentInText = fullText.includes(item.str);
      presentInHtml = fullHtml.includes(item.str);
    }

    const pass = item.forbidden ? (!presentInText && !presentInHtml) : (presentInText || presentInHtml);
    auditReport.stringAudit[item.key] = {
      targetString: item.str,
      forbidden: item.forbidden,
      presentInText,
      presentInHtml,
      status: pass ? "PASS" : "FAIL"
    };
  }

  // Graphics Cards Specific Discipline Metadata
  const graphicsFilterBtn = page.locator('#work button', { hasText: 'Graphics & Brand' });
  await graphicsFilterBtn.click();
  await page.waitForTimeout(800);
  const workText = await page.locator('#work').innerText();

  const graphicsSpecs = [
    { title: 'Surreal Photo Manipulation', role: 'Digital Matte Painting · Compositing' },
    { title: 'Imagination to Reality', role: 'Art Direction · Conceptual Art' },
    { title: 'Cinematic Movie Poster', role: 'Poster Design · Theatrical Keyart' },
    { title: 'Brand Identity & Guidelines', role: 'Brand Identity · Guidelines' },
    { title: 'Modern Brand Identity Collaterals', role: 'Visual Design · Packaging Systems' },
    { title: 'Editorial Magazine Cover', role: 'Editorial Design · Publication Layout' },
    { title: 'Social Media Campaign Creatives', role: 'Social Media Design · Ad Creatives' },
    { title: 'Commercial Marketing Flyer', role: 'Graphic Design · Print Collateral' },
    { title: 'Luxury Event Invitation', role: 'Graphic Design · Bespoke Stationery' },
    { title: 'Photoshop 21-Artwork Gallery', role: 'Visual Design · Digital Art Vault' }
  ];

  for (const item of graphicsSpecs) {
    const present = workText.includes(item.role);
    auditReport.graphicsCards.push({
      artwork: item.title,
      expectedRole: item.role,
      verifiedPresent: present,
      status: present ? "PASS" : "FAIL"
    });
  }

  // 17-Viewport Responsive Matrix
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
    auditReport.responsiveMatrix.push({
      device: vp.name,
      width: vp.w,
      height: vp.h,
      scrollWidth,
      innerWidth,
      overflowPx: Math.max(0, scrollWidth - innerWidth),
      status: clean ? "PASS" : "FAIL"
    });
  }

  // Recruiter Journey Validation
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  // 1. Home -> Selected Work
  const viewWorkCTA = page.locator("button:has-text('View Selected Work')").first();
  await viewWorkCTA.click();
  await page.waitForTimeout(600);
  const workInView = await page.locator("#work").isVisible();
  auditReport.recruiterJourney.push({ step: "1. Click View Selected Work", status: workInView ? "PASS" : "FAIL" });

  // 2. Open DeepAstro Case Study HTML Deck
  const htmlDeckBtn = page.locator("button:has-text('Interactive HTML Deck')").first();
  await htmlDeckBtn.click();
  await page.waitForTimeout(700);
  const inAppViewer = page.locator("div[role='dialog'][aria-label*='In-App Case Study Reader']");
  const readerVisible = await inAppViewer.isVisible();
  auditReport.recruiterJourney.push({ step: "2. Open DeepAstro In-App Case Study Reader", status: readerVisible ? "PASS" : "FAIL" });

  // 3. Return via Back to Portfolio
  const backBtn = inAppViewer.locator("button[aria-label='Back to Portfolio']");
  await backBtn.click();
  await page.waitForTimeout(500);
  const readerClosed = !(await inAppViewer.isVisible());
  auditReport.recruiterJourney.push({ step: "3. Back to Portfolio button closes reader", status: readerClosed ? "PASS" : "FAIL" });

  // 4. Visual Systems Artwork Modal
  const visualSystems = page.locator("#visual-systems");
  await visualSystems.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const firstArtwork = visualSystems.locator("article").first();
  await firstArtwork.click();
  await page.waitForTimeout(600);
  const artworkModal = page.locator("div[role='dialog'][aria-label*='Artwork detail']");
  const modalVisible = await artworkModal.isVisible();
  auditReport.recruiterJourney.push({ step: "4. Open Visual Systems Artwork Lightbox", status: modalVisible ? "PASS" : "FAIL" });

  // 5. Close via Escape
  await page.keyboard.press("Escape");
  let modalClosed = false;
  try {
    await artworkModal.waitFor({ state: "hidden", timeout: 3000 });
    modalClosed = true;
  } catch (e) {
    modalClosed = !(await artworkModal.isVisible());
  }
  auditReport.recruiterJourney.push({ step: "5. Close Artwork Lightbox via Escape", status: modalClosed ? "PASS" : "FAIL" });

  // 6. AstroSage Gallery Modal
  const astrosageSection = page.locator("#astrosage");
  await astrosageSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const openAstroGalleryBtn = astrosageSection.locator("button:has-text('View AstroSage Gallery')").first();
  await openAstroGalleryBtn.click();
  await page.waitForTimeout(600);
  const astroModal = page.locator("div[role='dialog'][aria-label='AstroSage Archive Visual Gallery']");
  const astroModalVisible = await astroModal.isVisible();
  auditReport.recruiterJourney.push({ step: "6. Open AstroSage 14-Asset Gallery Modal", status: astroModalVisible ? "PASS" : "FAIL" });

  // 7. AstroSage ArrowRight
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(400);
  const slide2Visible = await astroModal.locator("text=02 / 14").isVisible();
  auditReport.recruiterJourney.push({ step: "7. Navigate to Slide 02 / 14 via ArrowRight", status: slide2Visible ? "PASS" : "FAIL" });

  // 8. Close AstroSage via Escape
  await page.keyboard.press("Escape");
  let astroModalClosed = false;
  try {
    await astroModal.waitFor({ state: "hidden", timeout: 3000 });
    astroModalClosed = true;
  } catch (e) {
    astroModalClosed = !(await astroModal.isVisible());
  }
  auditReport.recruiterJourney.push({ step: "8. Close AstroSage Gallery via Escape", status: astroModalClosed ? "PASS" : "FAIL" });

  // 9. Contact Email Link
  const contactSection = page.locator("#contact");
  await contactSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const emailLink = contactSection.locator("a[href^='mailto:']").first();
  const emailVisible = await emailLink.isVisible();
  auditReport.recruiterJourney.push({ step: "9. Contact email link is visible and functional", status: emailVisible ? "PASS" : "FAIL" });

  // 10. Contact Phone Link
  const telLink = contactSection.locator("a[href^='tel:']").first();
  const telVisible = await telLink.isVisible();
  auditReport.recruiterJourney.push({ step: "10. Contact phone link is visible and functional", status: telVisible ? "PASS" : "FAIL" });

  // Evaluate Overall Verdict
  const hasStringFailures = Object.values(auditReport.stringAudit).some(s => s.status === "FAIL");
  const hasGraphicsFailures = auditReport.graphicsCards.some(g => g.status === "FAIL");
  const hasResponsiveFailures = auditReport.responsiveMatrix.some(r => r.status === "FAIL");
  const hasJourneyFailures = auditReport.recruiterJourney.some(j => j.status === "FAIL");
  const hasConsoleErrors = auditReport.consoleErrors.length > 0;
  const hasNetworkErrors = auditReport.networkErrors.length > 0;

  if (!hasStringFailures && !hasGraphicsFailures && !hasResponsiveFailures && !hasJourneyFailures && !hasConsoleErrors && !hasNetworkErrors && auditReport.httpStatus === 200) {
    auditReport.overallVerdict = "PASS";
  } else {
    auditReport.overallVerdict = "FAIL";
  }

  fs.writeFileSync('zero_trust_audit_results.json', JSON.stringify(auditReport, null, 2), 'utf8');
  console.log("\nZero-Trust Production Audit Completed! Verdict:", auditReport.overallVerdict);

  await browser.close();
})();
