import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import Config from './config.ts'

Deno.test({
  name: "Config: defaults for fake development ~zod (see: https://urbit.org/using/develop/)",
  fn(): void {
    const instance = new Config();
    assertEquals(instance.code, 'lidlut-tabwed-pillex-ridrup');
    assertEquals(instance.host, 'http://localhost');
    assertEquals(instance.name, '~zod');
    assertEquals(instance.port, '80');
  },
});

Deno.test({
  name: "Config: setting a property",
  fn(): void {
    const instance = new Config();
    instance.port = '8080';
    assertEquals(instance.port, '8080');
  },
});

Deno.test({
  name: "Config: setting a property via constructor",
  fn(): void {
    const instance = new Config({ port: '8080' });
    assertEquals(instance.port, '8080');
  },
});

Deno.test({
  name: "Config: API base URL",
  fn(): void {
    const instance = new Config();
    assertEquals(instance.apiBaseUrl, 'http://localhost:80');
  },
});

Deno.test({
  name: "Config: Loading from a config file",
  fn(): void {
    const instance = new Config({ config_file: 'test/config.json' });
    assertEquals(instance.name, '~nut');
  },
});
