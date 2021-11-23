import puppeteer, { Browser, Page } from "puppeteer";
import { inject } from "./injector";
import { SessionManager } from "./manager";

let browser: Browser;
let page: Page;
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
  });
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

it("can inject the SessionManager", async () => {
  const injected = inject(page);
  expect(injected.sessionManager).toBeInstanceOf(SessionManager);
});
