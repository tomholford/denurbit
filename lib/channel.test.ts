import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";
import Ship from "./ship.ts";
import Channel from "./channel.ts";

Deno.test("Channel: it generates a UID on instantiation", () => {
  const ship = new Ship();
  const instance = new Channel(ship);

  assertExists(instance.uid);
});

Deno.test("Channel: it can open and close a channel", async () => {
  const ship = new Ship();
  const instance = new Channel(ship);
  
  await ship.authenticate();

  assertEquals(instance.opened, false);
  
  await instance.open();
  
  assertEquals(instance.opened, true);

  await instance.close();
  
  assertEquals(instance.opened, false);
});
