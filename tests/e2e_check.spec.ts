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

  test("should switch color accents and maintain strict contrast standards in light and dark mode", async ({ page }) => {
    const htmlElement = page.locator("html");

    // 1. Locate and open Color Accent Popover in Navbar
    const popoverBtn = page.locator("button[aria-label='Accent Color Popover']").first();
    if (await popoverBtn.isVisible()) {
      await popoverBtn.click();
      await page.waitForTimeout(300);
    }
    const accentSwitcher = page.locator("div[role='radiogroup'][aria-label='Color Accent Switcher']");
    await expect(accentSwitcher).toBeVisible();

    // 2. Click Cyan accent button
    const cyanBtn = accentSwitcher.locator("button:has-text('Cyan')").first();
    await cyanBtn.click();
    await page.waitForTimeout(300);
    await expect(htmlElement).toHaveAttribute("data-accent", "blue");

    // 3. Click Gold accent button
    const goldBtn = accentSwitcher.locator("button:has-text('Gold')").first();
    await goldBtn.click();
    await page.waitForTimeout(300);
    await expect(htmlElement).toHaveAttribute("data-accent", "gold");

    // 4. Click Violet accent button
    const violetBtn = accentSwitcher.locator("button:has-text('Violet')").first();
    await violetBtn.click();
    await page.waitForTimeout(300);
    await expect(htmlElement).toHaveAttribute("data-accent", "violet");

    // 5. Switch to Light Mode and check high contrast
    const themeToggle = page.locator("button:has(svg.lucide-sun), button:has(svg.lucide-moon), button:has(svg.lucide-laptop)").first();
    await themeToggle.click({ force: true });
    await page.waitForTimeout(400);
    const lightOption = page.locator("text=Light").first();
    await lightOption.click();
    await page.waitForTimeout(400);
    await expect(htmlElement).toHaveClass(/light/);

    // Verify light mode text color contrast on body (should be dark charcoal #0A0F1D)
    const bodyColor = await page.evaluate(() => {
      const style = window.getComputedStyle(document.body);
      return style.color;
    });
    // RGB for #0A0F1D is rgb(10, 15, 29)
    expect(bodyColor).toContain("10, 15, 29");

    // 6. Switch back to Dark Mode and check high contrast
    await themeToggle.click({ force: true });
    await page.waitForTimeout(400);
    const darkOption = page.locator("text=Dark").first();
    await darkOption.click();
    await page.waitForTimeout(400);
    await expect(htmlElement).toHaveClass(/dark/);

    // Verify dark mode text color on body (should be light slate #F8FAFC)
    const darkBodyColor = await page.evaluate(() => {
      const style = window.getComputedStyle(document.body);
      return style.color;
    });
    // RGB for #F8FAFC is rgb(248, 250, 252)
    expect(darkBodyColor).toContain("248, 250, 252");
  });

  test("should display AstroSage showcase and open 14-asset dedicated gallery modal with zero blank images", async ({ page }) => {
    // Scroll to AstroSage section
    const astrosageSection = page.locator("#astrosage");
    await astrosageSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // Verify AstroSage showcase heading and cards are visible
    await expect(astrosageSection.locator("text=ASTROSAGE // DEEPASTRO")).toBeVisible();
    const heroImage = astrosageSection.locator("img[alt*='AstroSage']").first();
    await expect(heroImage).toBeVisible();

    // Verify natural dimensions > 0 (not broken or empty)
    const naturalWidth = await heroImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);

    // Open dedicated AstroSage gallery modal
    const openGalleryBtn = astrosageSection.locator("button:has-text('View AstroSage Gallery')").first();
    await expect(openGalleryBtn).toBeVisible();
    await openGalleryBtn.click();
    await page.waitForTimeout(600);

    // Verify dialog is visible
    const galleryModal = page.locator("div[role='dialog'][aria-label='AstroSage Archive Visual Gallery']");
    await expect(galleryModal).toBeVisible();

    // Verify counter shows 01 / 14
    await expect(galleryModal.locator("text=01 / 14")).toBeVisible();

    // Next slide
    const nextBtn = galleryModal.locator("button[aria-label='Next Slide']");
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();
    await page.waitForTimeout(400);
    await expect(galleryModal.locator("text=02 / 14")).toBeVisible();

    // Close modal
    const closeBtn = galleryModal.locator("button[aria-label='Close modal']");
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await page.waitForTimeout(400);
    await expect(galleryModal).not.toBeVisible();
  });

  test("should toggle full 30-artwork archive in Visual Systems and collapse back", async ({ page }) => {
    const visualSystems = page.locator("#visual-systems");
    await visualSystems.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // Initially 6 curated items
    const initialArticles = visualSystems.locator("article");
    const initialCount = await initialArticles.count();
    expect(initialCount).toBe(6);

    // Click View Complete Graphics Gallery button
    const expandBtn = visualSystems.locator("button:has-text('View Graphics Gallery')");
    await expect(expandBtn).toBeVisible();
    await expandBtn.click();
    await page.waitForTimeout(600);

    // Now all 30 artworks should be visible
    const expandedArticles = visualSystems.locator("article");
    const expandedCount = await expandedArticles.count();
    expect(expandedCount).toBe(30);

    // Collapse back to 6 items
    const collapseBtn = visualSystems.locator("button:has-text('Collapse to Curated Preview')");
    await expect(collapseBtn).toBeVisible();
    await collapseBtn.click();
    await page.waitForTimeout(600);

    // Count is back to 6 (waiting for Framer Motion exit animation)
    await expect(visualSystems.locator("article")).toHaveCount(6, { timeout: 7000 });
  });

  test("should maintain zero horizontal overflow on mobile viewport and support hamburger menu", async ({ page }) => {
    // Set mobile viewport (iPhone 14 / Pro standard 390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000");
    await page.waitForTimeout(1000);

    // Verify horizontal overflow is zero across the page
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Verify mobile hamburger menu toggle
    const hamburgerBtn = page.locator("button[aria-label='Toggle Navigation Menu']");
    await expect(hamburgerBtn).toBeVisible();
    await hamburgerBtn.click();
    await page.waitForTimeout(500);

    // Verify mobile nav drawer items are visible
    const mobileWorkLink = page.locator("nav[aria-label='Mobile Navigation Drawer'] :is(a, button):has-text('WORK')").first();
    await expect(mobileWorkLink).toBeVisible();

    // Close menu by clicking hamburger button again
    await hamburgerBtn.click();
    await page.waitForTimeout(500);
  });
});

