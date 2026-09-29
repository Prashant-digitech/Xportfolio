import { test, expect } from "@playwright/test";

test.describe("Prashant Sisodhiya Portfolio E2E Verifications", () => {
  const consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors.length = 0;

    // Set standard desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    // Listen for console logs, including errors and hydration warnings
    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.text().includes("Hydration")) {
        console.error(`Browser console error detected: "${msg.text()}"`);
        consoleErrors.push(msg.text());
      }
    });

    // Go to local server and ensure scrolled to top
    await page.goto("http://localhost:3000");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500); // Allow full load and hydration
  });

  test("should load with zero browser console errors and React hydration warnings", async ({ page }) => {
    // Assert that no uncaught React or console errors occurred during loading
    const criticalErrors = consoleErrors.filter(
      (err) => !err.includes("favicon") && !err.includes("404")
    );
    expect(criticalErrors).toEqual([]);
  });

  test("should operate 3-way theme toggling correctly", async ({ page }) => {
    const htmlElement = page.locator("html");

    // 1. Locate theme selector button in Navbar
    const themeToggle = page.locator("button:has(svg.lucide-sun), button:has(svg.lucide-moon), button:has(svg.lucide-laptop)").first();
    await expect(themeToggle).toBeVisible();

    // 2. Open theme selector dropdown
    await themeToggle.click({ force: true });
    await page.waitForTimeout(400);

    // 3. Locate light theme option in dropdown and click it
    const lightOption = page.locator("text=Light").first();
    await expect(lightOption).toBeVisible();
    await lightOption.click();
    await page.waitForTimeout(400);

    // Verify html tag has .light class
    await expect(htmlElement).toHaveClass(/light/);

    // 4. Open dropdown again and switch to dark theme
    await themeToggle.click({ force: true });
    await page.waitForTimeout(400);
    const darkOption = page.locator("text=Dark").first();
    await expect(darkOption).toBeVisible();
    await darkOption.click();
    await page.waitForTimeout(400);

    // Verify html tag has .dark class
    await expect(htmlElement).toHaveClass(/dark/);
  });

  test("should open and close the settings drawer successfully", async ({ page }) => {
    // Locate the settings gear icon in navbar
    const settingsButton = page.locator("button:has(svg.lucide-settings)").first();
    await expect(settingsButton).toBeVisible();

    // Click settings button to open drawer
    await settingsButton.click({ force: true });
    await page.waitForTimeout(800);

    // Verify drawer settings heading is visible
    const settingsHeading = page.locator("text=SYSTEM SETTINGS");
    await expect(settingsHeading).toBeVisible();

    // Click close button inside drawer
    const closeButton = page.locator("button:has(svg.lucide-x)").first();
    if (await closeButton.isVisible()) {
      await closeButton.click();
      await page.waitForTimeout(500);
      await expect(settingsHeading).not.toBeVisible();
    }
  });

  test("should toggle the AI Assistant window and handle interactive queries", async ({ page }) => {
    // Locate floating chat button (represented by message-square icon)
    const assistantBubble = page.locator("button:has(svg.lucide-message-square)").first();
    await expect(assistantBubble).toBeVisible();

    // Open chat
    await assistantBubble.click();
    await page.waitForTimeout(600);

    // Verify chat title is present
    const chatTitle = page.locator("text=PS AI Assistant");
    await expect(chatTitle).toBeVisible();

    // Verify quick suggestion chip is present and click it
    const suggestChip = page.locator("text=Show Skills").first();
    await expect(suggestChip).toBeVisible();
    await suggestChip.click();

    // Wait for simulated typing delay
    await page.waitForTimeout(1800);

    // Verify chatbot answers regarding skills
    const replyText = page.locator("text=HTML, CSS, JavaScript");
    await expect(replyText.first()).toBeVisible();

    // Close chat using X button in header
    const closeButton = page.locator("button:has(svg.lucide-x)").first();
    await closeButton.click();
    await page.waitForTimeout(500);
    await expect(chatTitle).not.toBeVisible();
  });

  test("should trigger scroll-to-top button on scrolling down", async ({ page }) => {
    // Scroll to top explicitly first
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);

    // Scroll down by 800px
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(800);

    // Verify scroll up button is now visible
    const scrollUpBtn = page.locator("button:has(svg.lucide-arrow-up)").first();
    await expect(scrollUpBtn).toBeVisible();

    // Click button to scroll up
    await scrollUpBtn.click();
    await page.waitForTimeout(1000);

    // Verify page has scrolled back to near top
    const scrollTop = await page.evaluate(() => window.scrollY);
    expect(scrollTop).toBeLessThan(200);
  });

  test("should open graphics work card in scale transition overlay and navigate correctly", async ({ page }) => {
    // Scroll to Visual Systems section
    const visualSystemsSection = page.locator("#visual-systems");
    await visualSystemsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // Locate the first artwork card in the grid
    const firstArtworkCard = page.locator("#visual-systems article").first();
    await expect(firstArtworkCard).toBeVisible();

    // Click the card to open overlay modal with scale transition
    await firstArtworkCard.click();
    await page.waitForTimeout(600);

    // Verify detail dialog is open
    const modalDialog = page.locator("div[role='dialog'][aria-label*='Artwork detail']");
    await expect(modalDialog).toBeVisible();

    // Verify zoom controls and next button
    const nextButton = modalDialog.locator("button[aria-label='Next artwork']");
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    await page.waitForTimeout(400);

    // Close modal using close button
    const closeBtn = modalDialog.locator("button[aria-label='Close detail view']");
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await page.waitForTimeout(400);
    await expect(modalDialog).not.toBeVisible();
  });

  test("should open in-app case study reader and return using Back to Portfolio button", async ({ page }) => {
    // Scroll to Project Showcase section
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // Click Interactive HTML Deck button in Flagship Cinema
    const htmlDeckBtn = page.locator("button:has-text('Interactive HTML Deck')").first();
    await expect(htmlDeckBtn).toBeVisible();
    await htmlDeckBtn.click();
    await page.waitForTimeout(1000);

    // Verify in-app case study viewer is open inside the app
    const inAppViewer = page.locator("div[role='dialog'][aria-label*='In-App Case Study Reader']");
    await expect(inAppViewer).toBeVisible();

    // Verify iframe is mounted
    const viewerIframe = inAppViewer.locator("iframe");
    await expect(viewerIframe).toBeVisible();

    // Verify Back to Portfolio button is visible
    const backBtn = inAppViewer.locator("button[aria-label='Back to Portfolio']");
    await expect(backBtn).toBeVisible();

    // Click Back to Portfolio button
    await backBtn.click();
    await page.waitForTimeout(500);

    // Verify In-App Reader closed and returned back to the portfolio
    await expect(inAppViewer).not.toBeVisible();
  });
});
