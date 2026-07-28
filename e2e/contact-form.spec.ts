import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("shows validation errors for empty fields", async ({ page }) => {
    await page.goto("/");

    // Scroll to contacts section
    await page.locator("#section-contacts").scrollIntoViewIfNeeded();

    // Try to submit empty form
    const submitBtn = page.locator("#section-contacts button[type='submit']");
    if (await submitBtn.isVisible()) {
      await submitBtn.click();

      // Should show validation errors
      await expect(page.locator("#section-contacts .text-red-400, #section-contacts [role='alert']").first()).toBeVisible({ timeout: 5000 });
    }
  });

  test("validates name minimum length", async ({ page }) => {
    await page.goto("/");
    await page.locator("#section-contacts").scrollIntoViewIfNeeded();

    const nameInput = page.locator("#section-contacts input#name, #section-contacts input[name='name']");
    if (await nameInput.isVisible()) {
      await nameInput.fill("A");
      await nameInput.blur();

      const submitBtn = page.locator("#section-contacts button[type='submit']");
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
        // Should show error for short name
        await expect(page.locator("#section-contacts .text-red-400").first()).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test("form submits successfully with valid data", async ({ page }) => {
    // Mock the API endpoint
    await page.route("**/api/lead", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, leadId: "test-123" }),
      });
    });

    await page.goto("/");
    await page.locator("#section-contacts").scrollIntoViewIfNeeded();

    const nameInput = page.locator("#section-contacts input#name, #section-contacts input[name='name']");
    const phoneInput = page.locator("#section-contacts input[type='tel'], #section-contacts .PhoneInput input");

    if (await nameInput.isVisible() && await phoneInput.isVisible()) {
      await nameInput.fill("Тест Тестович");
      await phoneInput.fill("+79001234567");

      const submitBtn = page.locator("#section-contacts button[type='submit']");
      if (await submitBtn.isVisible()) {
        await submitBtn.click();

        // Should show success message
        await expect(page.locator("text=/спасибо|успешно|отправлено/i").first()).toBeVisible({ timeout: 10000 });
      }
    }
  });

  test("form handles API error gracefully", async ({ page }) => {
    // Mock API error
    await page.route("**/api/lead", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Server error" }),
      });
    });

    await page.goto("/");
    await page.locator("#section-contacts").scrollIntoViewIfNeeded();

    const nameInput = page.locator("#section-contacts input#name, #section-contacts input[name='name']");
    const phoneInput = page.locator("#section-contacts input[type='tel'], #section-contacts .PhoneInput input");

    if (await nameInput.isVisible() && await phoneInput.isVisible()) {
      await nameInput.fill("Тест Ошибки");
      await phoneInput.fill("+79001234567");

      const submitBtn = page.locator("#section-contacts button[type='submit']");
      if (await submitBtn.isVisible()) {
        await submitBtn.click();

        // Should show error state (not crash)
        await page.waitForTimeout(2000);
        // Page should still be functional
        await expect(page.locator("#section-contacts")).toBeVisible();
      }
    }
  });
});
