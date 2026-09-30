import { test, expect } from "@playwright/test";

test.describe("Design Evolution & Milestone PDFs (2020, 2024, 2026)", () => {
  test("should verify all 3 milestone PDF files exist and return 200 OK", async ({ request }) => {
    const pdf2020 = await request.get("/evolution/prashant-portfolio-2020.pdf");
    expect(pdf2020.status()).toBe(200);
    expect(pdf2020.headers()["content-type"]).toContain("pdf");

    const pdf2024 = await request.get("/evolution/prashant-portfolio-2024.pdf");
    expect(pdf2024.status()).toBe(200);
    expect(pdf2024.headers()["content-type"]).toContain("pdf");

    const pdf2026 = await request.get("/evolution/prashant-portfolio-2026.pdf");
    expect(pdf2026.status()).toBe(200);
    expect(pdf2026.headers()["content-type"]).toContain("pdf");
  });

  test("should display Evolution section with 3 epochs and dynamic spotlight", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const evolutionSection = page.locator("#evolution");
    await expect(evolutionSection).toBeVisible();
    await evolutionSection.scrollIntoViewIfNeeded();

    // Check heading
    await expect(evolutionSection.locator("h2")).toContainText("From Visual Craft to");
    await expect(evolutionSection.locator("h2")).toContainText("Systemic Product Engineering");

    // Check 3 epoch cards
    await expect(evolutionSection.locator("[data-epoch-card='2020']")).toBeVisible();
    await expect(evolutionSection.locator("[data-epoch-card='2024']")).toBeVisible();
    await expect(evolutionSection.locator("[data-epoch-card='2026']")).toBeVisible();

    // Click 2020 epoch card
    const card2020 = evolutionSection.locator("[data-epoch-card='2020']");
    await card2020.click();

    // Assert deep-dive changes to 2020
    await expect(evolutionSection.locator("text=EPOCH DEEP-DIVE // 2020 ARCHITECTURAL SHIFT")).toBeVisible();
    await expect(evolutionSection.locator("text=Visual Artistry & Photorealistic Compositing").first()).toBeVisible();

    // Click 2024 epoch card
    const card2024 = evolutionSection.locator("[data-epoch-card='2024']");
    await card2024.click();
    await expect(evolutionSection.locator("text=EPOCH DEEP-DIVE // 2024 ARCHITECTURAL SHIFT")).toBeVisible();
    await expect(evolutionSection.locator("text=Brand Systems & Multi-Disciplinary Collateral").first()).toBeVisible();
  });

  test("should operate 21-artwork chronological carousel smoothly", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const evolutionSection = page.locator("#evolution");
    await evolutionSection.scrollIntoViewIfNeeded();

    // Check slide count starts at 01 / 21
    await expect(evolutionSection.locator("text=01 / 21")).toBeVisible();

    // Click Next button
    const nextBtn = evolutionSection.locator("button[aria-label='Next Slide']");
    await nextBtn.click();

    // Should now show 02 / 21
    await expect(evolutionSection.locator("text=02 / 21")).toBeVisible();

    // Click Prev button
    const prevBtn = evolutionSection.locator("button[aria-label='Previous Slide']");
    await prevBtn.click();
    await expect(evolutionSection.locator("text=01 / 21")).toBeVisible();

    // Click a thumbnail (e.g. thumbnail 5)
    const thumb5 = evolutionSection.locator("button[aria-label*='Jump to slide 5']");
    if (await thumb5.count() > 0) {
      await thumb5.click();
      await expect(evolutionSection.locator("text=05 / 21")).toBeVisible();
    }
  });

  test("should open glowing border overlay scale modal and load PDF", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const evolutionSection = page.locator("#evolution");
    await evolutionSection.scrollIntoViewIfNeeded();

    // Click quick PDF access button in header or active epoch
    const pdfBtn = evolutionSection.locator("button:has-text('2026 PDF Deck')").first();
    await expect(pdfBtn).toBeVisible();
    await pdfBtn.click();

    // Glowing border modal container
    const modal = page.locator("div.fixed.inset-0:has(iframe)");
    await expect(modal).toBeVisible();

    // Verify iframe src has the 2026 PDF
    const iframe = modal.locator("iframe");
    await expect(iframe).toHaveAttribute("src", /prashant-portfolio-2026\.pdf/);

    // Switch to 2020 inside the modal
    const epoch2020Btn = modal.locator("button:has-text('2020')");
    await epoch2020Btn.click();
    await expect(iframe).toHaveAttribute("src", /prashant-portfolio-2020\.pdf/);

    // Close modal via Escape
    await page.keyboard.press("Escape");
    await expect(modal).toBeHidden();
  });
});
