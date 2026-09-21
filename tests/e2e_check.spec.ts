import { test, expect } from "@playwright/test";

test.describe("Prashant Sisodhiya Portfolio E2E Verifications", () => {
  const consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors.length = 0;

    // Listen for console logs, including errors and hydration warnings
    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.text().includes("warning") || msg.text().includes("Hydration")) {
        console.error(`Browser console error/warning detected: "${msg.text()}"`);
        consoleErrors.push(msg.text());
      }
    });

    // Go to local server
    await page.goto("http://localhost:3000");
    await page.waitForTimeout(2000); // Allow full load and hydration
  });

  test("should load with zero browser console errors and React hydration warnings", async ({ page }) => {
    // Assert that no console errors or hydration warnings occurred during loading
    expect(consoleErrors).toEqual([]);
  });

  test("should operate 3-way theme toggling correctly", async ({ page }) => {
    const htmlElement = page.locator("html");

    // 1. Locate theme selector button in Navbar using nested lucide svg icon locator
    const themeToggle = page.locator("button:has(svg.lucide-sun), button:has(svg.lucide-moon), button:has(svg.lucide-laptop)").first();
    await expect(themeToggle).toBeVisible();

    // 2. Open theme selector dropdown
    await themeToggle.click();
    await page.waitForTimeout(500);

    // 3. Locate light theme option in dropdown and click it
    const lightOption = page.locator("text=Light").first();
    await expect(lightOption).toBeVisible();
    await lightOption.click();
    await page.waitForTimeout(500);

    // Verify html tag has .light class
    await expect(htmlElement).toHaveClass(/light/);

    // 4. Open dropdown again and switch to dark theme
    await themeToggle.click();
    await page.waitForTimeout(500);
    const darkOption = page.locator("text=Dark").first();
    await expect(darkOption).toBeVisible();
    await darkOption.click();
    await page.waitForTimeout(500);

    // Verify html tag has .dark class
    await expect(htmlElement).toHaveClass(/dark/);
  });

  test("should open and close the settings drawer successfully", async ({ page }) => {
    // Locate the settings gear icon in navbar precisely using settings svg
    const settingsButton = page.locator("button:has(svg.lucide-settings)").first();
    await expect(settingsButton).toBeVisible();

    // Click settings button to open drawer
    await settingsButton.click();
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

    // Wait for simulated typing delay (typing starts immediately and bot responds in 1000ms)
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
    // Check that scroll-to-top button is initially hidden
    const scrollUpBtn = page.locator("button:has(svg.lucide-arrow-up)").first();
    await expect(scrollUpBtn).not.toBeVisible();

    // Scroll down by 600px
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(500);

    // Verify button is now visible
    await expect(scrollUpBtn).toBeVisible();

    // Click button to scroll up
    await scrollUpBtn.click();
    await page.waitForTimeout(1000);

    // Verify page has scrolled back to the top
    const scrollTop = await page.evaluate(() => window.scrollY);
    expect(scrollTop).toBeLessThan(100);
  });
});
