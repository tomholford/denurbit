import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import Ship from './ship.ts'

Deno.test("Ship: authentication flow with fake zod",
  async () => {
    const instance = new Ship();
    assertEquals(instance.isAuthed, false);
    await instance.authenticate();
    assertEquals(instance.isAuthed, true);
  }
);
