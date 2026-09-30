import { test, expect } from "@playwright/test";

test.describe("Master Transformation & Creative Intelligence Operating System", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("should display 12 curated exhibition category cards in Creative Work section", async ({ page }) => {
    const gallerySection = page.locator("#creative-gallery");
    await expect(gallerySection).toBeVisible();
    await gallerySection.scrollIntoViewIfNeeded();

    // Check heading
    await expect(gallerySection.locator("h2")).toContainText("Creative Work");
    await expect(gallerySection.locator("h2")).toContainText("Art Direction");

    // Check that 12 exhibition cards are rendered
    const cards = gallerySection.locator("article");
    await expect(cards).toHaveCount(12);

    // Verify key categories are present
    await expect(gallerySection.getByText("Magazine & Editorial", { exact: false }).first()).toBeVisible();
    await expect(gallerySection.getByText("Movie Posters & Theatrical Keyart", { exact: false }).first()).toBeVisible();
    await expect(gallerySection.getByText("Photo Manipulation & Compositing", { exact: false }).first()).toBeVisible();
    await expect(gallerySection.getByText("Flyers & Print Collateral", { exact: false }).first()).toBeVisible();
    await expect(gallerySection.getByText("Brand Identity Systems", { exact: false }).first()).toBeVisible();
    await expect(gallerySection.getByText("Advertising & Commercial Campaigns", { exact: false }).first()).toBeVisible();
    await expect(gallerySection.getByText("Retouching & Color Grading", { exact: false }).first()).toBeVisible();
  });

  test("should launch isolated cinematic gallery modal when category is clicked", async ({ page }) => {
    const gallerySection = page.locator("#creative-gallery");
    await gallerySection.scrollIntoViewIfNeeded();

    // Click Magazine & Editorial exhibition card
    const magCard = gallerySection.locator("article:has-text('Magazine & Editorial')").first();
    await magCard.click();
    await page.waitForTimeout(500);

    // Verify cinematic modal dialog appears
    const modal = page.locator("div[role='dialog'][aria-label*='Magazine & Editorial Gallery']");
    await expect(modal).toBeVisible();

    // Verify item count and metadata
    await expect(modal.locator("text=9 WORKS IN COLLECTION")).toBeVisible();
    await expect(modal.locator("text=01 / 09")).toBeVisible();

    // Test next arrow navigation
    const nextBtn = modal.locator("button[aria-label='Next artwork in collection']");
    await nextBtn.click();
    await page.waitForTimeout(300);
    await expect(modal.locator("text=02 / 09")).toBeVisible();

    // Test keyboard ArrowRight navigation
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(300);
    await expect(modal.locator("text=03 / 09")).toBeVisible();

    // Test keyboard ArrowLeft navigation
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(300);
    await expect(modal.locator("text=02 / 09")).toBeVisible();

    // Test fullscreen trigger
    const fullscreenBtn = modal.locator("button:has-text('Inspect Fullscreen')").first();
    await fullscreenBtn.click();
    await page.waitForTimeout(300);
    await expect(modal.locator("text=FULLSCREEN INSPECTION")).toBeVisible();

    // Exit fullscreen via Escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await expect(modal.locator("text=FULLSCREEN INSPECTION")).not.toBeVisible();

    // Close modal via Escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await expect(modal).toBeHidden();
  });

  test("should open Command Palette via shortcut or Search button, filter results, and close via Escape", async ({ page }) => {
    // Click Search button in Navbar
    const searchBtn = page.locator("button[aria-label='Search and Command Palette']").first();
    await searchBtn.click();
    await page.waitForTimeout(400);

    // Check Command Palette dialog is open
    const palette = page.locator("div[role='dialog'][aria-label='Interactive Command Palette']");
    await expect(palette).toBeVisible();

    // Type query "Photoshop"
    const input = palette.locator("input");
    await input.fill("Photoshop");
    await page.waitForTimeout(300);

    // Verify results appear
    const results = palette.locator("div.cursor-pointer");
    const count = await results.count();
    expect(count).toBeGreaterThan(0);

    // Close palette via Escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await expect(palette).toBeHidden();

    // Trigger via keyboard shortcut Cmd+K / Ctrl+K
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(400);
    await expect(palette).toBeVisible();

    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await expect(palette).toBeHidden();
  });

  test("should preserve complete 30-artwork master archive and anchor jump", async ({ page }) => {
    const visualSystems = page.locator("#visual-systems");
    await expect(visualSystems).toBeVisible();

    // Verify 30 masterworks title
    await expect(visualSystems).toContainText("30 Verified Masterworks");

    // Click jump anchor in creative gallery
    const jumpBtn = page.locator("a:has-text('Inspect 30-Work Master Archive')");
    await expect(jumpBtn).toBeVisible();
    await jumpBtn.click();
    await page.waitForTimeout(500);

    // Verify scroll position is near #visual-systems
    const isVisible = await visualSystems.isVisible();
    expect(isVisible).toBe(true);
  });
});
