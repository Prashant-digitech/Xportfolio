import { test, expect } from "@playwright/test";

test.describe("Photoshop Master Gallery & 50-Deliverable Vault", () => {
  test("should load /photoshop page with 50 master artworks and category filter pills", async ({ page }) => {
    await page.goto("/photoshop", { waitUntil: "networkidle" });

    // Verify main heading
    await expect(page.locator("h1")).toContainText("PHOTOSHOP & GRAPHIC");
    await expect(page.locator("h1")).toContainText("MASTERWORKS");

    // Verify category filter pills exist
    await expect(page.locator("button:has-text('All Works')")).toBeVisible();
    await expect(page.locator("button:has-text('Flyers Collection')")).toBeVisible();
    await expect(page.locator("button:has-text('Commercial & Brands')")).toBeVisible();
    await expect(page.locator("button:has-text('Matte & Compositing')")).toBeVisible();
    await expect(page.locator("button:has-text('Theatrical Posters')")).toBeVisible();
    await expect(page.locator("button:has-text('Editorial & Magazines')")).toBeVisible();

    // Verify initial count of 50 articles in All Works
    const articles = page.locator("article");
    const count = await articles.count();
    expect(count).toBe(50);
  });

  test("should filter artworks by category dynamically", async ({ page }) => {
    await page.goto("/photoshop", { waitUntil: "networkidle" });

    // Filter to Commercial & Brands (9 items)
    const commBtn = page.locator("button:has-text('Commercial & Brands')");
    await commBtn.click();
    await expect(page.locator("article")).toHaveCount(9, { timeout: 7000 });

    // Filter to Theatrical Posters (5 items)
    const posterBtn = page.locator("button:has-text('Theatrical Posters')");
    await posterBtn.click();
    await expect(page.locator("article")).toHaveCount(5, { timeout: 7000 });

    // Filter to Flyers Collection (5 items)
    const flyerBtn = page.locator("button:has-text('Flyers Collection')");
    await flyerBtn.click();
    await expect(page.locator("article")).toHaveCount(5, { timeout: 7000 });

    // Switch back to All Works (50 items)
    const allBtn = page.locator("button:has-text('All Works')");
    await allBtn.click();
    await expect(page.locator("article")).toHaveCount(50, { timeout: 7000 });
  });

  test("should open all flyers in overlay in scrollable format when clicked", async ({ page }) => {
    await page.goto("/photoshop", { waitUntil: "networkidle" });

    // Filter to Flyers Collection
    const flyerBtn = page.locator("button:has-text('Flyers Collection')");
    await flyerBtn.click();
    await expect(page.locator("article")).toHaveCount(5, { timeout: 7000 });

    // Click the first flyer article
    const firstFlyer = page.locator("article").first();
    await firstFlyer.click();
    await page.waitForTimeout(400);

    // Verify scrollable overlay opens
    const flyerDialog = page.locator("div[role='dialog'][aria-label='All Flyers Collection - Scrollable Format']");
    await expect(flyerDialog).toBeVisible();

    // Verify all 5 flyers exist in the scrollable viewport
    await expect(flyerDialog.getByText("01", { exact: true })).toBeVisible();
    await expect(flyerDialog.getByText("02", { exact: true })).toBeVisible();
    await expect(flyerDialog.getByText("03", { exact: true })).toBeVisible();
    await expect(flyerDialog.getByText("04", { exact: true })).toBeVisible();
    await expect(flyerDialog.getByText("05", { exact: true })).toBeVisible();

    // Close via Escape key
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    await expect(flyerDialog).toBeHidden();
  });

  test("should open high-res lightbox on commercial artwork, navigate next/prev, zoom, and close via Escape", async ({ page }) => {
    await page.goto("/photoshop", { waitUntil: "networkidle" });

    // Filter to Commercial & Brands
    const commBtn = page.locator("button:has-text('Commercial & Brands')");
    await commBtn.click();
    await expect(page.locator("article")).toHaveCount(9, { timeout: 7000 });

    // Click first commercial article (Belle)
    const firstArticle = page.locator("article").first();
    await firstArticle.click();
    await page.waitForTimeout(400);

    // Check lightbox modal is open
    const modal = page.locator("div[role='dialog'][aria-label*='Artwork detail']");
    await expect(modal).toBeVisible();

    // Check zoom controls
    const zoomInBtn = modal.locator("button[aria-label='Zoom in']");
    if (await zoomInBtn.isVisible()) {
      await zoomInBtn.click();
      await page.waitForTimeout(200);
      await expect(modal.locator("button[aria-label='Reset zoom']")).toContainText("125%");
    }

    // Check next artwork button
    const nextBtn = modal.locator("button[aria-label='Next artwork']");
    await nextBtn.click();
    await page.waitForTimeout(300);

    // Close via Escape key
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await expect(modal).toBeHidden();
  });
});
