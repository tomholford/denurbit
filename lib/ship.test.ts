import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import Channel from "./channel.ts";
import Ship from "./ship.ts";

Deno.test("Ship: authentication flow with fake zod", async () => {
  const instance = new Ship();
  assertEquals(instance.client.isAuthed, false);
  await instance.authenticate();
  assertEquals(instance.client.isAuthed, true);
});


Deno.test("Ship: it closes open channels on shutdown", async () => {
  const instance = new Ship();
  await instance.authenticate();

  const channel = new Channel(instance);
  assertEquals(channel.opened, false);

  await channel.open()
  assertEquals(channel.opened, true);
  assertEquals(instance.openChannels.length, 1);

  await instance.closeAllChannels();
  assertEquals(channel.opened, false);
  assertEquals(instance.openChannels.length, 0);
});
