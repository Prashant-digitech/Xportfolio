const { chromium } = require("playwright");

async function testScrollStability() {
  console.log("Starting Scroll Stability & No-Self-Scroll Verification...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 30000 });
  console.log("Page loaded.");

  // Check initial scrollY
  let scrollY = await page.evaluate(() => window.scrollY);
  console.log(`Initial window.scrollY: ${scrollY}`);
  if (scrollY > 50) {
    throw new Error(`Self-scrolled on mount! window.scrollY was ${scrollY}`);
  }

  // Wait 10 seconds to observe if carousel auto-advance forces any window scrolling
  console.log("Waiting 10 seconds to observe carousel auto-advances...");
  await page.waitForTimeout(10000);

  scrollY = await page.evaluate(() => window.scrollY);
  console.log(`window.scrollY after 10s of carousel auto-advance: ${scrollY}`);
  if (scrollY > 50) {
    throw new Error(`Self-scrolled after carousel tick! window.scrollY is ${scrollY}`);
  }

  // Manually scroll down 600px
  console.log("Simulating manual scroll to 600px...");
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
  await page.waitForTimeout(1000);

  let manualScrollY = await page.evaluate(() => window.scrollY);
  console.log(`Position after manual scroll: ${manualScrollY}`);

  // Wait 6 seconds more to make sure it doesn't jump to #evolution
  console.log("Waiting 6 seconds more at manual position...");
  await page.waitForTimeout(6000);

  let finalScrollY = await page.evaluate(() => window.scrollY);
  console.log(`Position after 6s wait: ${finalScrollY}`);

  // Get position of #evolution
  const evolutionTop = await page.evaluate(() => {
    const el = document.getElementById("evolution");
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  });
  console.log(`#evolution absolute top position: ${evolutionTop}`);

  // Ensure it didn't jump to #evolution
  const diffFromEvolution = Math.abs(finalScrollY - (evolutionTop || 0));
  if (diffFromEvolution < 100) {
    throw new Error(`Still self-scrolled to #evolution! finalScrollY=${finalScrollY}, evolutionTop=${evolutionTop}`);
  }

  console.log("\nSUCCESS: ZERO self-scrolling detected! Page scroll is 100% rock-solid and user-controlled!");
  await browser.close();
}

testScrollStability().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
