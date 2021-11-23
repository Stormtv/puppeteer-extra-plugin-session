import { Page } from "puppeteer";
import { z } from "zod";
import { CDPCookie, CDPCookieParam, CDPCookieSchema } from "../schemas";

export async function getCookies(page: Page): Promise<CDPCookie[]> {
  const client = await page.target().createCDPSession();
  const resp = await client.send("Network.getAllCookies");
  await client.detach();

  /**
   * @see https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getAllCookies
   */
  const parsed = z.object({ cookies: z.array(CDPCookieSchema) }).parse(resp);

  return parsed.cookies;
}

export async function setCookies(page: Page, cookies: CDPCookie[]) {
  const client = await page.target().createCDPSession();

  const parsed = z.array(CDPCookieParam).parse(cookies);

  /**
   * @see https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookies
   */
  await client.send("Network.setCookies", {
    cookies: parsed,
  });

  await client.detach();
}
