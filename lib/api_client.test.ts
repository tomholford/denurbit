import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";
import APIClient from "./api_client.ts";
import Config from "./config.ts";

Deno.test("APIClient: it can authenticate and set an auth cookie", async () => {
  const config = new Config();
  const instance = new APIClient(config);

  assertEquals(instance.isAuthed, false);
  
  await instance.authenticate();

  assertEquals(instance.isAuthed, true);
  assertExists(instance.authCookie);
});
