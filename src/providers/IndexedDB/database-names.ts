import { Page } from "puppeteer";
import { CDPIndexedDBDatabaseNames } from "../../schemas";

// TODO: change this to an appropriate name
export async function getDatabaseNames(page: Page, securityOrigin: string) {
  const client = await page.target().createCDPSession();

  let dbNames: string[];
  try {
    const resp = CDPIndexedDBDatabaseNames.parse(
      await client.send("IndexedDB.requestDatabaseNames", {
        securityOrigin,
      })
    );
    dbNames = resp.databaseNames;
  } catch (err) {
    if (err instanceof Error && err.message.includes("No document for given frame found")) {
      dbNames = [];
    } else {
      throw err;
    }
  }

  await client.detach();

  return dbNames;
}
