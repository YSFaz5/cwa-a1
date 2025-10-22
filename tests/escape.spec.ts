import { test, expect } from "@playwright/test";

test("escape room loads", async ({ page }) => {
  await page.goto("http://localhost:3000/escape-room");
  await expect(page.getByRole("heading", { name: "Escape Room" })).toBeVisible();
});

test("save progress posts to API", async ({ page }) => {
  await page.goto("http://localhost:3000/escape-room");
  const respPromise = page.waitForResponse(r =>
    r.url().endsWith("/api/sessions") && r.request().method() === "POST"
  );
  await page.getByRole("button", { name: "Save progress" }).click();
  const resp = await respPromise;
  expect(resp.status()).toBe(201);
});
