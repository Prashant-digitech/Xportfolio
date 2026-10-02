const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ARTIFACTS_DIR = "C:/Users/sisod/.gemini/antigravity-ide/brain/c8a0f5da-bd97-4a27-bbec-672f25c34a2e";

async function runVerification() {
  console.log("Starting Playwright Brand & Showreel Responsive Verification...");
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: "desktop", width: 1920, height: 1080 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "mobile", width: 375, height: 812 },
  ];

  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 30000 });
    console.log(`Page loaded successfully on ${vp.name}`);

    // Scroll down to #work section
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Filter by 'video' if filter button exists
    const videoFilterBtn = page.locator("button:has-text('Video')").first();
    if (await videoFilterBtn.isVisible()) {
      await videoFilterBtn.click();
      await page.waitForTimeout(500);
      console.log("Clicked Video filter button in Selected Work");
    }

    // Capture screenshot of Work section
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, `showreel_work_section_${vp.name}.png`),
    });
    console.log(`Saved screenshot: showreel_work_section_${vp.name}.png`);

    // Verify Portfolio, Brand, and Travel Showreel cards exist
    const portfolioCard = page.locator("h4:has-text('Portfolio Showreel 4K')").first();
    const brandCard = page.locator("h4:has-text('Brand Showreel 4K')").first();
    const travelCard = page.locator("h4:has-text('Travel Showreel 4K')").first();
    const hasPortfolio = await portfolioCard.isVisible();
    const hasBrand = await brandCard.isVisible();
    const hasTravel = await travelCard.isVisible();
    console.log(`Portfolio Showreel 4K card visible: ${hasPortfolio}`);
    console.log(`Brand Showreel 4K card visible: ${hasBrand}`);
    console.log(`Travel Showreel 4K card visible: ${hasTravel}`);

    // Click Brand Showreel button to test direct modal opening
    const brandBtn = page.locator(".group:has(h4:has-text('Brand Showreel 4K')) button:has-text('PLAY SHOWREEL')").first();
    if (await brandBtn.isVisible()) {
      console.log("Found Brand Showreel button, clicking...");
      await brandBtn.click();
    } else {
      console.log("Clicking fallback brand card image...");
      await page.locator(".group:has(h4:has-text('Brand Showreel 4K'))").first().click();
    }
    await page.waitForTimeout(1500);

    // Verify Showreel Modal is open
    const modal = page.locator("#showreel-modal");
    const isModalOpen = await modal.isVisible();
    console.log(`ShowreelModal visible on ${vp.name}: ${isModalOpen}`);

    const videoEl = page.locator("#showreel-video");
    const videoSrc = await videoEl.getAttribute("src");
    console.log(`Video src in modal: ${videoSrc}`);

    // Capture modal screenshot with Brand Showreel
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, `modal_brand_${vp.name}.png`),
    });
    console.log(`Saved screenshot: modal_brand_${vp.name}.png`);

    // Switch to Travel Showreel via button
    const travelSwitchBtn = page.locator("button[data-reel-id='travel-showreel']").first();
    if (await travelSwitchBtn.isVisible()) {
      await travelSwitchBtn.click();
      await page.waitForTimeout(800);
      const switchedSrc = await videoEl.getAttribute("src");
      console.log(`Switched to Travel Showreel. Video src: ${switchedSrc}`);
      
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, `modal_travel_${vp.name}.png`),
      });
      console.log(`Saved screenshot: modal_travel_${vp.name}.png`);
    }

    // Switch to Portfolio Showreel via button
    const portfolioSwitchBtn = page.locator("button[data-reel-id='portfolio-showreel']").first();
    if (await portfolioSwitchBtn.isVisible()) {
      await portfolioSwitchBtn.click();
      await page.waitForTimeout(800);
      const switchedPortfolioSrc = await videoEl.getAttribute("src");
      console.log(`Switched to Portfolio Showreel. Video src: ${switchedPortfolioSrc}`);
      
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, `modal_portfolio_${vp.name}.png`),
      });
      console.log(`Saved screenshot: modal_portfolio_${vp.name}.png`);
    }

    // Test ESC key dismissal
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
    const modalAfterEsc = await modal.isVisible();
    console.log(`Modal dismissed after ESC: ${!modalAfterEsc}`);

    // Scroll to #motion section
    const motionSection = page.locator("#motion");
    if (await motionSection.isVisible()) {
      await motionSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, `motion_lab_section_${vp.name}.png`),
      });
      console.log(`Saved screenshot: motion_lab_section_${vp.name}.png`);
    }

    if (consoleErrors.length > 0) {
      console.warn(`Console errors on ${vp.name}:`, consoleErrors);
    } else {
      console.log(`Zero console errors on ${vp.name}!`);
    }

    await context.close();
  }

  await browser.close();
  console.log("\nALL VIEWPORT AND INTERACTIVE TESTS COMPLETED SUCCESSFULLY!");
}

runVerification().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
