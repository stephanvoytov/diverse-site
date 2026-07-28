import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and shows hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Diverse/);
    // Hero section should be visible
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();
  });

  test("navigation links work", async ({ page }) => {
    await page.goto("/");

    // About page
    await page.click('a[href*="/about"]');
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator("h1, h2").first()).toBeVisible();

    // Go back
    await page.goBack();
  });

  test("all main sections render", async ({ page }) => {
    await page.goto("/");
    // Check that sections exist (data-header attributes)
    const sections = page.locator("section[data-header]");
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });
});

test.describe("About page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/О бренде/);
  });
});

test.describe("Franchise page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/franchise");
    await expect(page).toHaveTitle(/Франшиза/);
  });
});

test.describe("Collection page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/collection");
    await expect(page).toHaveTitle(/Коллекции/);
  });
});

test.describe("Stores page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/stores");
    await expect(page).toHaveTitle(/Магазины/);
  });
});
