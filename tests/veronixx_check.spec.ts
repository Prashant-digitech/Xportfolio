import { test, expect } from "@playwright/test";

test.describe("VS Veronixx Client Case Study & Asset Verification", () => {
  test("should load the standalone veronixx case study HTML page directly with 200 OK", async ({ page }) => {
    const response = await page.goto("/case-studies/veronixx/index.html", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);

    // Assert title and key case study elements
    const title = await page.title();
    expect(title).toContain("VS Veronixx");
    expect(title).toContain("Case Study");

    // Assert heading and client context
    await expect(page.locator("h1")).toContainText("VS Veronixx");
  });

  test("should launch Veronixx in-app case study reader from Client Websites section", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Scroll to websites section
    const websitesSection = page.locator("#websites");
    await websitesSection.scrollIntoViewIfNeeded();

    // Click Launch In-App Case Study button
    const launchBtn = websitesSection.locator("button:has-text('Launch In-App Case Study')").first();
    await expect(launchBtn).toBeVisible();
    await launchBtn.click();

    // Assert InAppCaseStudyViewer dialog appears
    const viewerDialog = page.locator("div[role='dialog'][aria-label*='In-App Case Study Reader']");
    await expect(viewerDialog).toBeVisible();

    // Assert iframe src is pointing to veronixx case study
    const iframe = viewerDialog.locator("iframe");
    await expect(iframe).toHaveAttribute("src", "/case-studies/veronixx/index.html");

    // Close viewer with Escape
    await page.keyboard.press("Escape");
    await expect(viewerDialog).toBeHidden();
  });

  test("should open Veronixx in UX case study modal from Project Showcase and offer HTML deck trigger", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();

    // Locate Veronixx card in ProjectShowcase
    const veronixxCard = page.locator("div.group:has(h4:has-text('VS Veronixx Storefront & POS'))").first();
    await expect(veronixxCard).toBeVisible();

    // Verify HTML Deck quick-action button is rendered
    const htmlDeckBtn = veronixxCard.locator("button:has-text('HTML Deck')");
    await expect(htmlDeckBtn).toBeVisible();

    // Click VIEW CASE STUDY button
    const viewCaseStudyBtn = veronixxCard.locator("button:has-text('VIEW CASE STUDY')");
    await viewCaseStudyBtn.click();

    // Modal opens
    const modal = page.locator("div[role='dialog']").first();
    await expect(modal).toBeVisible();
    await expect(modal).toContainText("VS Veronixx");

    // Close modal
    await page.keyboard.press("Escape");
    await expect(modal).toBeHidden();
  });
});
